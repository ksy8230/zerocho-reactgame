import React, {useCallback} from 'react';



const Td = ({rowIndex, cellIndex}) => {
    const onClickTd = useCallback(() => {
        console.log(rowIndex, cellIndex)
    },[]);
    return (
        <td onClick={onClickTd}>row : {rowIndex} cell : {cellIndex}</td>
    );
}

export default Td;