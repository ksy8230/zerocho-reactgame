import React, {useCallback, useEffect, useRef, memo} from 'react';
import { CLICK_CELL, CHANGE_TURN } from './TicTacToc';

const Td = memo(({rowIndex, cellIndex, cellData, dispatch}) => {
    console.log('td rendered');

    const ref = useRef([]);

    useEffect(() => {

        // 어떤 값이 바뀌는지 
        // console.log(
        //     rowIndex === ref.current[0], 
        //     cellIndex === ref.current[1], 
        //     dispatch === ref.current[2], 
        //     cellData === ref.current[3], 
        // );
        // 어떻게 바뀌었는지
        // console.log(cellData, ref.current[3]);

        ref.current = [rowIndex, cellIndex, dispatch, cellData];

    }, [rowIndex, cellIndex, dispatch, cellData]);

    const onClickTd = useCallback(() => {
        if (cellData) {
            return;
        }
        dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
        //console.log(rowIndex, cellIndex, cellData);
    }, [cellData]); 
    // 바뀔 여지가 있는 데이터를 콜백 배열에 넣는다
    // 콜백 배열에 넣은 인자는 새로 만들어져서 이전의 기록이 아닌 새 기록을 반영한다
    return (
        <td onClick={onClickTd}>cellData : {cellData}</td>
    );
})

export default Td;