import React from 'react';
import './home.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import axios from 'axios';
import host from '../../host'

const HomeScreen = props => {
    const [studentTotal, setStudentTotal] = React.useState(0)
    const [teacherTotal, setTeacherTotal] = React.useState(0)
    const [noAttendanceTotal, setNoAttendanceTotal] = React.useState(0)
    const [absenceTotal, setAbsenceTotal] = React.useState(0)

    const getData = async () => {
        const isStudent = await axios.get(`${host}/student`)
        setStudentTotal(isStudent.data.length);
        const isTeacher = await axios.get(`${host}/teacher`)
        setTeacherTotal(isTeacher.data.length);

        const today = new Date().getDate()+'-'+new Date().getMonth()
        const isNoAttendance = await axios.get(`${host}/noattendance/getData`)
        const todayAbsence = await isNoAttendance.data.filter((item) => {
            const getDate = (new Date(item.date)).getDate()+'-'+(new Date(item.date)).getMonth()
            if(today == getDate) {
                return item
            }
        })
        var qtyNoAttendance = 0;
        todayAbsence.map((item) => {
            qtyNoAttendance += item.studentList.length
        })
        setNoAttendanceTotal(qtyNoAttendance)
    }

    const getAbsenceData = async () => {
        const today = new Date().getDate()+'-'+new Date().getMonth()
        const isAbsence = await axios.get(`${host}/absence/getData`)
        var qty = 0;
        isAbsence.data.map( (item) => {
            const data = item.dates.filter((item2) => {
                const getDate = (new Date(item2.date)).getDate()+'-'+(new Date(item2.date)).getMonth()
                if(getDate === today) {
                    return item2
                }
            })
            qty += data.length
        })
        setAbsenceTotal(qty)
    }

    React.useEffect(() => {
        getData()
        getAbsenceData()
    },[])
    return (
        <div className="nav-menu">
            
            <div className="nav-func-area">
                <div className="nav-func" id="nav-1">
                    <div className="nav-func-left">
                        <h2>Tổng số học sinh</h2>
                        <h3>{ studentTotal }</h3>
                    </div>
                    <div className="nav-func-right">
                        <Link to="/home/students">
                            <div className="btn-nav">
                                <KeyboardArrowDownIcon style={{"font-size": 40 }} />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="nav-func-area">
                <div className="nav-func" id="nav-2">
                    <div className="nav-func-left">
                        <h2>Tổng số giáo viên</h2>
                        <h3>{ teacherTotal }</h3>
                    </div>
                    <div className="nav-func-right">
                        <Link to="/home/teachers">
                            <div className="btn-nav">
                                <KeyboardArrowDownIcon style={{"font-size": 40 }} />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            
            <div className="nav-func-area">
                <div className="nav-func" id="nav-3">
                    <div className="nav-func-left">
                        <h2>Vắng không phép hôm nay</h2>
                        <h3>{ noAttendanceTotal }</h3>
                    </div>
                    <div className="nav-func-right">
                        <Link to="/home/noattendance">
                            <div className="btn-nav">
                                <KeyboardArrowDownIcon style={{"font-size": 40 }} />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            
            <div className="nav-func-area">
                <div className="nav-func" id="nav-4">
                    <div className="nav-func-left">
                        <h2>Vắng có phép hôm nay</h2>
                        <h3>{absenceTotal}</h3>
                    </div>
                    <div className="nav-func-right">
                        <Link to="/home/absence">
                            <div className="btn-nav">
                                <KeyboardArrowDownIcon style={{"font-size": 40 }} />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeScreen;