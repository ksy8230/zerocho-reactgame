import React, { useState, useRef } from 'react';
import Try from "./Try";

function getNumbers () {
    const candidate = [1,2,3,4,5,6,7,8,9];
    const array = [];
    for ( let i = 0; i < 4; i += 1){
        let select = Math.floor(Math.random() * candidate.length);
        array[i] = candidate.splice(select, 1)[0]
    }
    return array;
}

const NumberBaseball = () => {
    const [result, setResult] = useState('');
    const [value, setValue] = useState('');
    const [answer, setAnswer] = useState(getNumbers());
    const [tries, setTries] = useState([]);
    const inputRf = useRef(null);

    const onChangeInput = (e) => {
        setValue(e.target.value)
    }

    const onSubmitForm = (e) => {
        e.preventDefault();
        if (value === answer.join('')) {
            setResult('홈런!');
            alert('게임을 다시 시작합니다.');
            setTries((prevTries) => {
                return [...prevState.tries, { try: value, result: '홈런!'}]
            });
            inputRf.current.focus();
        } else {
            const answerArray = value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if (tries.length >= 9) {
                setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다!`)
                alert('게임을 다시 시작합니다.');
                setValue('');
                setAnswer(getNumbers());
                setTries([]);
                inputRf.current.focus();
            } else {
                for (let i = 0; i < 4; i ++){
                    if (answerArray[i] === answer[i]) {
                        strike += 1;
                    } else if (answer.includes(answerArray[i])){
                        ball += 1;
                    }
                }
                setTries((prevState) => {
                    return [...prevState.tries, { try: value, result : `${strike} 스크라이크, ${ball} 볼입니다.`}]
                });
            }
        }
    }
    return (
        <>  
            <h1>{result}</h1>
            <form onSubmit={onSubmitForm}>
                <input maxLength={4} value={value} onChange={onChangeInput} ref={inputRf} />
                <button>입력</button>
            </form>
            
            <div>시도 : {tries.length}</div>
            <ul>
                {tries.map( (v, i) => {
                    return (
                        <Try key={i + v} tryInfo={v} />

                    );
                })}
            </ul>
        </>
    )
}



export default NumberBaseball;