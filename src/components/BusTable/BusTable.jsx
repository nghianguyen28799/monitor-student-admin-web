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
        const isBus = await axios.get(`${host}/bus/getData`)
        const isTeacher = await axios.get(`${host}/teacher`)
        const teacherData = isTeacher.data.filter(item => {
            return item.permission == "supervisor"
        }) 
        const busData = isBus.data.map((item) => {
            var i = 0;
            teacherData.map((item2, index) => {
                if(item2._id === item.supervisor) {
                    i = index
                }
            }) 
            return {
                id: item._id,
                licensePlates: item.licensePlate,
                supervisor: i
            }
        })
        setData(busData)
    }

    const getColumn = async () => {
      const isTeacher = await axios.get(`${host}/teacher`)
      const teacherData = isTeacher.data.filter(item => {
        return item.permission == "supervisor"
      }) 

      setColumns([
        { title: 'Biển số xe', field: 'licensePlates' },
        { title: 'Giáo viên đưa đón', field: 'supervisor',
            lookup: teacherData.map(item => (
                item.FullName
            ))
        },
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
                    axios.post(`${host}/bus/create`, newData) 
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
                  axios.post(`${host}/bus/edit`, newData)    
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
                  axios.post(`${host}/bus/remove`, {id: id})
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