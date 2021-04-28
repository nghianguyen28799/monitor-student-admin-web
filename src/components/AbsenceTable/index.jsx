import React from 'react';
import AbsenceTable from './AbsenceTable'
import NavMenu from '../Home'

const index = props => {
  return (
    <div>
      <NavMenu />
      <AbsenceTable />
    </div>
  );
};

export default index;