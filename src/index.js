var React = require('react');
var ReactDOM = require('react-dom');
var App = require('./App');
var Board = require('./components/board');
var Knight = require('./components/knight');
var Square = require('./components/square');


ReactDOM.render(
  <Board knightPosition={[0, 0]} boardSize={800}/>,
  document.getElementById('root'));
