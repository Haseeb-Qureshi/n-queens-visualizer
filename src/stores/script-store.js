var AppDispatcher = require('../dispatcher/app-dispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var Util = require('../utils/util');
var deferFunc = Util.deferFunc.bind(Util);
var ActionQueue = require('../queue/action-queue');

var script = null;
var lastScriptName = null;
var speed = 125;
var temp = null;

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
    ActionQueue.clear();
    lastScriptName = scriptName;
    ScriptStore.emitChange();
    script = require('../scripts/' + this._formatScriptName(scriptName));
    script.run();
    ActionQueue.startQueueing(speed);
  },

  _formatScriptName: function (text) {
    function capitalize(str) { return str[0].toUpperCase() + str.slice(1); }

    var textPieces = text.split(" ");
    return textPieces.map(function (piece, i) {
      return i === 0 ? piece.toLowerCase() : capitalize(piece);
    }).join("");
  },

  _setSpeed: function (newSpeed) {
    speed = newSpeed;
    ActionQueue.changeSpeed(newSpeed);
  },

  _setTemp: function (newTemp) {
    temp = newTemp;
    ScriptStore.emitChange();
  },

  getScriptName: function () {
    return lastScriptName;
  },

  getTemp: function () {
    return temp;
  },
});

ScriptStore.dispatchToken = AppDispatcher.register(function (action) {
  switch (action.actionType) {
    case "RUN_SCRIPT":
      ScriptStore._runScript(action.scriptName);
      break;
    case "CHANGE_SPEED":
      ScriptStore._setSpeed(action.newSpeed);
      break;
    case "MODULATE_SPEED":
      ActionQueue.clearQueueInterval();
      ActionQueue.modulateSpeed(action.newSpeed);
      break;
    case "UPDATE_TEMP":
      ScriptStore._setTemp(action.newTemp);
      break;
    default:
  }
});

module.exports = ScriptStore;
