import React, {useCallback} from 'react';
import { CLICK_CELL, CHANGE_TURN } from './TicTacToc';

const Td = ({rowIndex, cellIndex, cellData, dispatch}) => {
    const onClickTd = useCallback(() => {
        console.log(rowIndex, cellIndex);
        dispatch({ type:'CLICK_CELL', row: rowIndex, cell: cellIndex });
        dispatch({ type : 'CHANGE_TURN'});
    }, []);
    return (
        <td onClick={onClickTd}>cellData : {cellData}</td>
    );
}

export default Td;