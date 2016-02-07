var React = require('react');
var PropTypes = React.PropTypes;

var QueenSquare = React.createClass({
  propTypes: {
    queenId: PropTypes.number,
    black: PropTypes.bool,
  },

  render: function () {
    var fill = this.props.black ? "black" : "white";
    return (
      <div className={"square " + fill}>
        <div className="queen">
          ♕<small>{this.props.queenId + 1}</small>
        </div>
      </div>
    )
  }
});

module.exports = QueenSquare;
