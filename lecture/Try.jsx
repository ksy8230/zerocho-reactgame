import React, { PureComponent, memo } from 'react';

// class Try extends PureComponent {
//     render( ) {
//         const { tryInfo } = this.props;
//         return (
//             <li>
//                 <div>{tryInfo.try}</div>
//                 <div>{tryInfo.result}</div>
//             </li>
//         );
//     }
// }

const Try = memo(({ tryInfo }) => {
    return (
        <li>
            <div>{tryInfo.try}</div>
            <div>{tryInfo.result}</div>
        </li>
    )
});

// const Try = ( props ) => {
//     return (
//         <>
//             <li>{props.tryInfo.try}</li>
//             <li>{props.tryInfo.result}</li>
//         </>
//     )
// }


export default Try;