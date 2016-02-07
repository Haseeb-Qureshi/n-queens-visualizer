var AppDispatcher = require('../dispatcher/app-dispatcher');
var EventEmitter = require('events').EventEmitter;
var ScriptStore = require('./script-store');
var assign = require('object-assign');
var n = 8;

var board = new Array(n);

var BoardStore = assign({}, EventEmitter.prototype, {
  emitChange: function () {
    this.emit('change');
  },

  addChangeListener: function (callback) {
    this.on('change', callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener('change', callback);
  },

  getBoard: function () {
    return board;
  },

  _updateBoard: function (newBoard) {
    board = newBoard;
    BoardStore.emitChange();
  },

  _moveQueen: function (action) {
    var queenId = action.data[0], toRow = action.data[1];
    board[queenId] = toRow;
    BoardStore.emitChange();
  },

  _resetBoard: function () {
    board = new Array(n);
  }
});


BoardStore.dispatchToken = AppDispatcher.register(function (action) {
  switch (action.actionType) {
    case "MOVE_QUEEN":
      AppDispatcher.waitFor([ScriptStore.dispatchToken]);
      BoardStore._moveQueen(action);
      break;
    case "UPDATE_BOARD":
      AppDispatcher.waitFor([ScriptStore.dispatchToken]);
      BoardStore._updateBoard(action.data);
      break;
    case "RUN_SCRIPT":
      BoardStore._resetBoard();
      break;
    default:
  }
});

window.boardstore = BoardStore;
module.exports = BoardStore;
