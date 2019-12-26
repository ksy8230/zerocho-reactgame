import React, { Component, useState, useRef, useEffect } from 'react';

const rspCoords = {
    바위 : '0',
    가위 : '-142px',
    보 : '-284px',
};

const scores = {
    가위: 1,
    바위: 0,
    보: -1,
};

const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find(function(v){
        return v[1] === imgCoord;
    })[0];
};

//                        result,   imgCoord,   score
// componentDidMount
// componentDidUpdate
// componentWillUnmount

// 3*3 표로 봤을 때 useEffect는 세로형으로 result 인자를 기준으로 라이프 사이클을 가지고
// componentDidMount, componentDidUpdate, componentWillUnmount 함수들은 가로형에 해당한다

// componentDidMount() {
//     this.setState({
//         imgCoord,
//         result,
//         score,
//     })
// };

// useEffect(() => {
//     setImgCoord();
//     setResult();
// }, [imgCoord, result]);

// useEffect(() => {
//     setScore();
// }, [score]);


const RSP = () => {
    const [result, setResult] = useState('');
    const [imgCoord, setImgCoord] = useState('0');
    const [score, setScore] = useState(0);
    const interval = useRef();

    useEffect(() => { // componentDidUpdate, componentDidMound 역할
        interval.current = setInterval( changeHand, 200)
        return () => { // componentWillUnmount 역할
            clearInterval(interval.current);
        }
    }, [imgCoord]); // 두번째 인수 배열에 넣은 값들이 바뀔 때 useEffect가 실행

    const changeHand = () => {
        if (imgCoord === rspCoords.바위) {
            setImgCoord(rspCoords.가위);
        } else if (imgCoord === rspCoords.가위) {
            setImgCoord(rspCoords.보);
        } else if (imgCoord === rspCoords.보) {
            setImgCoord(rspCoords.바위);
        }
    };

    const onClickBtn = (choice) => () => {
        clearInterval(interval.current);
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;
        if (diff === 0) {
            setResult('비겼습니다!');
        } else if ([-1, 2].includes(diff)){
            setResult('이겼습니다!');
            setScore((prevState) => {
                return prevState + 1
            });
        } else {
            setResult('졌습니다');
            setScore((prevState) => {
                return prevState - 1
            });
        }
        setTimeout(() => {
            interval.current = setInterval(changeHand, 200);
        }, 2000);
        
    };

    return (
        <>
            <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
            <div>
                <button id="rock" className="btn" onClick={onClickBtn('바위')}>바위</button>
                <button id="scissor" className="btn" onClick={onClickBtn('가위')}>가위</button>
                <button id="paper" className="btn" onClick={onClickBtn('보')}>보</button>
            </div>
            <div>{result}</div>
            <div>현재 스코어 {score}</div>
        </>
    )
}

export default RSP;