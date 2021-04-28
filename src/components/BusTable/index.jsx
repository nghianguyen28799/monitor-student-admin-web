import React from 'react';
import BusTable from './BusTable'
import NavMenu from '../Home'

const index = props => {
  return (
    <div>
      <NavMenu />
      <BusTable />
    </div>
  );
};

export default index;