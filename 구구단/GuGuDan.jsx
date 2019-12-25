const React = require('react');
const {Component, useState, useRef } = React;

const GuGuDan = () => {
    const [firstNumber, setFirstNumber] = useState(Math.ceil(Math.random() * 9));
    const [secondNumber, setSecondNumber] = useState(Math.ceil(Math.random() * 9));
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    // 내가 적은 이전 값 state 추가해봄
    const [beforeValue, setBeforeValue] = useState('');
    const onRefInput = useRef(null);

    const onChange = (e) => {
        setValue(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (parseInt(value) === firstNumber * secondNumber) {

            setResult((prevResult) => {
                return '정답 : ' + value
            });
            setFirstNumber(Math.ceil(Math.random() * 9));
            setSecondNumber(Math.ceil(Math.random() * 9));
            setValue('');
            setBeforeValue(value);
            onRefInput.current.focus();

        } else {
            setResult('땡! 정답은 '+ firstNumber * secondNumber);
            setValue('');
            setBeforeValue(value);
            onRefInput.current.focus();
        }
    }

    console.log('렌더링')

    return (
        <React.Fragment>
            <div>{firstNumber} 곱하기 {secondNumber} 는?</div>
                <form onSubmit={onSubmit}>
                    <input ref={onRefInput} type="number" value={value} onChange={onChange} required />
                    <button>입력 !</button>    
                </form>
            <div>결과 
                <p>내가 적은 값 : {beforeValue}</p>
                <p>{result}</p>
                
            </div>
        </React.Fragment>
    );
}

module.exports = GuGuDan;