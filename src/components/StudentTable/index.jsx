import React from 'react';
import StudentTable from './StudentTable'
import NavMenu from '../Home'

const index = props => {
  return (
    <div>
      <NavMenu />
      <StudentTable />
    </div>
  );
};

export default index;