import React, { useContext } from 'react';
import { TableContext } from './mineSearch';

const getTdStyle = (code) => {

};

const getTdText = (code) => {

};

const Td = ({rowIndex, cellIndex}) => {
    const { tableData } = useContext(TableContext);
  return (
    <td>{tableData[rowIndex][cellIndex]}</td>
  );
}

export default Td;