import React, {useCallback, memo} from 'react';
import styled from "styled-components";

const FormStyle = styled.form` 
    text-align:center;
`;

const InputStyle = styled.input` 
    display: inline-block;
    margin-right: 10px;
    width: 100px;
    height: 40px;
    padding: 10px;
    font-size: 20px;
    vertical-align: middle;
`;

const ButtonStyle = styled.button` 
    width: 100px;
    height: 40px;
    line-heught:40px;
    border:0px;
    background:#A48BFA;
    color:#fff;
    font-size: 20px;
`;

const Form = memo (({onSubmit, onChangeInput}) => { 

    return (
        <FormStyle onSubmit={onSubmit}>
            <h1>1부터 <InputStyle type="number" onChange={onChangeInput} required />까지 랜덤 숫자 만들기</h1>
            <ButtonStyle>시작</ButtonStyle>
        </FormStyle>
    );
});

export default Form;