var React = require('react');
var PropTypes = React.PropTypes;
var BoardStore = require('../stores/board-store');
var EmptySquare = require('./board/empty-square');
var QueenSquare = require('./board/queen-square');

function getBoardState() {
  return {
    board: BoardStore.getBoard()
  };
}

function sleep(delay) {
  var start = new Date().getTime();
  while (new Date().getTime() < start + delay);
}

var Board = React.createClass({
  onChange: function () {
    this.setState(getBoardState());
  },

  getInitialState: function () {
    return getBoardState();
  },

  componentDidMount: function () {
    BoardStore.addChangeListener(this.onChange);
  },

  componentWillUnmount: function () {
    BoardStore.removeChangeListener(this.onChange);
  },

  renderSquare: function (i) {
    var x = i % 8;
    var y = Math.floor(i / 8);
    var black = (x + y) % 2 === 1;
    var board = this.state.board;

    return board[x] === y ?
      <QueenSquare key={i} black={black} queenId={x}/> :
      <EmptySquare key={i} black={black}/>
  },

  render: function () {
    var squares = [];
    for (let i = 0; i < 64; i++) {
      squares.push(this.renderSquare(i));
    }

    return <div className="board">{squares}</div>
  }
});

module.exports = Board;
