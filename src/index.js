var React = require('react');
var ReactDOM = require('react-dom');
var App = require('./App');
var Board = require('./components/board');
var Queen = require('./components/queen');
var Square = require('./components/square');


ReactDOM.render(
  <Board queenPosition={[2, 3]} boardSize={800}/>,
  document.getElementById('root'));
