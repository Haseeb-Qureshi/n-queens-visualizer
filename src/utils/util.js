var AppDispatcher = require('../dispatcher/app-dispatcher');

module.exports = {
  deferFunc: function (func) {
    if (AppDispatcher.isDispatching()) {
      setTimeout(this.deferFunc.bind(null, func), 50);
    } else {
      func();
    }
  }
};
