import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';

import mineSearch from './mineSearch';

const Hot = hot(mineSearch);

ReactDOM.render(<Hot />, document.getElementById('root'));