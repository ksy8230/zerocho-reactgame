const React = require('react');
const { Component, useState, useRef } = React;

const WordRelay = () => {

    const [ word, setWord ] = useState('김수영');
    const [ value, setvalue ] = useState('');
    const [ result, setresult ] = useState('');
    const onRefInput = useRef(null);

    const onSubmitForm = (e) => {
        e.preventDefault();
        if (word[word.length - 1] === value[0]){
            setresult('딩동댕');
            setWord(value);
            setvalue('');
            onRefInput.current.focus();
        } else {
            setresult('딩동댕');
            setvalue('');
            onRefInput.current.focus();
        }
    };

    const onChangeInput = (e) => {
        setvalue(e.target.value);
    };

    
    return (
        <>
            <div>{word}</div>
            <form onSubmit={onSubmitForm}>
                <label htmlFor="wordInput">글자 입력하기</label>
                <input id="wordInput" type="text" value={value} onChange={onChangeInput} ref={onRefInput} />
                <button className="btn">반영</button>
            </form>
            <div>{result}</div>
        </>
    );
    
}

module.exports = WordRelay;