import React, { useContext } from 'react';
import Td from './Td';
import { TableContext } from './mineSearch';

const Tr = ({rowIndex}) => {
    const {tableData} = useContext(TableContext);
  return (
    <tr>
        {Array(tableData.length).fill().map((td, i) => <Td rowIndex={rowIndex} cellIndex={i} /> )}
    </tr>
  );
}

export default Tr;