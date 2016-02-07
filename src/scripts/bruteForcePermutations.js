/*jslint node: true */
"use strict";
var ActionCreator = require('../actions/action-creator');
var ActionQueue = require('../queue/action-queue');

function bruteForcePermutations(size) {
  var board = [], permData, numChanges;
  for (var i = 0; i < size; i++) board.push(i);
  for (var j = 0; j < factorial(size); j++) {
    permData = nextPerm(board);
    board = permData.perm;
    numChanges = permData.numChanges;
    ActionQueue.enqueue(ActionCreator.updateBoard.bind(null, board, numChanges));
    if (noDiagConflicts(board)) {
      ActionQueue.enqueue(ActionCreator.finish);
      return board;
    }
  }
  return false;
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

function factorial(size) {
  var prod = 1;
  for (var i = 1; i <= size; i++) prod *= i;
  return prod;
}

function nextPerm(perm) {
  var swap1 = swapPoint(perm);
  if (swap1 === -1) return perm;
  var swap2 = smallestGreaterOnRight(perm, swap1);

  perm = perm.slice();
  swap(perm, swap1, swap2);
  return {
    perm: perm.slice(0, swap1 + 1).concat(reverseSlice(perm, swap1 + 1)),
    numChanges: perm.length - swap1
  };
}

function swapPoint(arr) {
  for (var i = arr.length - 2; i >= 0; i--) {
    if (arr[i] < arr[i + 1]) break;
  }
  return i;
}

function smallestGreaterOnRight(arr, point) {
  var minIdx = point + 1;
  for (var i = point + 1; i < arr.length; i++) {
    if ( arr[i] > arr[point] && arr[i] < arr[minIdx]) {
      minIdx = i;
    }
  }
  return minIdx;
}

function swap(arr, x, y) {
  var temp = arr[x];
  arr[x] = arr[y];
  arr[y] = temp;
}

function reverseSlice(arr, idx) {
  return arr.slice(idx, arr.length).reverse();
}

module.exports = {
  run: function (n) {
    bruteForcePermutations(n || 8);
  }
};
