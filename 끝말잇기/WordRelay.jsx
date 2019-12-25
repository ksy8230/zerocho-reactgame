const React = require('react');
const { Component } = React;

class WordRelay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            word: '김수영',
            value: '',
            result: ''
        };
        this.onSubmitForm = this.onSubmitForm.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
    }

    onSubmitForm = (e) => {
        e.preventDefault();
        if (this.state.word[this.state.word.length - 1] === this.state.value[0]){
            this.setState({
                result : '딩동댕',
                word: this.state.value,
                value: '',
            })
            this.input.focus();
        } else {
            this.setState({
                result : '땡',
                value: '',
            })
            this.input.focus();
        }
    };

    onChangeInput = (e) => {
        this.setState({ value : e.target.value });
    };

    input;

    onRefInput = (c) => {
        this.input = c;
    };
    
    render(){
        return (
            <>
                <div>{this.state.word}</div>
                <form onSubmit={this.onSubmitForm}>
                    <input type="text" value={this.state.value} onChange={this.onChangeInput} ref={this.onRefInput} />
                    <button>반영</button>
                </form>
                <div>{this.state.result}</div>
            </>
        );
    }    
}

module.exports = WordRelay;