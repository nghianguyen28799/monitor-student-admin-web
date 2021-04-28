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
      var dataBox = [];
      const isAbsence = await axios.get(`${host}/absence/getData`)
      isAbsence.data.map(async (item) => {
        const isStudent = await axios.post(`${host}/student/getStudentByParentsId`, {id: item.parentsId})
        item.dates.map(async (item2) => {
          const isClass = await axios.post(`${host}/class/getClassById`, {id: isStudent.data.classCode})
          dataBox.push({
            name: isStudent.data.name,
            gender: isStudent.data.gender == "Male" ? "Nam" : "Nữ",
            class: isClass.data[0].ClassCode,
            absencedDate: item2.date,
            reason: item.reason
          })
        })
      })
      
      const timer = setTimeout(async () => {
        // setData(dataBox)
        const dataSort = await (dataBox.sort((a, b) => {
          return new Date(b.absencedDate) - new Date(a.absencedDate)
        }))
        const newData = await dataSort.map(item => {
          return {
            ...item,
          }
        })
        setData(newData)
        clearTimeout(timer)
      },500)
    }

    const getColumn = async () => { 
      setColumns([
        { title: 'Tên học sinh', field: 'name' },
        { title: 'Giới tính', field: 'gender' },
        { title: 'Lớp', field: 'class' },
        { title: 'Ngày vắng', field: 'absencedDate', render: rowData => {
          const today = new Date().getDate()+'-'+new Date().getMonth()
          const getDate = (new Date(rowData.absencedDate)).getDate()+'-'+(new Date(rowData.absencedDate)).getMonth()
          if(today == getDate) {
            return (new Date(rowData.absencedDate)).getDate()+'-'+((new Date(rowData.absencedDate)).getMonth()+1)+'-'+((new Date(rowData.absencedDate)).getFullYear())+' (Hôm nay)'
          } else {
            return (new Date(rowData.absencedDate)).getDate()+'-'+((new Date(rowData.absencedDate)).getMonth()+1)+'-'+((new Date(rowData.absencedDate)).getFullYear())
          }
        } },
        { title: 'Lý do vắng', field: 'reason' },
      ])
    }

    useEffect(() => {
        getData();   
        getColumn(); 
    }, [])

    return (
      <MaterialTable
        icons={tableIcons}
        title="Vắng có phép"
        columns={columns}
        data={data}
        // editable={{
        //   onRowAdd: newData =>
        //     new Promise((resolve, reject) => {
        //       setTimeout(() => {
        //         setData([...data, newData]);
        //             axios.post(`${host}/teacher/create`, newData)
        //             .then(res => {
        //                 console.log(res.data);
        //             })    
        //         resolve();
        //       }, 1000)
        //     }),
        //   onRowUpdate: (newData, oldData) =>
        //     new Promise((resolve, reject) => {
        //       setTimeout(() => {
        //         const dataUpdate = [...data];
        //         const index = oldData.tableData.id;
        //         dataUpdate[index] = newData;
        //         setData([...dataUpdate]);
        //           axios.post(`${host}/teacher/edit`, newData)
        //           .then(res => {
        //             console.log(res.data);
        //           })    
        //         resolve();
        //       }, 1000)
        //     }),
        //   onRowDelete: oldData =>
        //     new Promise((resolve, reject) => {
        //       setTimeout(() => {
        //         const dataDelete = [...data];
        //         const index = oldData.tableData.id;
        //         dataDelete.splice(index, 1);
        //         setData([...dataDelete]);
        //           const id = oldData.id
        //           axios.post(`${host}/teacher/delete`, {id: id})
        //           .then(res => {
        //               console.log(res.data);
        //           })    
        //         resolve()
        //       }, 1000)
        //     }),
        // }}
      />
    )
  }
  
export default ClassTable;