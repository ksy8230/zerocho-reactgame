const React = require('react');
const { Component } = React;

class WordRelay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text:'hello'
        }
    }
    
    render(){
        return (
            <React.Fragment>
                {this.state.text}
            </React.Fragment>
        );
    }    
}

module.exports = WordRelay;