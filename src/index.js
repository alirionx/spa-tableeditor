import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Mytable from './App';
import HeadBlock from './Head';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Mytable />, document.getElementById('root')
);

ReactDOM.render(
  <HeadBlock />, document.getElementById('headBlock')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
