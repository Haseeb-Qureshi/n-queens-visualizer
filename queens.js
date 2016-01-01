var Board = function (size) {
  this.size = size || 8;
  this.grid = [];
  this.placedQueens = 0;
  this.queenLocs = [];
  while (this.grid.length < this.size) { this.grid.push(new Array(this.size)); }
};

Board.prototype.bruteForce = function () {
  for (var i = 0; i < this.size; i++) {
    for (var j = 0; j < this.size; j++) {
      if (this.placedQueens === this.size) return;

      if (this.grid[i][j] === undefined) {
        this.placeQueen(i, j);
        this.bruteForce();
      }
    }
  }
  if (this.placedQueens !== this.size) {
    console.log("Backtracking Q" + this.placedQueens);
    this.removeLastQueen();
    return false;
  }
};

Board.prototype.placeQueen = function (x, y) {
  this.placedQueens++;
  this.grid[x][y] = "Q" + this.placedQueens;
  this.queenLocs.push([x, y]);
  this.eachAttackableAt(x, y, this.markAttack.bind(this));
  this.render();
};

Board.prototype.removeLastQueen = function () {
  var last_pos = this.queenLocs.pop();
  var x = last_pos[0], y = last_pos[1];
  this.eachAttackableAt(x, y, this.eraseAttacks.bind(this));
  this.grid[x][y] = undefined;
  this.placedQueens--;
};

Board.prototype.markAttack = function (x, y) {
  this.grid[x][y] = this.grid[x][y] || this.placedQueens;
};

Board.prototype.eraseAttacks = function (x, y) {
  if (this.grid[x][y] === this.placedQueens) this.grid[x][y] = undefined;
};

Board.prototype.eachAttackableAt = function (x, y, callback) {
  // row
  for (var i = 0; i < this.size; i++) {
    if (i === y) continue;
    callback(x, i);
  }
  // column
  for (i = 0; i < this.size; i++) {
    if (i === x ) continue;
    callback(i, y);
  }
  // diags left-to-right
  var x1 = x > y ? x - y : 0;
  var y1 = x > y ? 0 : y - x;
  while (x1 < this.size && y1 < this.size) {
    if (x1 !== x) callback(x1, y1);
    x1 += 1;
    y1 += 1;
  }
  // diags right-to-left
  var x2 = x + y <= this.size ? x + y : this.size;
  var y2 = x + y <= this.size ? 0 : x + y - this.size;
  while (x2 >= 0 && x2 < this.size && y2 < this.size) {
    if (x2 !== x) callback(x2, y2);
    x2 -= 1;
    y2 += 1;
  }
};

Board.prototype.render = function () {
  console.log("---------");
  this.grid.forEach(function (row) {
    var rowCopy = [];
    for (var i = 0; i < row.length; i++) {
      var str;
      if (row[i] === undefined) {
        str = '  ';
      } else if (typeof row[i] === "number") {
        str = ' ' + row[i];
      } else {
        str = row[i];
      }
      rowCopy.push(str);
    }
    console.log(rowCopy);
    console.log();
  });
  console.log("---------");
};

var b = new Board();
b.bruteForce();
