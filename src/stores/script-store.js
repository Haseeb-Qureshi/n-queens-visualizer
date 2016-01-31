var AppDispatcher = require('../dispatcher/app-dispatcher');

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var script = null;

var ScriptStore = assign({}, EventEmitter.prototype, {
  emitChange: function () {
    this.emit('change');
  },

  addChangeListener: function (callback) {
    this.on('change', callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener('change', callback);
  },

  _runScript: function (scriptName) {
    script = require('../scripts/' + formatScriptName(scriptName));
    script.run();
  },

  getScript: function () {
    return script;
  },
});

function formatScriptName(text) {
  function capitalize(str) { return str[0].toUpperCase() + str.slice(1); }

  var textPieces = text.split(" ");
  return textPieces.map(function (piece, i) {
    return i === 0 ? piece.toLowerCase() : capitalize(piece);
  }).join("");
}

AppDispatcher.register(function (action) {
  switch (action.actionType) {
    case "RUN_SCRIPT":
      BoardStore._runScript(action.data);
      BoardStore.emitChange();
      break;
    default:
  }
});

module.exports = ScriptStore;
