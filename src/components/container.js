require('rc-slider/assets/index.css');

var React = require('react');
var Board = require('./board');
var AlgoPanel = require('./algo-panel');
var Slider = require('./slider');

var algos = [
  "Brute force permutations",
  "Random permutations",
  "Backtracking",
  "Simulated annealing",
  "Iterative repair"
];

var Container = React.createClass({
  render: function () {
    return (
      <div className="container">
        <Board />
        <AlgoPanel algos={algos} />
        <Slider />
      </div>
    )
  }
});

module.exports = Container;
