/*jslint node: true */
"use strict";
var ActionCreator = require('../actions/action-creator');
var MoveQueue = require('../queue/move-queue');

function iterativeRepair(size) {
  var solution = _repairLoop(size);
  MoveQueue.enqueue(ActionCreator.finish);
  return solution;
}

function _repairLoop(size) {
  var numConflicts = Number.POSITIVE_INFINITY;
  var totalIterations = 0;
  var board;
  while (numConflicts > 0) {
    var iterations = 0;
    board = generateRandomBoard(size);
    MoveQueue.enqueue(ActionCreator.updateBoard.bind(null, board.slice()));
    while (iterations < 30) {
      for (var i = 0; i < board.length; i++) minimizeConflicts(board, i);
      numConflicts = totalConflicts(board);
      iterations += board.length;
      if (numConflicts === 0) break;
    }
    totalIterations += iterations;
  }
  return board;
}

function generateRandomBoard(size) {
  var board = [];
  for (var i = 0; i < size; i++) board.push(i);
  return fisherYatesShuffle(board);
}

function minimizeConflicts(board, col) {
  var minConflicts = Number.POSITIVE_INFINITY;
  var minRow;
  for (var row = 0; row < board.length; row++) {
    board[col] = row;
    var conflicts = totalConflicts(board);
    if (conflicts < minConflicts) {
      minConflicts = conflicts;
      minRow = row;
    }
  }
  board[col] = minRow;
  MoveQueue.enqueue(ActionCreator.moveQueen.bind(null, col, minRow));
}

function totalConflicts(board) {
  return diagConflictCount(board) + rowConflictCount(board);
}

function diagConflictCount(board) { // assumes all unique rows
  var downDiags = [];
  while (downDiags.length < board.length * 2) downDiags.push(false);
  var upDiags = downDiags.slice();
  var numConflicts = 0;
  for (var i = 0; i < board.length; i++) {
    var downDiag = i - board[i] + (board.length - 1);
    if (!downDiags[downDiag]) {
      downDiags[downDiag] = true;
    } else {
      numConflicts++;
    }

    var upDiag = i + board[i];
    if (!upDiags[upDiag]) {
      upDiags[upDiag] = true;
    } else {
      numConflicts++;
    }
  }
  return numConflicts;
}

function rowConflictCount(board) {
  var row = [];
  var numConflicts = 0;
  while (row.length < board.length) row.push(false);
  for (var i = 0; i < board.length; i++) {
    if (row[board[i]]) {
      numConflicts++;
    } else {
      row[board[i]] = true;
    }
  }
  return numConflicts;
}

function fisherYatesShuffle(arr) {
  for (var i = 0; i < arr.length; i++) {
    var j = Math.floor(Math.random() * (arr.length - i) + i);
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}

// function render(board) {
//   console.log(board);
//   var rows = [];
//   for (var i = 0; i < board.length; i++) {
//     var row = [];
//     for (var j = 0; j < board.length; j++) {
//       row.push(board[i] === j ? "Q" : ".");
//     }
//     rows.push(row);
//   }
//   rows.forEach(function (row) { console.log(row.join(" ")); });
// }

module.exports = {
  run: function (n) {
    iterativeRepair(n || 8);
  }
};
