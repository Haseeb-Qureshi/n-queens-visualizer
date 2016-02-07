var React = require('react');
var ActionCreator = require('../actions/action-creator');
var RCSlider = require('rc-slider');

var marks = {
  1: "1 ms",
  50: "50 ms",
  100: "100 ms",
  150: "150 ms",
  200: "200 ms"
};

var Slider = React.createClass({
  changeSpeed: function (newSpeed) {
    newSpeed = newSpeed *= 2;
    ActionCreator.changeSpeed(newSpeed);
  },

  render: function () {
    return (
      <div className="slider">
        <RCSlider min={1} max={200} onChange={this.changeSpeed} marks={marks} />
      </div>
    )
  }
});

module.exports = Slider;
