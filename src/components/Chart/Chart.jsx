import React from 'react';
import { Doughnut } from "react-chartjs-2";
import './style.css'
import axios from 'axios';
import host from '../../host'

const Chart = props => {
    const [permission, setPermission] = React.useState(['Giáo viên chủ nhiệm', 'Giáo viên đưa đón'])
    const [data, setData] = React.useState([])
    const [classData, setClassData] = React.useState([])
    const [studentData, setStudentData] = React.useState([])
    const [noAttData, setNoAttData] = React.useState([])
    const [absenceData, setAbsenceData] = React.useState([])
    const [teacherData, setTeacherData] = React.useState([])

    const getClassData = async () => {
        setClassData([])
        const isClasses = await axios.get(`${host}/class`)
        const data = await isClasses.data.map(item => {
            return 'Lớp: ' + item.ClassCode
        })
        setClassData(data)
        setData(isClasses.data);
        getStudentData(isClasses.data)
        getNoAttData(isClasses.data, 99)
        getAbsence(isClasses.data, 99)
    }
    
    const getStudentData = async (data) => {
        setStudentData([])
        const isStudent = await axios.get(`${host}/student`)
        data.map(async (item) => {
            const getData = await isStudent.data.filter(item2 => {
                return item._id === item2.classCode
            })
            setStudentData(previous => [
                ...previous,
                getData.length
            ])
        })
    }

    const getTeacherData = async () => {
        setTeacherData([])
        const arr = ['teacher', 'supervisor']
        const isTeacher = await axios.get(`${host}/teacher`)
        arr.map(item => {
            const result = isTeacher.data.filter(item2 => {
                return item === item2.permission
            })
            setTeacherData(previous => [
                ...previous,
                result.length
            ])
        })
    }
    
    const getNoAttData = async (data, type) => {
        setNoAttData([])
        if(type == 99) {
            const isNoAtt = await axios.get(`${host}/noattendance/getData`)
            data.map(async (item) => {
                const data = [];
                await isNoAtt.data.map(async (item2) => {
                    const result = await item2.studentList.filter((item3) => {
                        return item3.data.classCode === item._id
                    })
                    data.push(result.length)
                })
                const qty = data.reduce((accumulator, currentValue) => accumulator + currentValue )
                setNoAttData(previous => [
                    ...previous,
                    qty
                ])
            })
        } 
        
        else if(type == 1) {
            const d = new Date();
            const isNoAtt = await axios.get(`${host}/noattendance/getData`)
            data.map(async (item) => {
                const data = [];
                await isNoAtt.data.map(async (item2) => {
                    if((new Date(item2.date)).getDate()+'-'+(new Date(item2.date)).getMonth() === d.getDate()+'-'+d.getMonth()) {
                        const result = await item2.studentList.filter((item3) => {
                            return item3.data.classCode === item._id
                        })
                        data.push(result.length)
                    }
                })
                var qty = 0
                if(data.length !== 0) {
                    qty = data.reduce((accumulator, currentValue) => accumulator + currentValue )
                }
                setNoAttData(previous => [
                    ...previous,
                    qty
                ])
            })
        } 
        
        else {
            var d = new Date(new Date().setDate(new Date().getDate()-type));
            var day = d.getDay(),
                diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
            const dateArr = [];
            for(let i=0 ; i<7 ; i++) {
                const date = new Date(d.setDate(diff));
                const newDate = new Date(date.setDate(date.getDate() + i));
                dateArr.push(newDate.getDate() + '-' + (newDate.getMonth()));
            }
            const isNoAtt = await axios.get(`${host}/noattendance/getData`)
            data.map(async (item) => {
                const data = [];
                await isNoAtt.data.map(async (item2) => {
                    if(dateArr.indexOf((new Date(item2.date)).getDate()+'-'+(new Date(item2.date)).getMonth()) !== -1) {
                        const result = await item2.studentList.filter((item3) => {
                            return item3.data.classCode === item._id
                        })
                        data.push(result.length)
                    }
                })
                var qty = 0
                if(data.length !== 0) {
                    qty = data.reduce((accumulator, currentValue) => accumulator + currentValue )
                }
                setNoAttData(previous => [
                    ...previous,
                    qty
                ])
            })
        }
        
    }

    const getAbsence = async (data, type) => {
        setAbsenceData([])
        if(type == 99) {
            const isAbsence = await axios.get(`${host}/absence/getData`)
            data.map(async (item) => {
                const data = await isAbsence.data.filter((item2) => {
                    return item._id === item2.classCode
                })
                var qty = 0;
                data.map(item3 => {
                    qty += item3.dates.length
                })
                setAbsenceData(previous => [
                    ...previous,
                    qty
                ])
            })
        } 
        
        else if(type == 1){
            const d = new Date();
            const isAbsence = await axios.get(`${host}/absence/getData`)
            data.map(async (item) => {
                const data = await isAbsence.data.filter((item2) => {
                    return item._id === item2.classCode
                })
                var qty = 0;
                data.map(item3 => {
                    item3.dates.map(item4 => {
                        if((new Date(item4.date)).getDate()+'-'+(new Date(item4.date)).getMonth() === d.getDate()+'-'+d.getMonth()) {
                            qty += 1
                        }
                    })
                })
                setAbsenceData(previous => [
                    ...previous,
                    qty
                ])
            })
        }
        else {
            var d = new Date(new Date().setDate(new Date().getDate()-type));
            var day = d.getDay(),
                diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
            const dateArr = [];
            for(let i=0 ; i<7 ; i++) {
                const date = new Date(d.setDate(diff));
                const newDate = new Date(date.setDate(date.getDate() + i));
                dateArr.push(newDate.getDate() + '-' + (newDate.getMonth()));
            }
            const isAbsence = await axios.get(`${host}/absence/getData`)
            data.map(async (item) => {
                const data = await isAbsence.data.filter((item2) => {
                    return item._id === item2.classCode
                })
                var qty = 0;
                data.map(item3 => {
                    item3.dates.map(item4 => {
                        if(dateArr.indexOf((new Date(item4.date)).getDate()+'-'+(new Date(item4.date)).getMonth()) !== -1) {
                            qty += 1
                        }
                    })
                })
                setAbsenceData(previous => [
                    ...previous,
                    qty
                ])
            })
        }
    }

    React.useEffect(() => {
        getClassData()
        getTeacherData()
    },[])


    return (
        <div className="chart">
            <div className="chart-area">
                <div className="each-chart-area">
                    <Doughnut
                        data={{
                        labels: classData,
                        datasets: [
                            {
                            label: "Population (millions)",
                            backgroundColor: [
                                "#3e95cd",
                                "#8e5ea2",
                                "#3cba9f",
                                "#e8c3b9",
                                "#c45850"
                            ],
                            data: studentData
                            }
                        ]
                        }}
                        option={{
                        title: {
                            display: true,
                            text: "Predicted world population (millions) in 2050"
                        }
                        }}
                    />



                    <Doughnut
                        data={{
                        labels: permission,
                        datasets: [
                            {
                            label: "Population (millions)",
                            backgroundColor: [
                                "#3e95cd",
                                "#8e5ea2",
                                "#3cba9f",
                                "#e8c3b9",
                                "#c45850"
                            ],
                            data: teacherData
                            }
                        ]
                        }}
                        option={{
                        title: {
                            display: true,
                            text: "Predicted world population (millions) in 2050"
                        }
                        }}
                    />



                    <Doughnut
                        data={{
                        labels: classData,
                        datasets: [
                            {
                            label: "Population (millions)",
                            backgroundColor: [
                                "#3e95cd",
                                "#8e5ea2",
                                "#3cba9f",
                                "#e8c3b9",
                                "#c45850"
                            ],
                            data: noAttData
                            }
                        ]
                        }}
                        option={{
                        title: {
                            display: true,
                            text: "Predicted world population (millions) in 2050"
                        }
                        }}
                    />

                    <Doughnut
                        data={{
                        labels: classData,
                        datasets: [
                            {
                            label: "Population (millions)",
                            backgroundColor: [
                                "#3e95cd",
                                "#8e5ea2",
                                "#3cba9f",
                                "#e8c3b9",
                                "#c45850"
                            ],
                            data: absenceData
                            }
                        ]
                        }}
                        option={{
                        title: {
                            display: true,
                            text: "Predicted world population (millions) in 2050"
                        }
                        }}
                    />
                </div>
            </div>
            <div className="selector-chart">
                <select className="selector"
                    onChange={(e) => {
                        getNoAttData(data, e.target.value)
                        getAbsence(data, e.target.value)
                    }}
                >
                    <option value={99}>Tất cả</option>
                    <option value={1}>Hôm nay</option>
                    <option value={0}>Tuần này</option>
                    <option value={7}>Tuần trước</option>
                    <option value={14}>2 Tuần trước</option>
                </select>
            </div>
        </div>
    );
};

export default Chart;