import React, { useContext } from 'react';
import { TableContext, CODE } from './mineSearch';

const getTdStyle = (code) => {
    switch (code) {
        case CODE.NORMAL :
            return {
                background:'#eee'
            }
        case CODE.MINE :
            return {
                background: '#666'
            }
        case CODE.OPENED :
            return {
                background : '#fff'
            }
        default : 
        return {
            background : '#eee'
        }
    }
};

const getTdText = (code) => {
    switch (code) {
        case CODE.NORMAL :
            return '';
        case CODE.MINE : 
            return 'x';
        case CODE.OPENED:
            return '';
        default:
            return '';
    }
};

const Td = ({rowIndex, cellIndex}) => {
    const { tableData } = useContext(TableContext);
  return (
    <td
        style={getTdStyle(tableData[rowIndex][cellIndex])}
    >
        {getTdText(tableData[rowIndex][cellIndex])}
    </td>
  );
}

export default Td;