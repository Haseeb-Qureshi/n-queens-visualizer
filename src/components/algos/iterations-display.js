var React = require('react');
var BoardStore = require('../../stores/board-store');

function getIterations() {
  return { iterations: BoardStore.getIterations() };
}

var IterationsDisplay = React.createClass({
  onChange: function () {
    this.setState(getIterations());
  },

  getInitialState: function () {
    return getIterations();
  },

  componentDidMount: function () {
    BoardStore.addChangeListener(this.onChange);
  },

  componentWillUnmount: function () {
    BoardStore.removeChangeListener(this.onChange);
  },

  render: function () {
    return (
      <div className="iterations">Iterations: <br />{this.state.iterations}</div>
    )
  }
});

module.exports = IterationsDisplay;
