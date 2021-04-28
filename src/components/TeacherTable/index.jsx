import React from 'react';
import TeacherTable from './TeacherTable'
import NavMenu from '../Home'

const index = props => {
  return (
    <div>
      <NavMenu />
      <TeacherTable />
    </div>
  );
};

export default index;