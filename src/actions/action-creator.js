var AppDispatcher = require('../dispatcher/app-dispatcher');
var deferFunc = require('../utils/util').deferFunc;

module.exports = {
  moveQueen: function (queenId, toRow) {
    deferFunc(AppDispatcher.dispatch.bind(AppDispatcher, {
      actionType: "MOVE_QUEEN",
      data: [queenId, toRow]
    }));
  },

  iterate: function () {
    deferFunc(AppDispatcher.dispatch.bind(AppDispatcher, {
      actionType: "ITERATE"
    }));
  },

  runScript: function (scriptName) {
    deferFunc(AppDispatcher.dispatch.bind(AppDispatcher, {
      actionType: "RUN_SCRIPT",
      scriptName: scriptName
    }));
  },

  changeSpeed: function (speed) {
    deferFunc(AppDispatcher.dispatch.bind(AppDispatcher, {
      actionType: "CHANGE_SPEED",
      newSpeed: speed
    }));
  },

  changeSize: function (size) {
    deferFunc(AppDispatcher.dispatch.bind(AppDispatcher, {
      actionType: "CHANGE_SIZE",
      newSize: size
    }));
  },

  finish: function () {
    deferFunc(AppDispatcher.dispatch.bind(AppDispatcher, {
      actionType: "FINISH"
    }));
  }
};
