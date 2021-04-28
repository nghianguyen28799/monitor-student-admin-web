import React from 'react';
import NoAttendance from './NoAttendance'
import NavMenu from '../Home'

const index = props => {
  return (
    <div>
      <NavMenu />
      <NoAttendance />
    </div>
  );
};

export default index;