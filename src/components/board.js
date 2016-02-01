var React = require('react');
var PropTypes = React.PropTypes;
var BoardStore = require('../stores/board-store');
var EmptySquare = require('./empty-square');
var QueenSquare = require('./queen-square');

function getBoardState() {
  return {
    board: BoardStore.getBoard()
  };
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
    console.log("re-render!");
    var squares = [];
    for (let i = 0; i < 64; i++) {
      squares.push(this.renderSquare(i));
    }

    return <div className="board">{squares}</div>
  }
});

module.exports = Board;