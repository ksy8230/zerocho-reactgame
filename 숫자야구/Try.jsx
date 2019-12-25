import React from 'react';

const Try = ({ tryInfo }) => {
    return (
        <>
            <li>{tryInfo.try}</li>
            <li>{tryInfo.result}</li>
        </>
    )
};

// const Try = ( props ) => {
//     return (
//         <>
//             <li>{props.tryInfo.try}</li>
//             <li>{props.tryInfo.result}</li>
//         </>
//     )
// }


export default Try;