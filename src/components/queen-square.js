var React = require('react');
var PropTypes = React.PropTypes;

var QueenSquare = React.createClass({
  propTypes: {
    queenId: PropTypes.number,
  },

  render: function () {
    return (
      <div className={"square " + fill}>
        <div className="queen">
          ♕<small>{this.props.queenId}</small>
        </div>
      </div>
    )
  }
});

module.exports = QueenSquare;
