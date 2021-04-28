import React from 'react';
import ScheduleTable from './ScheduleTable'
import NavMenu from '../Home'

const index = props => {
  return (
    <div>
      <NavMenu />
      <ScheduleTable />
    </div>
  );
};

export default index;