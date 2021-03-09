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
  
    const [columns, setColumns] = useState([]);
  
    const [data, setData] = useState([]);
  
    const getData = async () => {
      const isClasses = await axios.get(`${host}/class`)
      await axios.get(`${host}/teacher`)
      .then(res => {
          let DATA = [];
          res.data.map(dt => {
            let classIndex = -1;
            for(let i in isClasses.data) {
              if(dt.ClassCode === isClasses.data[i]._id) {
                classIndex = i;
              }
            }
            const infoData = {
                id: dt._id,
                userName: dt.userName,
                password: '********',
                name: dt.FullName,
                email: dt.Email,
                numberPhone: dt.NumberPhone,
                Gender: dt.Gender,
                birthDay: dt.BirthDay,
                identification: dt.Identification,
                hometown: dt.HomeTown,
                worked: dt.Worked,
                permission: dt.permission,
                classCode: classIndex
            }
              DATA.push(infoData)
          })
          // console.log(DATA);
          setData(DATA);
      })
    }

    const getColumn = async () => {
      const isClasses = await axios.get(`${host}/class`)
      setColumns([
        { title: 'Tên Đăng Nhập', field: 'userName' },
        { title: 'Mật khẩu', field: 'password' },
        { title: 'Tên', field: 'name' },
        { title: 'Email', field: 'email' },
        { title: 'SĐT', field: 'numberPhone'},
        { title: 'Giới tính', field: 'Gender',
          lookup: {
            Male: 'Nam',
            Female: 'Nữ'
          }
        },
        { title: 'Sinh ngày', field: 'birthDay' },
        { title: 'CMND', field: 'identification' },
        { title: 'Quê Quán', field: 'hometown' },
        { title: 'Năm Nhận Việc', field: 'worked' },
        { title: 'Chức vụ', field: 'permission',
          lookup: {
            teacher: 'Giáo viên',
            supervisor: 'Người đưa đón'
          }
        },
        { title: 'Lớp', field: 'classCode',
          lookup: isClasses.data.map(dt => (
            dt.ClassCode
        ))
        }
      ])
    }

    useEffect(() => {
        getData();   
        getColumn(); 
    }, [])

    return (
      <MaterialTable
        icons={tableIcons}
        title="Teachers Management"
        columns={columns}
        data={data}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                setData([...data, newData]);
                    axios.post(`${host}/teacher/create`, newData)
                    .then(res => {
                        console.log(res.data);
                    })    
                resolve();
              }, 1000)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setData([...dataUpdate]);
                  axios.post(`${host}/teacher/edit`, newData)
                  .then(res => {
                    console.log(res.data);
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
                  axios.post(`${host}/teacher/delete`, {id: id})
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