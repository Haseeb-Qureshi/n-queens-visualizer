require('rc-slider/assets/index.css');

var React = require('react');
var Board = require('./board');
var AlgoSelector = require('./algo-selector');
var Slider = require('rc-slider');
var SliderProps = require('./slider');

var Container = React.createClass({

  render: function () {
    var algos = [
      "Brute force permutations",
      "Backtracking",
      "Random permutations",
      "Iterative repair",
      "Simulated annealing"
    ];

    return (
      <div className="container">
        <Board />
        <AlgoSelector algos={algos} />
        <Slider min={SliderProps.min}
                onChange={SliderProps.onChange}
                marks={SliderProps.marks} />
      </div>
    )
  }
});

module.exports = Container;
