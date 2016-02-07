/*jslint node: true */
"use strict";
var ActionCreator = require('../actions/action-creator');
var MoveQueue = require('../queue/move-queue');

function randomPermutations(size) {
  if (size === 2 || size === 3) return false;
  var board = [];
  for (var i = 0; i < size; i++) board.push(i);
  while (true) {
    fisherYatesShuffle(board);
    MoveQueue.enqueue(ActionCreator.updateBoard.bind(null, board.slice()));
    if (noDiagConflicts(board)) return board;
  }
}

function noDiagConflicts(board) {
  var downDiags = [];
  while (downDiags.length < board.length * 2) downDiags.push(false);
  var upDiags = downDiags.slice();
  for (var i = 0; i < board.length; i++) {
    MoveQueue.enqueue(ActionCreator.iterate);

    var downDiag = i - board[i] + (board.length - 1);
    if (!downDiags[downDiag]) {
      downDiags[downDiag] = true;
    } else {
      return false;
    }

    var upDiag = i + board[i];
    if (!upDiags[upDiag]) {
      upDiags[upDiag] = true;
    } else {
      return false;
    }
  }
  return true;
}

function fisherYatesShuffle(arr) {
  for (var i = 0; i < arr.length; i++) {
    var j = Math.floor(Math.random() * (arr.length - i) + i);
    swap(arr, i, j);
  }
  return arr;
}

function swap(arr, x, y) {
  var temp = arr[x];
  arr[x] = arr[y];
  arr[y] = temp;
}
//
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
    randomPermutations(n || 8);
  }
};
