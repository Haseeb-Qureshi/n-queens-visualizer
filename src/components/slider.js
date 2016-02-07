var ActionCreator = require('../actions/action-creator');

var marks = {
  1: "1 ms",
  25: "25 ms",
  50: "50 ms",
  75: "75 ms",
  100: "100 ms"
};

var min = 1;

function changeSpeed(newSpeed) {
  ActionCreator.changeSpeed(newSpeed);
}

module.exports = {
  onChange: changeSpeed,
  marks: marks,
  min: min
};
