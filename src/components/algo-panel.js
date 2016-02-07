var React = require('react');
var ActionCreator = require('../actions/action-creator');
var ScriptStore = require('../stores/script-store');
var AlgoSelector = require('./algos/algo-selector');
var IterationsDisplay = require('./algos/iterations-display');
var ScriptStore = require('../stores/script-store');
var TempDisplay = require('./algos/temp-display');

function getScriptName() {
  return { script: ScriptStore.getScriptName() };
}

var AlgoPanel = React.createClass({
  getInitialState: function () {
    return getScriptName();
  },

  onChange: function () {
    this.setState(getScriptName());
  },

  componentDidMount: function () {
    ScriptStore.addChangeListener(this.onChange);
  },

  componentWillUnmount: function () {
    ScriptStore.removeChangeListener(this.onChange);
  },

  render: function () {
    return (
      <div className="algo-panel">
        <AlgoSelector algos={this.props.algos} />
        <IterationsDisplay />
        { this.state.script === "Simulated annealing" ? <TempDisplay /> : null }
      </div>
    )
  }
});

module.exports = AlgoPanel;
