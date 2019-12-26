import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';

import NumberBaseBall from './NumberBaseBall';

const Hot = hot(NumberBaseBall);

ReactDOM.render(<Hot />, document.getElementById('root'));