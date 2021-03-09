import React from 'react';
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
// import CreateUserModals from '../CreateUserModals';
// import EditUserModals from '../EditUserModals';
import axios from 'axios'
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


  function UserTable() {
    const { useState, useEffect } = React;

    const [columns, setColumns] = useState([
      { title: 'Tên đăng nhập', field: 'userName' },
      { title: 'Password', field: 'password'},
      { title: 'Email', field: 'email' },
      { title: 'Họ và tên', field: 'myFullName' },
      { title: 'Giới tính', field: 'gender', 
        lookup: {
          Male: 'Nam',
          Female: 'Nữ'
        }
      },
      { title: 'Sinh năm', field: 'birthDay' },
      { title: 'Mối quan hệ', field: 'relationship' },
      { title: 'SĐT', field: 'numberPhone' },
      { title: 'Địa chỉ', field: 'address' },
    ]);
  
    const [data, setData] = useState([]);
    const [dataClass, setDataClass] = useState([]);

    useEffect(async () => {
      await getData();
      // await getClass();
      // await getStudent();

    },[])

    const getData = async () => {
      const isUsers = await axios.get(`${host}/users`)
      const isStudents = await axios.get(`${host}/student`)
      var data = [];
      isUsers.data.map(e => {
        let index = -1;
        for(let i in isStudents.data) {
          if(isStudents.data[i]._id === e.student) {
            index = i;
          }
        }
        data.push({
            id: e._id,
            userName: e.userName,
            password: '***********',
            email: e.email,
            myFullName: e.myFullName,
            numberPhone: e.numberPhone,
            birthDay: e.birthDay,
            relationship: e.relationship,
            gender: e.gender,
            address: e.address,
            student: index,
          })
        })
        setData(data);
      }
    return (
      <MaterialTable
      icons={tableIcons}
      title="Parents Management"
      columns={columns}
      data={data}
      editable={{
        onRowAdd: newData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              setData([...data, newData]);
              axios.get(`${host}/student`)
              .then(res => {
                const index = newData.student
                const parents = {
                  userName: newData.userName,
                  password: newData.password,
                  email: newData.email,
                  myFullName: newData.myFullName,
                  numberPhone: newData.numberPhone,
                  address: newData.address,
                  birthDay: newData.birthDay,
                  relationship: newData.relationship,
                  gender: newData.gender
                }
                axios.post(`${host}/users/create`, parents)
                .then((resCreate) => {
                  console.log(resCreate.data);
                })
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
              axios.get(`${host}/student`)
              .then(res => {
                const index = newData.student
                if(newData.password.indexOf("*") !== -1) {
                  var parents = {
                    id: newData.id,
                    userName: newData.userName,
                    // password: newData.password,
                    email: newData.email,
                    myFullName: newData.myFullName,
                    numberPhone: newData.numberPhone,
                    address: newData.address,
                    birthDay: newData.birthDay,
                    relationship: newData.relationship,
                    gender: newData.gender
                  }
                } else {
                  var parents = {
                    id: newData.id,
                    userName: newData.userName,
                    password: newData.password,
                    email: newData.email,
                    myFullName: newData.myFullName,
                    numberPhone: newData.numberPhone,
                    address: newData.address,
                    birthDay: newData.birthDay,
                    relationship: newData.relationship,
                    gender: newData.gender
                  }
                }  
                axios.post(`${host}/users/edit`, parents)
                .then(resEdit => {
                  // console.log(resEdit.data);
                })
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
                axios.post(`${host}/users/delete`, {id: id})
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

  
export default UserTable;