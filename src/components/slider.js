var React = require('react');
var ActionCreator = require('../actions/action-creator');
var RCSlider = require('rc-slider');

var marks = {
  1: "1 ms",
  100: "100 ms",
  200: "200 ms",
  300: "300 ms",
  400: "400 ms",
  500: "500 ms"
};

var Slider = React.createClass({
  modulateSpeed: function (newSpeed) {
    console.log("modulate!")
    ActionCreator.modulateSpeed(newSpeed);
  },

  changeSpeed: function (newSpeed) {
    console.log("change!")
    ActionCreator.changeSpeed(newSpeed);
  },

  render: function () {
    return (
      <div className="slider">
        <RCSlider
          defaultValue={125}
          min={1}
          max={500}
          onChange={this.modulateSpeed}
          onAfterChange={this.changeSpeed}
          marks={marks}
        />
      </div>
    )
  }
});

module.exports = Slider;
