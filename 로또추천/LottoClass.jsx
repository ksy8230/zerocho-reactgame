import React, { Component } from 'react';
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

class Lotto extends Component {
  state = {
    winNumbers: getWinNumbers(), // 숫자 6개 추출
    winBalls: [], // 숫자 6개 하나씩 넣어주기
    bonus: null,
    redo: false,
  };

  timeouts = [];

  runTimeouts = () => {
    console.log('runTimeouts')
    const { winNumbers } = this.state;
    for (let i = 0; i < winNumbers.length -1; i++){
      this.timeouts[i] = setTimeout(() => {
        this.setState((prevState) => {
          return {
            winBalls : [...prevState.winBalls, winNumbers[i]]
          };
        });
      }, (i + 1) * 1000);
    }
    this.timeouts[6] = setTimeout(() => {
      this.setState({
        bonus: winNumbers[6],
        redo: true,
      })
    }, 7000)
  };

  componentDidMount(){
    console.log('componentDidMount')
    this.runTimeouts();
  };

  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate')
    console.log(prevState)
    if (this.state.winBalls.length === 0){
      this.runTimeouts();
    }
  }

  onClickRedo = () => {
    console.log('onclickRedo')
    this.setState({
      winNumbers: getWinNumbers(),
      winBalls: [],
      bonus: null,
      redo: false,
    });
    this.timeouts = [];
  };
  

  render () {
    const { winBalls, bonus, redo  } = this.state;
    console.log(winBalls)
    return (
      <>
        <div>당첨 숫자</div>
        <div id="결과창">
          {winBalls.map((v) => <Ball key={v} number={v} />)}
        </div>
        <div>보너스!</div>
        {bonus && <Ball number={bonus} />}
        {redo && <button onClick={this.onClickRedo}>한 번 더!</button>}
      </>
    )
  }
}

export default Lotto;