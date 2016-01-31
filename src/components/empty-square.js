var React = require('react');
var PropTypes = React.PropTypes;

var EmptySquare = React.createClass({
  propTypes: {
    black: PropTypes.bool,
  },

  render: function () {
    var fill = this.props.black ? 'black' : 'white';
    return <div className={"square " + fill}></div>
  }
});

module.exports = EmptySquare;
