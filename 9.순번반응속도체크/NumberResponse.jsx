import React, {Component, useState, useCallback, useEffect, memo} from 'react';
import styled from "styled-components";
import Numbers from './Numbers';
import Form from './Form';

const ResultStyle = styled.div`
    display:block;
    text-align:center;
`;

// 1 부터 50 숫자 중 랜덤으로 숫자 뽑아서 shuffle 배열에 넣기
function getNumbers(n) {
  const candidateArray = Array(n).fill().map((v,i) => i+1);
  const shuffle = [];
  while (candidateArray.length > 0) {
    const getRandomNumner = candidateArray.splice(Math.floor(Math.random()*candidateArray.length), 1)[0]
    shuffle.push(getRandomNumner);
  }
  return shuffle;
}

const NumberResponse = memo(() => {
  const [value, setValue] = useState(1);
  const [numbers, setNumbers] = useState(getNumbers());
  const [currentNumber, setCurrentNumber] = useState(1);
  const [gameStart, setGameStart] = useState(false);
  const [result, setResult] = useState('');
  const [timer, setTimer] = useState(0);  

  const onChangeInput = useCallback((e) => {
    setValue(e.target.value)
  },[]);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    setValue(parseInt(value));
    startGame();
  },[value]);

  const onClickNumbers = useCallback((num) => {
    console.log('현재 클릭한 수 '+ num)
    console.log('value '+ value)
    console.log('gameStart '+ gameStart)
    // num 과 현재 진행 중인 수가 같을 때
    if(num === currentNumber && gameStart) {
      if (num === value) {
        endGame();
        setResult(`${timer}초 만에 성공!`);
      }
      console.log('하트로 바꾸자!')
      // numbers 배열에서 num index 순서 검색
      const index = numbers.indexOf(num);
      setCurrentNumber(currentNumber => currentNumber + 1);
      // [num 번째까지 numbers 배열 잘라냄, 0(num = 0) , num + 1번째까지 numbers 배열 잘라냄 ]
      // [... , 0 , ... ] num 만 0으로 치환된 배열 리턴
      setNumbers((prevState) => {
        return [ 
          ...prevState.slice(0, index), 
          num = '♥', 
          ...prevState.slice(index + 1) 
        ]
      }, [])
    
    } else {
      setResult('틀렸습니다');
      endGame();
      return;
    }
    console.log(gameStart)
  }, [numbers, gameStart, value]);

  const endGame = () => {
    setGameStart(false);
    setTimer(0);
  };

  const startGame = () => {
    setNumbers(getNumbers(parseInt(value)));
    setCurrentNumber(1);
    setResult('게임 중');
    setGameStart(true);
  };

  useEffect(() => {
    let timer;
    if ( gameStart === true ){
      timer = setInterval(() => {
        setTimer((prevState) => {
          return prevState + 1;
        }, [])
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    }
  }, [gameStart]);
  
  return (
    <>
      <div>
        {gameStart ? (
          <>
            <Numbers numbers={numbers} onClickNumbers={onClickNumbers} />
          </>
        ) 
        : (
          <Form onSubmit={onSubmit} onChangeInput={onChangeInput} value={value} />
        )}
      </div>
      <ResultStyle>
        <p>{result}</p>
        <p>{timer === 0 ? null : timer}</p>
      </ResultStyle>
    </>
  )
});



export default NumberResponse;