var AppDispatcher = require('../dispatcher/app-dispatcher');
var deferFunc = require('../utils/util').deferFunc;

module.exports = {
  moveQueen: function (queenId, toRow) {
    AppDispatcher.dispatch({
      actionType: "MOVE_QUEEN",
      data: [queenId, toRow]
    });
  },

  updateBoard: function (board) {
    AppDispatcher.dispatch({
      actionType: "UPDATE_BOARD",
      data: board
    });
  },

  runScript: function (scriptName) {
    AppDispatcher.dispatch({
      actionType: "RUN_SCRIPT",
      scriptName: scriptName
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
  }
};
