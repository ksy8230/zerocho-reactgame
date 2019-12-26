import React, {Component} from 'react';

class ResponseCheck extends Component {
    state = {
        status: 'waiting',
        message: '클릭해서 시작',
        result: [],
    };

    timeout;
    startTime;
    endTime;

    onClickScreen = () => {
        const { status, message, result } = this.state;
        if (status === 'waiting') {
            this.setState({
                status: 'ready',
                message: 'ready : 초록색이 되면 클릭!'
            });
            this.timeout = setTimeout(() => {
                this.setState({
                    status: 'now',
                    message: 'now : 지금 클릭'
                });
                // 반응속도 시작점
                this.startTime = new Date();
            }, Math.floor(Math.random() * 1000) + 2000);
        } else if ( status === 'ready') {
            // now 전에 클릭하면 여기
            clearTimeout(this.timeout);
            this.setState({
                status: 'waiting',
                message: '성급! 초록색이 되면 클릭하세요'
            });
        } else if ( status === 'now') {
            // 반응속도 체크하는 곳은 여기 
            // 반응속도 끝점
            this.endTime = new Date();
            this.setState((prevState) => {
                return {
                    status: 'waiting',
                    message: '클릭해서 시작',
                    result: [...prevState.result, this.endTime - this.startTime],
                };
            });
        }
    };

    onReset = () => {
        this.setState({
            result: [],
        })
    }

    renderAverage = () => {
        const { result } = this.state;
        return result.length === 0 
        ? null : 
        <>
            <div> 평균 시간: {result.reduce((a, c) => a + c) / result.length}ms </div>
            <button onClick={this.onReset}>리셋</button>
        </>
    }

    render () {
        const { status, message } = this.state;

        return(
            <>
                <div
                    id="screen"
                    className={status}
                    onClick={this.onClickScreen}
                >
                    {message}
                </div>
                
                {this.renderAverage()}

            </>
        )
    }
}

export default ResponseCheck;