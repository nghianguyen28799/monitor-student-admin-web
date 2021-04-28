import React from 'react';
import { Bar } from "react-chartjs-2";
import './style.css'
import axios from 'axios';
import host from '../../host'

const Statistics = props => {

    const [isDate, setDate] = React.useState([])
    const [dataNoAtt, setDataNoAtt] = React.useState([]);
    const [dataAbsence, setDataAbsence] = React.useState([])

    var weekday = new Array(7);
    weekday[0] = "Chủ nhật";
    weekday[1] = "Thứ 2";
    weekday[2] = "Thứ 3";
    weekday[3] = "Thứ 4";
    weekday[4] = "Thứ 5";
    weekday[5] = "Thứ 6";
    weekday[6] = "Thứ 7";

    React.useEffect(() => {
        getMonday(new Date(), 0)
    },[])

    const getMonday = (d, index) => {
        d = new Date(d.setDate(d.getDate()-index));
        setDataNoAtt([])
        setDataAbsence([])
        var day = d.getDay(),
            diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
        const dateArr = [];
        for(let i=0 ; i<7 ; i++) {
            const date = new Date(d.setDate(diff));
            const newDate = new Date(date.setDate(date.getDate() + i));
            dateArr.push(weekday[newDate.getDay()] + ' ' + newDate.getDate() + '-' + (newDate.getMonth()+1));
            getNoattendace(date, 0);
            getAbsence(date, 0)
        }
        setDate(dateArr);
    }

    const getNoattendace = async (date, index) => {
        const d = new Date(date)

        const NoAttdata = await axios.get(`${host}/noattendance/getData`)
        const filterNoAtt = await NoAttdata.data.filter(item => {
            return new Date(item.date).getDate()+'-'+new Date(item.date).getMonth() === d.getDate()+'-'+d.getMonth()
        })
        var qty = 0;
        filterNoAtt.map( item => {
            qty += item.studentList.length
        });
        setDataNoAtt(previous => [
            ...previous,
            qty
        ])
    }

    const getAbsence = async (date, index) => {
        const d = new Date(date)
        var qtyAbsence = 0;
        const isAbsence = await axios.get(`${host}/absence/getData`)
        isAbsence.data.map(item => {
            const dt = item.dates.filter(item2 => {
                return (new Date(item2.date)).getDate() + '-' + (new Date(item2.date)).getMonth() === d.getDate()+'-'+d.getMonth()
            })
            qtyAbsence += dt.length
        })
        setDataAbsence(previous => [
            ...previous,
            qtyAbsence
        ])
    }   

    return (
        <div className="body">
            <div className="selector_space">
                <div className="selector">
                    <select className="selector"
                        onChange={(e) => getMonday(new Date(), e.target.value)}
                    >
                        <option value={0}>Tuần này</option>
                        <option value={7}>Tuần trước</option>
                        <option value={14}>2 Tuần trước</option>
                    </select>
                </div>
            </div>  
            <div className="chart-statistics-area">
                <div className="chart-statistics">
                    <Bar
                        data={{
                        labels: isDate,
                        datasets: [
                            {
                            label: "Tổng số học sinh vắng không phép trong tuần",
                            backgroundColor: [
                                "#3e95cd",
                                "#8e5ea2",
                                "#3cba9f",
                                "#e8c3b9",
                                "#c45850"
                            ],
                            data: dataNoAtt
                            }
                        ]
                        }}
                        options={{
                        legend: { display: false },
                        title: {
                            display: true,
                            text: "Tổng số học sinh vắng trong tuần"
                        }
                        }}
                    />
                </div>
                <div className="chart-statistics">
                    <Bar
                        data={{
                        labels: isDate,
                        datasets: [
                            {
                            label: "Tổng số học sinh vắng có phép trong tuần",
                            backgroundColor: [
                                "#3e95cd",
                                "#8e5ea2",
                                "#3cba9f",
                                "#e8c3b9",
                                "#c45850"
                            ],
                            data: dataAbsence
                            }
                        ]
                        }}
                        options={{
                        legend: { display: false },
                        title: {
                            display: true,
                            text: "Tổng số học sinh vắng trong tuần"
                        }
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Statistics;