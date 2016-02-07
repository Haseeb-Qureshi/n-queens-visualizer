var React = require('react');
var ScriptStore = require('../../stores/script-store');

function getTemp() {
  return { temp: ScriptStore.getTemp() };
}

var TempDisplay = React.createClass({
  onChange: function () {
    this.setState(getTemp());
  },

  getInitialState: function () {
    return getTemp();
  },

  componentDidMount: function () {
    ScriptStore.addChangeListener(this.onChange);
  },

  componentWillUnmount: function () {
    ScriptStore.removeChangeListener(this.onChange);
  },

  render: function () {
    return (
      <div className="temp">Temperature: <br />{this.state.temp || 0}</div>
    )
  }
});

module.exports = TempDisplay;
