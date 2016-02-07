var React = require('react');
var ActionCreator = require('../actions/action-creator');
var ScriptStore = require('../stores/script-store');
var AlgoSelector = require('./algo-selector');

var AlgoInfo = React.createClass({
  render: function () {
    return (
      <div className="right-panel">
        <AlgoSelector algos={this.props.algos} />
      </div>
    )
  }
});

module.exports = AlgoInfo;
