import React, { PureComponent, memo, useState } from 'react';

class Try extends PureComponent {
    render( ) {
        const { tryInfo } = this.props;
        return (
            <li>
                <div>{tryInfo.try}</div>
                <div>{tryInfo.result}</div>
            </li>
        );
    }
}

// const Try = memo(({ tryInfo }) => {
//     const [ result, setResult ] = useState(tryInfo.result);
//     const onClick = () => {
//         setResult('1')
//     }
//     return (
//         <li>
//             <div>{tryInfo.try}</div>
//             <div onClick={onClick}>{result}</div>
//         </li>
//     )
// });

// const Try = ( props ) => {
//     return (
//         <>
//             <li>{props.tryInfo.try}</li>
//             <li>{props.tryInfo.result}</li>
//         </>
//     )
// }


export default Try;