import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';

import NumberResponse from './NumberResponse';

const Hot = hot(NumberResponse);

ReactDOM.render(<Hot />, document.getElementById('root'));