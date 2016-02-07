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

  hslaFromTemp: function (temp) {
    var normalizedTemp = temp / 10;
    var hue = 190 + normalizedTemp * (360 - 190);
    return "hsla(" + (hue || 360) + ", 100%, 50%, 1)";
  },

  formatTemp: function (temp) {
    var tempStr = temp.toString();
    if (tempStr.length < 3) tempStr += ".";
    while (tempStr.split(".")[1].length < 2) tempStr += "0";
    return tempStr;
  },

  render: function () {
    var temp = this.state.temp === null ? 10 : this.state.temp;
    var style = { color: this.hslaFromTemp(temp) };
    return (
      <div className="temp" style={style}>
        Temperature: {this.formatTemp(temp)}
      </div>
    )
  }
});

module.exports = TempDisplay;
