/*jslint node: true */
"use strict";
function backtrackingQueens(size) {
  var board = new Array(size);
  var solution = dfs(board, 0, size); // start one queen at a time and satisfy constraints
  if (solution) render(board);
}

function dfs(board, currentQueen, size) {
  if (currentQueen === size) return true; // return true if we've placed the nth queen

  for (var row = 0; row < size; row++) {
    board[currentQueen] = row; // set that queen and check if it's valid
    if (validPlacement(board, currentQueen)) {
      var done = dfs(board, currentQueen + 1, size); // if it works, go deeper
      if (done) return true;
    }
  }
}

function validPlacement(board, currentQueen) {
  for (var queen = 0; queen < currentQueen; queen++) { // check against every queen already placed
    if (conflictsWith(board, queen, currentQueen)) {
      return false;
    }
  }
  return true;
}

function conflictsWith(board, x1, x2) {
  global.iterations++;
  var y1 = board[x1], y2 = board[x2];
  return y1 === y2 || Math.abs(x2 - x1) === Math.abs(y2 - y1); // row or diags intersect
}

function render(board) {
  console.log(board);
  for (var i = 0; i < board.length; i++) {
    var row = [];
    for (var j = 0; j < board.length; j++) {
      row.push(board[i] === j ? "Q" : ".");
    }
    console.log(row.join(" "));
  }
}

global.iterations = 0;
backtrackingQueens(8);
console.log(global.iterations);