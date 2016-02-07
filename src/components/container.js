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
        <h1 className="title"> N-Queens Visualizer </h1>
        <h2 className="attribution">by <a href="https://github.com/Haseeb-Qureshi">Haseeb Qureshi</a></h2>
        <Board />
        <AlgoPanel algos={algos} />
        <div className="row"/>
        <Slider />
      </div>
    )
  }
});

module.exports = Container;
