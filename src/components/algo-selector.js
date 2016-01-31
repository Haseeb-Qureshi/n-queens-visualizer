var React = require('react');
var ActionCreator = require('../actions/action-creator');

function formatScriptName (text) {
  return text;
}

var AlgoSelector = React.createClass({
  onClick: function (e) {
    e.preventDefault();
    var script = e.currentTarget.textContent;
    ActionCreator.runScript(formatScriptName(script));
  },

  render: function () {
    var buttons = [];
    this.props.algos.forEach(function (algo, i) {
      buttons.push(<button onClick={this.onClick} key={i}>{algo}</button>)
    }.bind(this));

    return <div>{buttons}</div>;
  }
});

module.exports = AlgoSelector;
