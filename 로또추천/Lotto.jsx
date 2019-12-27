import React, { Component, useState, useRef, useEffect, useMemo, useCallback } from 'react';
import Ball from './Ball';

function getWinNumbers () {
  console.log('getWinNumbers');
  const candidate = Array(45).fill().map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    const moveValue = candidate.splice(Math.floor(Math.random() * candidate.length),1)[0];
    shuffle.push(moveValue);
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);

  return [...winNumbers, bonusNumber];
}

const Lotto = () => {
  const lottoNumbers = useMemo(() => getWinNumbers(), []);
  // useMemo : 복잡한 함수 결과값을 기억
  const [winNumbers, setWinNumbers] = useState(lottoNumbers);
  const [winBalls, setWinBalls] = useState([]);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);

  const timeouts = useRef([]);

  useEffect(() => {
    console.log('useEffect');
    for (let i = 0; i < winNumbers.length - 1; i++){
      timeouts.current[i] = setTimeout(() => {
        setWinBalls((prevState) => {
          return [...prevState, winNumbers[i]];
        });
      }, (i + 1) * 1000);
    }
    timeouts.current[6] = setTimeout(() => {
      setBonus(winNumbers[6]);
      setRedo(true);
    }, 7000);
    return () => {
      // componentWillUnMount 자리
      timeouts.current.forEach((v) => {
        clearTimeout(v);
      });
    };
  }, [timeouts.current]); 
  // useEffect 두번째 인자가 빈배열이면 componentDidMount랑 같다
  // 배열에 요소가 있으면 componentDidMount랑 componentDidUpdate 둘 다 수행

  const onClickRedo = useCallback(() => {
    console.log('onclickRedo')
    console.log(winNumbers);
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);
    timeouts.current = [];
  }, [winNumbers]);
  // useCallback : 함수 자체를 기억해서 다시 랜더링될 때 해당 함수가 생성되지 않는다
  // useCallback 안에서 사용하는 state들은 두번째 배열 인자에도 넣어줘야한다
  // 그렇지 않으면 useCallback 함수가 기억을 해버려서 state가 바뀌지 않음
  // [] : 어떨 때 이 함수가 다시 실행되는지 결정

  return (
    <>
      <div>당첨 숫자</div>
      <div id="결과창">
        {winBalls.map((v) => <Ball key={v} number={v} />)}
      </div>
      <div>보너스!</div>
      {bonus && <Ball number={bonus} />}
      {redo && <button onClick={onClickRedo}>한 번 더!</button>}
    </>
  )
}

export default Lotto;