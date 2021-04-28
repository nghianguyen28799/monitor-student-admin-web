import React from 'react';
import UserTable from './UserTable'
import NavMenu from '../Home'

const index = props => {
  return (
    <div>
      <NavMenu />
      <UserTable />
    </div>
  );
};

export default index;