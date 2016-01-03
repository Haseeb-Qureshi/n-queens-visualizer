/*jslint node: true */
"use strict";
function bruteForcePermutations(size) {
  var board = [];
  for (var i = 0; i < size; i++) board.push(i);
  for (var j = 0; j < factorial(size); j++) {
    board = nextPerm(board);
    if (noConflictsOn(board)) return board;
  }
  return false;
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
  return perm.slice(0, swap1 + 1).concat(sortSlice(perm, swap1 + 1));
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

function sortSlice(arr, idx) {
  return arr.slice(idx || 0, arr.length).sort(function (el1, el2) {
    return el1 > el2 ? 1 : -1;
  });
}
