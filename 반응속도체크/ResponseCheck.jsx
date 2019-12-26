import React, {Component, useRef, useState} from 'react';

const ResponseCheck = () => {
    const [status, setStatus] = useState('waiting');
    const [message, setMessage] = useState('클릭해서 시작');
    const [result, setResult] = useState([]);
    const timeout = useRef(null);
    const startTime = useRef();
    const endTime = useRef();

    const onClickScreen = () => {
        //const { status, message, result } = this.state;
        if (status === 'waiting') {
            setStatus('ready');
            setMessage('ready : 초록색이 되면 클릭!');
            timeout.current = setTimeout(() => {
                setStatus('now');
                setMessage('now : 지금 클릭');
                // 반응속도 시작점
                startTime.current = new Date();
            }, Math.floor(Math.random() * 1000) + 2000);
        } else if ( status === 'ready') {
            // now 전에 클릭하면 여기
            clearTimeout(timeout.current);
            setStatus('waiting');
            setMessage('성급! 초록색이 되면 클릭하세요');
        } else if ( status === 'now') {
            // 반응속도 체크하는 곳은 여기 
            // 반응속도 끝점
            endTime.current = new Date();
            setStatus('waiting');
            setMessage('클릭해서 시작');
            setResult((prevResult) => {
                return [...prevResult, endTime.current - startTime.current];
            });
        }
    };

    const onReset = () => {
        setResult([]);
    };

    const renderAverage = () => {
        return result.length === 0 
        ? null : 
        <>
            <div> 평균 시간: {result.reduce((a, c) => a + c) / result.length}ms </div>
            <button onClick={onReset}>리셋</button>
        </>
    };

    return (
        <>
          <div
            id="screen"
            className={status}
            onClick={onClickScreen}
          >
            {message}
          </div>
          {renderAverage()}
        </>
    );

};

export default ResponseCheck;