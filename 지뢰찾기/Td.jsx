import React, { useContext, useCallback } from 'react';
import { TableContext, CODE, OPEN_CELL, CLICK_MINE, FLAG_CELL, QUESTION_CELL, NORMALIZE_CELL } from './mineSearch';

const getTdStyle = (code) => {
    switch (code) {
        case CODE.NORMAL :
            return {
                background:'#eee'
            }
        case CODE.MINE :{
            return {
                background: '#878787'
            }}
        case CODE.OPENED :
            return {
                background : '#fff'
            }
        case CODE.FLAG :{
            return {
                background : 'yellow'
            }}
        case CODE.QUESTION :{
            return {
                background : 'yellow'
            }}
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
        case CODE.CLICKED_MINE:
            return '펑';
        case CODE.FLAG:
        case CODE.FLAG_MINE:
            return '!';
        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
            return '?';
        default:
            return '';
    }
};

const Td = ({rowIndex, cellIndex}) => {
    const { tableData, dispatch, halted } = useContext(TableContext);

    const onClickTd = useCallback(() => {
        if (halted) {
            return;
        }
        switch (tableData[rowIndex][cellIndex]){
            case CODE.NORMAL : 
                dispatch({ type: OPEN_CELL, row: rowIndex, cell: cellIndex });
                return;
            case CODE.MINE :
                dispatch({ type: CLICK_MINE, row: rowIndex, cell: cellIndex });
                return;
            case CODE.OPENED:
            case CODE.FLAG_MINE:
            case CODE.FLAG:
            case CODE.QUESTION_MINE:
            case CODE.QUESTION:
                return;
            default : 
                return;
        }
        
    }, [tableData[rowIndex][cellIndex], halted]);

    const onRightClickTd = useCallback((e) => {
        e.preventDefault();
        if (halted) {
            return;
        }
        switch (tableData[rowIndex][cellIndex]) {
            case CODE.NORMAL : 
            case CODE.MINE :
                dispatch ({ type : FLAG_CELL, row: rowIndex, cell: cellIndex });
                return;
            case CODE.FLAG_MINE:
            case CODE.FLAG:
                dispatch ({ type : QUESTION_CELL, row: rowIndex, cell: cellIndex });
                return;
            case CODE.QUESTION_MINE:
            case CODE.QUESTION:
                dispatch({ type: NORMALIZE_CELL, row: rowIndex, cell: cellIndex });
                return;
            default :
                return;
        }
    }, [tableData[rowIndex][cellIndex], halted]);

    return (
        <td
            style={getTdStyle(tableData[rowIndex][cellIndex])}
            onClick={onClickTd}
            onContextMenu={onRightClickTd}
        >
            {getTdText(tableData[rowIndex][cellIndex])}
        </td>
    );
}

export default Td;