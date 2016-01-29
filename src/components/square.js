var React = require('react');
var PropTypes = React.PropTypes;

var Square = React.createClass({
  propTypes: {
    black: PropTypes.bool,
    boardSize: PropTypes.number
  },

  render: function () {
    var fill = this.props.black ? 'black' : 'white';

    return <div style={{
      backgroundColor: fill,
      width: "12.5%",
      height: "12.5%",
      float: "left",
     }} >
        {this.props.children}
     </div>
  }
});

module.exports = Square;
