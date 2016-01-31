var AppDispatcher = require('../dispatcher/app-dispatcher');

module.exports = {
  moveQueen: function (queenId, toRow) {
    var action = {
      actionType: "MOVE_QUEEN",
      data: [queenId, toRow]
    };

    AppDispatcher.dispatch(action);
  }
};
