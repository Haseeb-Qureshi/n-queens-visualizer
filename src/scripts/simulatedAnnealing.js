/*jslint node: true */
"use strict";
var ActionCreator = require('../actions/action-creator');
var ActionQueue = require('../queue/action-queue');

var currentBoard,
    coolingFactor,
    stabilizingFactor,
    freezingTemp,
    currentTemp,
    currentConflicts,
    currentStabilizer;

function initializeSettings() {
    coolingFactor = 0.25;
    stabilizingFactor = 1.05;
    freezingTemp = 0.0;
    currentTemp = 10.0;
    currentConflicts = Number.POSITIVE_INFINITY;
    currentStabilizer = 9.0;
}

function probabilityFn(temp, delta) {
  if (delta < 0) return true;

  var threshold = Math.exp(-delta / temp);
  var rand = Math.random();

  if (rand < threshold) return true;
  return false;
}

function step() {
  if (currentTemp > freezingTemp) {
    for (var i = 0; i < currentStabilizer; i++) {
      var neighborData = generateNeighbor(currentBoard);

      var neighborBoard = neighborData.neighborBoard;
      var neighborSwaps = neighborData.indices;
      var numConflicts = conflictCount(currentBoard);
      var neighborConflicts = conflictCount(neighborBoard);

      var valueDelta = neighborConflicts - numConflicts;

      if (probabilityFn(currentTemp, valueDelta)) {
        ActionQueue.enqueue(ActionCreator.swapQueens.bind(null, neighborSwaps));
        currentBoard = neighborBoard;
        currentConflicts = neighborConflicts;
      }
    }
    currentTemp -= coolingFactor;
    currentStabilizer *= stabilizingFactor;
    ActionQueue.enqueue(ActionCreator.updateTemp.bind(null, currentTemp));
    return false;
  }
  currentTemp = freezingTemp;
  return true;
}

function conflictCount(board) { // assumes all unique rows
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

// generate initial state
function initialBoard(size) {
  var board = [];
  for (var i = 0; i < size; i++) board.push(i);
  return fisherYatesShuffle(board);
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

// generate neighbor from initial state
function generateNeighbor(board) {
  var indices = [];
  while (uniq(indices).length < 2) {
    indices.push(Math.floor(Math.random() * board.length));
  }

  return {
    neighborBoard: swappedBoard(board.slice(), indices),
    indices: indices
  };
}

function uniq(array) {
  return array.filter(function (item, i, arr) {
    return arr.indexOf(item) === i;
  });
}

function swappedBoard(board, indices) {
  var temp = board[indices[0]];
  board[indices[0]] = board[indices[1]];
  board[indices[1]] = temp;
  return board;
}

function simulatedAnnealing(n) {
  initializeSettings();
  ActionQueue.enqueue(ActionCreator.updateTemp.bind(null, currentTemp));
  currentBoard = initialBoard(n);
  ActionQueue.enqueue(ActionCreator.updateBoard.bind(null, currentBoard.slice(), n));
  var iterations = 0;
  while (currentTemp > freezingTemp) {
    iterations++;
    step();
    if (currentConflicts === 0) return ActionQueue.enqueue(ActionCreator.finish);
  }
  ActionQueue.enqueue(ActionCreator.failure.bind(null, iterations));
}

module.exports = {
  run: function (n) {
    simulatedAnnealing(n || 8);
  }
};
