var React = require('react');
var ActionCreator = require('../actions/action-creator');
var ScriptStore = require('../stores/script-store');
var AlgoSelector = require('./algos/algo-selector');
var IterationsDisplay = require('./algos/iterations-display');

var AlgoPanel = React.createClass({
  render: function () {
    return (
      <div className="algo-panel">
        <AlgoSelector algos={this.props.algos} />
        <IterationsDisplay />
      </div>
    )
  }
});

module.exports = AlgoPanel;
