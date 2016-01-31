/*jslint node: true */
"use strict";

var actionCreator = require('../actions/action-creator');

function backtrackingQueens(size) {
  var board = new Array(size);
  var solution = dfs(board, 0, size); // start one queen at a time and satisfy constraints
  if (solution) actionCreator.finish();
}

function dfs(board, currentQueen, size) {
  if (currentQueen === size) return true; // return true if we've placed the nth queen

  for (var row = 0; row < size; row++) {
    board[currentQueen] = row; // set that queen and check if it's valid
    actionCreator.moveQueen(currentQueen, row);
    if (validPlacement(board, currentQueen)) {
      var done = dfs(board, currentQueen + 1, size); // if it works, go deeper
      if (done) return true;
    }
  }
  actionCreator.moveQueen(currentQueen, null);
}

function validPlacement(board, currentQueen) {
  for (var queen = 0; queen < currentQueen; queen++) { // check against every queen already placed
    if (conflictsWith(board, queen, currentQueen)) return false;
  }
  return true;
}

function conflictsWith(board, x1, x2) {
  actionCreator.iterate();
  var y1 = board[x1], y2 = board[x2];
  return y1 === y2 || Math.abs(x2 - x1) === Math.abs(y2 - y1); // row or diags intersect
}

// function render(board) {
//   console.log(board);
//   for (var i = 0; i < board.length; i++) {
//     var row = [];
//     for (var j = 0; j < board.length; j++) {
//       row.push(board[i] === j ? "Q" : ".");
//     }
//     console.log(row.join(" "));
//   }
// }

module.exports = {
  run: function (n) {
    backtrackingQueens(n || 8);
  }
};
