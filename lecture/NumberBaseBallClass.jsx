import React, { Component, createRef } from 'react';
import Try from "./Try";

function getNumbers () {
    const candidate = [1,2,3,4,5,6,7,8,9];
    const array = [];
    for ( let i = 0; i < 4; i += 1){
        let select = Math.floor(Math.random() * candidate.length);
        array[i] = candidate.splice(select, 1)[0]
    }
    return array;
    console.log(array)
}

class NumberBaseball extends Component {
    state = {
        result : '',
        value : '',
        answer: getNumbers(), // [1,7,3,5]
        tries : [],
    };

    onChangeInput = (e) => {
        this.setState({
            value : e.target.value
        })
    }

    onSubmitForm = (e) => {
        e.preventDefault();
        const { value, tries, answer } = this.state;
        if (value === answer.join('')) {
            this.setState((prevState) =>{
                return {
                    result: '홈런!',
                    tries: [...prevState.tries, { try: value, result: '홈런!'}],
                }
            });
            alert('게임을 다시 시작합니다.');
            this.setState({
                value: '',
                answer: getNumbers(),
                tries:[],
            });
            this.inputRef.current.focus();
        } else {
            const answerArray = value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if (tries.length >= 9) {
                this.setState({
                    result: `10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다!`,
                });
                alert('게임을 다시 시작합니다.');
                this.setState({
                    value: '',
                    answer: getNumbers(),
                    tries: [],
                });
                this.inputRef.current.focus();
            } else {
                for (let i = 0; i < 4; i ++){
                    if (answerArray[i] === answer[i]) {
                        strike += 1;
                    } else if (answer.includes(answerArray[i])){
                        ball += 1;
                    }
                }
                this.setState((prevState) => {
                    return {
                        tries: [...prevState.tries, { try: value, result : `${strike} 스크라이크, ${ball} 볼입니다.`}],
                    }
                })
            }
        }
    };

    inputRef = createRef();

    //onInputRef = (c) => { this.inputRef = c; };

    render() {
        return (
            <>  
                <h1>{this.state.result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input ref={this.inputRef} maxLength={4} value={this.state.value} onChange={this.onChangeInput} />
                    <button>입력</button>
                </form>
                
                <div>시도 : {this.state.tries.length}</div>
                <ul>
                    {this.state.tries.map( (v, i) => {
                        return (
                            <Try key={i + v} tryInfo={v} />

                        );
                    })}
                </ul>
            </>
        );
    }
}

export default NumberBaseball;