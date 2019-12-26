import React, { PureComponent } from 'react';

class Test extends PureComponent {
    state = {
        counter : 0,
        string: 'hello',
        number: 1,
        boolean: true,
        object: {},
        array: []
    };

    // 단점: object, array와 같이 복잡한 값은 PureComponent도 못 알아차린다.
    onClick = () => {
        this.setState({
            array: [...this.state.array, 1],
        });
    };

    render () {
        console.log('렌더링', this.state);
        return (
            <div>
                <button onClick={this.onClick}>클릭</button>
            </div>
        )
    };
}

export default Test;