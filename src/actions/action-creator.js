var AppDispatcher = require('../dispatcher/app-dispatcher');
var deferFunc = require('../utils/util').deferFunc;

module.exports = {
  moveQueen: function (queenId, toRow) {
    AppDispatcher.dispatch({
      actionType: "MOVE_QUEEN",
      data: [queenId, toRow]
    });
  },

  updateBoard: function (board, numChanges) {
    AppDispatcher.dispatch({
      actionType: "UPDATE_BOARD",
      data: [board, numChanges]
    });
  },

  swapQueens: function (indices) {
    AppDispatcher.dispatch({
      actionType: "SWAP_QUEENS",
      indices: indices
    });
  },

  runScript: function (scriptName) {
    AppDispatcher.dispatch({
      actionType: "RUN_SCRIPT",
      scriptName: scriptName
    });
  },

  updateTemp: function (newTemp) {
    AppDispatcher.dispatch({
      actionType: "UPDATE_TEMP",
      newTemp: newTemp
    });
  },

  modulateSpeed: function (speed) {
    AppDispatcher.dispatch({
      actionType: "MODULATE_SPEED",
      newSpeed: speed
    });
  },

  changeSpeed: function (speed) {
    AppDispatcher.dispatch({
      actionType: "CHANGE_SPEED",
      newSpeed: speed
    });
  },

  changeSize: function (size) {
    AppDispatcher.dispatch({
      actionType: "CHANGE_SIZE",
      newSize: size
    });
  },

  finish: function () {
    AppDispatcher.dispatch({
      actionType: "FINISH"
    });
  },

  failure: function (iterations) {
    AppDispatcher.dispatch({
      actionType: "FAILURE",
      iterations: iterations
    });
  }
};
