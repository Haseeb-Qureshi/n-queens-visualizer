var React = require('react');
var ActionCreator = require('../../actions/action-creator');
var ScriptStore = require('../../stores/script-store');

var AlgoSelector = React.createClass({
  onClick: function (e) {
    e.preventDefault();
    ActionCreator.runScript(e.currentTarget.textContent);
  },

  render: function () {
    var buttons = [];
    this.props.algos.forEach(function (algo, i) {
      buttons.push(<li key={i}><button onClick={this.onClick}>{algo}</button></li>)
    }.bind(this));

    return <ul className="buttons">{buttons}</ul>;
  }
});

module.exports = AlgoSelector;
