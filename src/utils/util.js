var AppDispatcher = require('../dispatcher/app-dispatcher');

module.exports = {
  deferFunc: function (condition, func, timeOut) {
    timeOut = timeOut || 50;
    if (condition()) {
      setTimeout(this.deferFunc.bind(null, condition, func, timeOut), timeOut);
    } else {
      func();
    }
  }
};
