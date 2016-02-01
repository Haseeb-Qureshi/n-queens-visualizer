var React = require('react');
var Board = require('./board');
var AlgoSelector = require('./algo-selector');

var Container = React.createClass({

  render: function () {
    var algos = [
      "Backtracking",
      "Brute force permutations",
      "Iterative repair",
      "Simulated annealing"
    ];

    return (
      <div className="container">
        <Board />
        <AlgoSelector algos={algos} />
      </div>
    )
  }
});

module.exports = Container;
