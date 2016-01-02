/*jslint node: true */
"use strict";
function iterativeRepair(size) {
  var solution = _repairLoop(size);
  render(solution);
}

function _repairLoop(size) {
  var numConflicts = Number.POSITIVE_INFINITY;
  var totalIterations = 0;
  var board;
  while (numConflicts > 0) {
    var iterations = 0;
    board = generateRandomBoard(size);
    while (iterations < 30) {
      for (var i = 0; i < board.length; i++) minimizeConflicts(board, i);
      numConflicts = diagConflictCount(board) + rowConflictCount(board);
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
  
};

function diagConflictCount(board) { // assumes all unique rows
  var downDiags = [];
  while (downDiags.length < board.length * 2) downDiags.push(false);
  var upDiags = downDiags.clone();
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
    if (!row[board[i]]) {
      numConflicts++;
    } else {
      row[board[i]] = true;
    }
  }
  return numConflicts;
}

function pointConflictCount(board, x, y) {
  var conflicts = 0;
  for (var i = 0; i < board.length; i++) {
    // columns always unique!
    // look at rows
    if (board[i] === x && i !== x) conflicts++; // double check this logic... this is so that a thing doesn't conflict with itself
    // i = column
    // board[i] = row

    // look at diags
    if (x - y === board[i] - i || x + y === board[i] + i) conflicts++;
  }
  return conflicts;
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

0, 0
2, 2
3, 1

x1 - y1 == x2 - y2
||
x1 + y1 == x2 + y2
