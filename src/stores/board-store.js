var AppDispatcher = require('../dispatcher/app-dispatcher');
var EventEmitter = require('events').EventEmitter;
var ScriptStore = require('./script-store');
var assign = require('object-assign');

var n = 8;
var iterations = 0;
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

  getIterations: function () {
    return iterations;
  },

  _updateBoard: function (data) {
    var newBoard = data[0], numChanges = data[1];
    board = newBoard;
    iterations += numChanges;
    BoardStore.emitChange();
  },

  _moveQueen: function (queenId, toRow) {
    board[queenId] = toRow;
    iterations++;
    BoardStore.emitChange();
  },

  _swapQueens: function (indices) {
    var i1 = indices[0], i2 = indices[1];
    var firstRow = board[i1];
    this._moveQueen(i1, board[i2]);
    this._moveQueen(i2, firstRow);
  },

  _resetBoard: function () {
    iterations = 0;
    board = new Array(n);
    BoardStore.emitChange();
  }
});

BoardStore.dispatchToken = AppDispatcher.register(function (action) {
  switch (action.actionType) {
    case "MOVE_QUEEN":
      AppDispatcher.waitFor([ScriptStore.dispatchToken]);
      BoardStore._moveQueen(action.data[0], action.data[1]);
      break;
    case "UPDATE_BOARD":
      AppDispatcher.waitFor([ScriptStore.dispatchToken]);
      BoardStore._updateBoard(action.data);
      break;
    case "SWAP_QUEENS":
      AppDispatcher.waitFor([ScriptStore.dispatchToken]);
      BoardStore._swapQueens(action.indices);
      break;
    case "FAILURE":
      alert("Failed to converge on a correct solution. Try again.");
      break;
    case "RUN_SCRIPT":
      BoardStore._resetBoard();
      break;
    default:
  }
});

module.exports = BoardStore;
