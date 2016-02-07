require('rc-slider/assets/index.css');

var React = require('react');
var Board = require('./board');
var AlgoSelector = require('./algo-selector');
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
        <AlgoSelector algos={algos} />
        <Slider />
      </div>
    )
  }
});

module.exports = Container;
