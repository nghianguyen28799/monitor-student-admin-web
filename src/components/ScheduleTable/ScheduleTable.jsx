import React from 'react';
import "./style.css"
import { Table } from 'reactstrap';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import axios from 'axios';
import host from '../../host'

const dataSchedule = {
    // ClassId: "asdsadasd",
    DayList: {
        monday1: "",
        monday2: "",
        monday3: "",
        monday4: "",
        monday5: "",
        monday6: "",
        monday7: "",
        monday8: "",
        monday9: "",

        tuesday1: ""   ,
        tuesday2: ""   ,
        tuesday3: ""   ,
        tuesday4: ""   ,
        tuesday5: ""   ,
        tuesday6: ""   ,
        tuesday7: ""   ,
        tuesday8: ""   ,
        tuesday9: ""   ,
        
        wednesday1: ""   ,
        wednesday2: ""   ,
        wednesday3: ""   ,
        wednesday4: ""   ,
          wednesday5: ""   ,
          wednesday6: ""   ,
          wednesday7: ""   ,
          wednesday8: ""   ,
          wednesday9: ""   ,

          thurday1: ""   ,
          thurday2: ""   ,
          thurday3: ""   ,
          thurday4: ""   ,
          thurday5: ""   ,
          thurday6: ""   ,
          thurday7: ""   ,
          thurday8: ""   ,
          thurday9: ""   ,

          friday1: ""   ,
          friday2: ""   ,
          friday3: ""   ,
          friday4: ""   ,
          friday5: ""   ,
          friday6: ""   ,
          friday7: ""   ,
          friday8: ""   ,
          friday9: ""   ,
    }
}

