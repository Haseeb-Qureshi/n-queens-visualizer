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

  getBoard: function () {
    return board;
  },

  _moveQueen: function (action) {
    var queenId = action.data[0], toRow = action.data[1];
    board[queenId] = toRow;
    this.emitChange();
  }
});


BoardStore.dispatchToken = AppDispatcher.register(function (action) {
  switch (action.actionType) {
    case "MOVE_QUEEN":
      BoardStore._moveQueen(action);
      break;
    default:
  }
});

module.exports = BoardStore;
