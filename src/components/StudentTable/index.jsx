import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table'
import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import axios from 'axios';
import host from '../../host'

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };


  function ClassTable() {
    const { useState } = React;
  
    const [columns, setColumns] = useState([
        { title: 'Tên', field: 'name' },
        { title: 'Sinh ngày', field: 'birthday' },
        { title: 'Giới tính', field: 'gender' },
        { title: 'Mã lớp', field: 'classCode' },
        { title: 'GVCN', field: 'teacherCode'},
        { title: 'Năm nhập học', field: 'joined'},
    ]);
  
    const [data, setData] = useState([]);
  
    const getData = async () => {
      
      const isStudents = await axios.get(`${host}/student`)
      const isClasses = await axios.get(`${host}/class`)
      const isTeachers =  await axios.get(`${host}/teacher`)
      const isParents =  await axios.get(`${host}/users`)

      const dataArray = [];
      isStudents.data.map(dt => {
        let classIndex = -1;
        let teacherIndex = -1;
        let parentsIndex = -1;

        for(let i in isClasses.data) {
          if(isClasses.data[i]._id === dt.classCode) {
            classIndex = i;
          }
        }

        for(let i in isTeachers.data) {
          if(isTeachers.data[i]._id === dt.teacherCode) {
            teacherIndex = i;
          }
        }

        for(let i in isParents.data) {
          if(isParents.data[i]._id === dt.parentsCode) {
            parentsIndex = i;
          }
        }

        const infoData = {
          id: dt._id,
          name: dt.name,
          birthday: dt.birthday,
          gender: dt.gender,
          classCode: Number(classIndex),
          teacherCode: Number(teacherIndex),
          parentsCode: Number(parentsIndex),
          joined: dt.joined
        }
        dataArray.push(infoData)
      })
      setData(dataArray)
    }

    const setItinialColumns = async () => {
      const isClasses = await axios.get(`${host}/class`)
      const isTeachers =  await axios.get(`${host}/teacher`)
      const isParents = await axios.get(`${host}/users`)

      setColumns([
        { title: 'Tên', field: 'name' },
        { title: 'Sinh ngày', field: 'birthday' },
        { title: 'Giới tính', field: 'gender', 
          lookup: {
            Male: 'Nam',
            Female: 'Nữ'
          }
        },
        { title: 'Mã lớp', field: 'classCode', 
          lookup: isClasses.data.map((e, i) => (
            e.ClassCode
          ))
        },
        { title: 'GVCN', field: 'teacherCode',
          lookup: isTeachers.data.map((e, i) => (
            e.FullName
          ))
        },
        {
          title: 'Tên Phụ huynh', field: 'parentsCode',
            lookup: isParents.data.map((e, i) => (
              e.myFullName
            ))
        },
        { title: 'Năm nhập học', field: 'joined',
          lookup: {
            2018: 2018,
            2019: 2019,
            2020: 2020,
            2021: 2021,
            2022: 2022,
            2023: 2023
          }
        },
      ])
    }
    useEffect(async () => {
        await getData(); 
        setItinialColumns();   
    }, [])

    return (
      <MaterialTable
        icons={tableIcons}
        title="Students Management"
        columns={columns}
        data={data}
        editable={{
          onRowAdd: newData =>
          new Promise((resolve, reject) => {
            setTimeout(async() => {
              setData([...data, newData]);
                // console.log(newData); 
                const isClasses = await axios.get(`${host}/class`)
                const isTeachers =  await axios.get(`${host}/teacher`)  
                const isParents =  await axios.get(`${host}/users`) 
                const student = {
                    name: newData.name,
                    birthday: newData.birthday,
                    gender: newData.gender,
                    classCode: isClasses.data[Number(newData.classCode)]._id,
                    teacherCode: isTeachers.data[Number(newData.teacherCode)]._id,
                    parentsCode : isParents.data[Number(newData.parentsCode)]._id,
                    joined: newData.joined,
                  }
                  // console.log(student);
                  axios.post(`${host}/student/create`, student)
                    .then((res) => {
                       console.log('successly Student Addition!');
                  })
                resolve();
              }, 1000)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(async() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setData([...dataUpdate]);
                const isClasses = await axios.get(`${host}/class`)
                const isTeachers =  await axios.get(`${host}/teacher`)  
                const isParents =  await axios.get(`${host}/users`) 
                const student = {
                    id: newData.id,
                    name: newData.name,
                    birthday: newData.birthday,
                    gender: newData.gender,
                    classCode: isClasses.data[Number(newData.classCode)]._id,
                    teacherCode: isTeachers.data[Number(newData.teacherCode)]._id,
                    parentsCode : isParents.data[Number(newData.parentsCode)]._id,
                    joined: newData.joined,
                  }
                axios.post(`${host}/student/edit`, student)
                  .then(resEdit => {
                    console.log(resEdit.data);
                })
                resolve();
              }, 1000)
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete]);
                  const id = oldData.id
                  axios.post(`${host}/student/delete`, {id: id})
                  .then(res => {
                    console.log(res.data);
                  })     
                resolve()
              }, 1000)
            }),
        }}
      />
    )
  }
  
export default ClassTable;