const ScheduleScreen = props => {

    const [isEdit, setEdit] = React.useState(0); 
    const [isSelected, setSelected ] = React.useState('');
    const [optionClass, setOptionClass] = React.useState([]);
    const [data, setData] = React.useState({})
    
    const getData = async () => {
        const isClass = await axios.get(`${host}/class`)
        setOptionClass(isClass.data);    
        axios.post(`${host}/schedule/create`, { classCode: isClass.data[0]._id, data: dataSchedule.DayList })
        const getSchedule = await axios.post(`${host}/schedule/show`, { classCode: isClass.data[0]._id })
        setData(getSchedule.data.DayList)
        setSelected(isClass.data[0]._id)
    }

    React.useEffect(() => {
        getData()
        
    },[])
    
    const changeClass = async (value) => {
        const ClassCode = value;
        setSelected(value)
        axios.post(`${host}/schedule/create`, { classCode: ClassCode, data: dataSchedule.DayList })
        await axios.post(`${host}/schedule/show`, { classCode: ClassCode })
        .then(res => {
            setData(res.data.DayList)
        })
    }

    const confirmEdit = () => {
        console.log(isSelected);
        axios.post(`${host}/schedule/edit`, { classCode: isSelected, data: data })
        .then(res => {
            console.log(res.data);
        })
    }

    return (
        <div className="container-schedule">
            {
                isEdit === 0 
                ?
                <div className="edit-schedule"
                    onClick={() => setEdit(1)}
                >
                    <EditIcon />
                </div>
                :
                <div className="edit-schedule"
                    onClick={() => setEdit(0)}
                >
                    <ClearIcon />
                </div>      
            }
        
            {
                isEdit !== 0
                ?
                <div className="submit-schedule"
                    onClick={confirmEdit}
                >
                    <CheckIcon />
                </div>
                : null
            }  
            <div className="selector_space">
                <div className="selector">
                    <select className="selector"
                        onChange={(e) => changeClass(e.target.value)}
                    >
                        {
                            optionClass.map(value => (
                                <option value={value._id}>Lớp {value.ClassCode}</option>
                            ))
                        }

                    </select>
                </div>
            </div>
            <div className="table-schedule">
                <Table striped>
                    <thead>
                        <tr>
                            <th>Tiết</th>
                            <th>Thứ 2</th>
                            <th>Thứ 3</th>
                            <th>Thứ 4</th>
                            <th>Thứ 5</th>
                            <th>Thứ 6</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>{ isEdit ? <input type="text" value={data.monday1} onChange={(e) => setData({...data, monday1: e.target.value}) } /> : data.monday1 } </td>
                            <td>{ isEdit ? <input type="text" value={data.tuesday1} onChange={(e) => setData({...data, tuesday1: e.target.value}) } /> : data.tuesday1 } </td>
                            <td>{ isEdit ? <input type="text" value={data.wednesday1} onChange={(e) => setData({...data, wednesday1: e.target.value}) } /> : data.wednesday1 } </td>
                            <td>{ isEdit ? <input type="text" value={data.thurday1} onChange={(e) => setData({...data, thurday1: e.target.value}) } /> : data.thurday1 } </td>
                            <td>{ isEdit ? <input type="text" value={data.friday1} onChange={(e) => setData({...data, friday1: e.target.value}) } /> : data.friday1 } </td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>{ isEdit ? <input type="text" value={data.monday2} onChange={(e) => setData({...data, monday2: e.target.value}) } /> : data.monday2 } </td>
                            <td>{ isEdit ? <input type="text" value={data.tuesday2} onChange={(e) => setData({...data, tuesday2: e.target.value}) } /> : data.tuesday2 } </td>
                            <td>{ isEdit ? <input type="text" value={data.wednesday2} onChange={(e) => setData({...data, wednesday2: e.target.value}) } /> : data.wednesday2 } </td>
                            <td>{ isEdit ? <input type="text" value={data.thurday2} onChange={(e) => setData({...data, thurday2: e.target.value}) } /> : data.thurday2 } </td>
                            <td>{ isEdit ? <input type="text" value={data.friday2} onChange={(e) => setData({...data, friday2: e.target.value}) } /> : data.friday2 } </td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>{ isEdit ? <input type="text" value={data.monday3} onChange={(e) => setData({...data, monday3: e.target.value}) } /> : data.monday3 } </td>
                            <td>{ isEdit ? <input type="text" value={data.tuesday3} onChange={(e) => setData({...data, tuesday3: e.target.value}) } /> : data.tuesday3 } </td>
                            <td>{ isEdit ? <input type="text" value={data.wednesday3} onChange={(e) => setData({...data, wednesday3: e.target.value}) } /> : data.wednesday3 } </td>
                            <td>{ isEdit ? <input type="text" value={data.thurday3} onChange={(e) => setData({...data, thurday3: e.target.value}) } /> : data.thurday3 } </td>
                            <td>{ isEdit ? <input type="text" value={data.friday3} onChange={(e) => setData({...data, friday3: e.target.value}) } /> : data.friday3 } </td>
                        </tr>
                        <tr>
                            <th scope="row">4</th>
                            <td>{ isEdit ? <input type="text" value={data.monday4} onChange={(e) => setData({...data, monday4: e.target.value}) } /> : data.monday4 } </td>
                            <td>{ isEdit ? <input type="text" value={data.tuesday4} onChange={(e) => setData({...data, tuesday4: e.target.value}) } /> : data.tuesday4 } </td>
                            <td>{ isEdit ? <input type="text" value={data.wednesday4} onChange={(e) => setData({...data, wednesday4: e.target.value}) } /> : data.wednesday4 } </td>
                            <td>{ isEdit ? <input type="text" value={data.thurday4} onChange={(e) => setData({...data, thurday4: e.target.value}) } /> : data.thurday4 } </td>
                            <td>{ isEdit ? <input type="text" value={data.friday4} onChange={(e) => setData({...data, friday4: e.target.value}) } /> : data.friday4 } </td>
                        </tr>
                        <tr>
                            <th scope="row">5</th>
                            <td>{ isEdit ? <input type="text" value={data.monday5} onChange={(e) => setData({...data, monday5: e.target.value}) } /> : data.monday5 } </td>
                            <td>{ isEdit ? <input type="text" value={data.tuesday5} onChange={(e) => setData({...data, tuesday5: e.target.value}) } /> : data.tuesday5 } </td>
                            <td>{ isEdit ? <input type="text" value={data.wednesday5} onChange={(e) => setData({...data, wednesday5: e.target.value}) } /> : data.wednesday5 } </td>
                            <td>{ isEdit ? <input type="text" value={data.thurday5} onChange={(e) => setData({...data, thurday5: e.target.value}) } /> : data.thurday5 } </td>
                            <td>{ isEdit ? <input type="text" value={data.friday5} onChange={(e) => setData({...data, friday5: e.target.value}) } /> : data.friday5 } </td>
                        </tr>
                        <tr>
                            <th scope="row">6</th>
                            <td>{ isEdit ? <input type="text" value={data.monday6} onChange={(e) => setData({...data, monday6: e.target.value}) } /> : data.monday6 } </td>
                            <td>{ isEdit ? <input type="text" value={data.tuesday6} onChange={(e) => setData({...data, tuesday6: e.target.value}) } /> : data.tuesday6 } </td>
                            <td>{ isEdit ? <input type="text" value={data.wednesday6} onChange={(e) => setData({...data, wednesday6: e.target.value}) } /> : data.wednesday6 } </td>
                            <td>{ isEdit ? <input type="text" value={data.thurday6} onChange={(e) => setData({...data, thurday6: e.target.value}) } /> : data.thurday6 } </td>
                            <td>{ isEdit ? <input type="text" value={data.friday6} onChange={(e) => setData({...data, friday6: e.target.value}) } /> : data.friday6 } </td>
                        </tr>
                        <tr>
                            <th scope="row">7</th>
                            <td>{ isEdit ? <input type="text" value={data.monday7} onChange={(e) => setData({...data, monday7: e.target.value}) } /> : data.monday7 } </td>
                            <td>{ isEdit ? <input type="text" value={data.tuesday7} onChange={(e) => setData({...data, tuesday7: e.target.value}) } /> : data.tuesday7 } </td>
                            <td>{ isEdit ? <input type="text" value={data.wednesday7} onChange={(e) => setData({...data, wednesday7: e.target.value}) } /> : data.wednesday7 } </td>
                            <td>{ isEdit ? <input type="text" value={data.thurday7} onChange={(e) => setData({...data, thurday7: e.target.value}) } /> : data.thurday7 } </td>
                            <td>{ isEdit ? <input type="text" value={data.friday7} onChange={(e) => setData({...data, friday7: e.target.value}) } /> : data.friday7 } </td>
                        </tr>
                        <tr>
                            <th scope="row">8</th>
                            <td>{ isEdit ? <input type="text" value={data.monday8} onChange={(e) => setData({...data, monday8: e.target.value}) } /> : data.monday8 } </td>
                            <td>{ isEdit ? <input type="text" value={data.tuesday8} onChange={(e) => setData({...data, tuesday8: e.target.value}) } /> : data.tuesday8 } </td>
                            <td>{ isEdit ? <input type="text" value={data.wednesday8} onChange={(e) => setData({...data, wednesday8: e.target.value}) } /> : data.wednesday8 } </td>
                            <td>{ isEdit ? <input type="text" value={data.thurday8} onChange={(e) => setData({...data, thurday8: e.target.value}) } /> : data.thurday8 } </td>
                            <td>{ isEdit ? <input type="text" value={data.friday8} onChange={(e) => setData({...data, friday8: e.target.value}) } /> : data.friday8 } </td>
                        </tr>
                        <tr>
                            <th scope="row">9</th>
                            <td>{ isEdit ? <input type="text" value={data.monday9} onChange={(e) => setData({...data, monday9: e.target.value}) } /> : data.monday9 } </td>
                            <td>{ isEdit ? <input type="text" value={data.tuesday9} onChange={(e) => setData({...data, tuesday9: e.target.value}) } /> : data.tuesday9 } </td>
                            <td>{ isEdit ? <input type="text" value={data.wednesday9} onChange={(e) => setData({...data, wednesday9: e.target.value}) } /> : data.wednesday9 } </td>
                            <td>{ isEdit ? <input type="text" value={data.thurday9} onChange={(e) => setData({...data, thurday9: e.target.value}) } /> : data.thurday9 } </td>
                            <td>{ isEdit ? <input type="text" value={data.friday9} onChange={(e) => setData({...data, friday9: e.target.value}) } /> : data.friday9 } </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    );
};


export default ScheduleScreen;