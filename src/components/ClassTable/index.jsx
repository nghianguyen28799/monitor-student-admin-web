import React from 'react';
import ClassTable from './ClassTable.jsx'
import NavMenu from '../Home'

const index = props => {
  return (
    <div>
      <NavMenu />
      <ClassTable />
    </div>
  );
};

export default index;