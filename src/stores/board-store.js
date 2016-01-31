var AppDispatcher = require('../dispatcher/app-dispatcher');

var EventEmitter = require('events').EventEmitter;
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

  _moveQueen: function (queenId, toRow) {
    board[queenId] = toRow;
  },

  getBoard: function () {
    return board;
  },
});

window.APPDISPATCHER = AppDispatcher;

AppDispatcher.register(function (action) {
  switch (action.actionType) {
    case "MOVE_QUEEN":
      BoardStore._moveQueen(action.data[0], action.data[1]);
      BoardStore.emitChange();
      break;
    default:
  }
});

module.exports = BoardStore;
