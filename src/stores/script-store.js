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
    script = require('../scripts/' + this._formatScriptName(scriptName));
    script.run();
  },

  _formatScriptName: function (text) {
    function capitalize(str) { return str[0].toUpperCase() + str.slice(1); }

    var textPieces = text.split(" ");
    return textPieces.map(function (piece, i) {
      return i === 0 ? piece.toLowerCase() : capitalize(piece);
    }).join("");
  },

  getScript: function () {
    return script;
  },
});

AppDispatcher.register(function (action) {
  switch (action.actionType) {
    case "RUN_SCRIPT":
      ScriptStore._runScript(action.data);
      ScriptStore.emitChange();
      break;
    default:
  }
});

module.exports = ScriptStore;
