/*jslint node: true */
"use strict";
var ActionCreator = require('../actions/action-creator');
var ActionQueue = require('../queue/action-queue');

function backtrackingQueens(size) {
  var board = new Array(size);
  var solution = dfs(board, 0, size); // start one queen at a time and satisfy constraints
  if (solution) ActionQueue.enqueue(ActionCreator.finish);
}

function dfs(board, currentQueen, size) {
  if (currentQueen === size) return true; // return true if we've placed the nth queen

  for (var row = 0; row < size; row++) {
    board[currentQueen] = row; // set that queen and check if it's valid
    ActionQueue.enqueue(ActionCreator.moveQueen.bind(null, currentQueen, row));
    if (validPlacement(board, currentQueen)) {
      var done = dfs(board, currentQueen + 1, size); // if it works, go deeper
      if (done) return true;
    }
  }
  ActionQueue.enqueue(ActionCreator.moveQueen.bind(null, currentQueen, null));
}

function validPlacement(board, currentQueen) {
  for (var queen = 0; queen < currentQueen; queen++) { // check against every queen already placed
    if (conflictsWith(board, queen, currentQueen)) return false;
  }
  return true;
}

function conflictsWith(board, x1, x2) {
  var y1 = board[x1], y2 = board[x2];
  return y1 === y2 || Math.abs(x2 - x1) === Math.abs(y2 - y1); // row or diags intersect
}

module.exports = {
  run: function (n) {
    backtrackingQueens(n || 8);
  }
};
