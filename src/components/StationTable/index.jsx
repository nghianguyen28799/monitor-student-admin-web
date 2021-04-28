import React from 'react';
import StationTable from './StationTable'
import NavMenu from '../Home'

const index = props => {
  return (
    <div>
      <NavMenu />
      <StationTable />
    </div>
  );
};

export default index;