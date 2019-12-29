import React, {memo} from 'react';
import styled from "styled-components";

const NumberWrapStyle = styled.div`
    display:block;
`;

const NumberStyle = styled.div`
    display:inline-block;
    width:20%;
    height:50px;
    line-height:50px;
    text-align:center;
    background-color: ${props => ( 
        (props.numi <= 10) ? '#D6F8EA' : (props.numi <= 30) ? '#FDD9CB' : (props.numi <= 50) ? '#88F8DF' : '#eee'
    )}
`;

const Numbers = memo(({numbers, onClickNumbers }) => {
    return (
        <NumberWrapStyle>
            {numbers.map((v,i) => 
                <NumberStyle numi={v} onClick={() => onClickNumbers(v)}>
                    {v}
                </NumberStyle>
            )}
        </NumberWrapStyle>
    );
});

export default Numbers;