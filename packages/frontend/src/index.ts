import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { App } from './App';

const appElement = React.createElement(App);
ReactDOM.render(appElement, document.getElementById('root'));
