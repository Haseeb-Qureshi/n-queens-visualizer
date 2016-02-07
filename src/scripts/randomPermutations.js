/*jslint node: true */
"use strict";
var ActionCreator = require('../actions/action-creator');
var ActionQueue = require('../queue/action-queue');

function randomPermutations(size) {
  if (size === 2 || size === 3) return false;
  var board = [];
  for (var i = 0; i < size; i++) board.push(i);
  while (true) {
    fisherYatesShuffle(board);
    ActionQueue.enqueue(ActionCreator.updateBoard.bind(null, board.slice(), size));
    if (noDiagConflicts(board)) {
      ActionQueue.enqueue(ActionCreator.finish);
      return board;
    }
  }
}

function noDiagConflicts(board) {
  var downDiags = [];
  while (downDiags.length < board.length * 2) downDiags.push(false);
  var upDiags = downDiags.slice();
  for (var i = 0; i < board.length; i++) {
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

module.exports = {
  run: function (n) {
    randomPermutations(n || 8);
  }
};
