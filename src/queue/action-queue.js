var queue = [];
function enqueue (fn) {
  queue.push(fn);
}

var interval = null;

function startQueueing (speed) {
  interval = setInterval(function () {
    var fn = queue.shift();
    if (fn) setImmediate(fn);
  }, speed || 1);
}

function clearQueueInterval() {
  clearInterval(interval);
}

function clearQueue() {
  queue = [];
}

function clear() {
  clearQueueInterval();
  clearQueue();
}

function changeSpeed(speed) {
  clearQueueInterval();
  startQueueing(speed);
}

function enqueue(fn) {
  queue.push(fn);
}

module.exports = {
  enqueue: enqueue,
  startQueueing: startQueueing,
  clear: clear,
  changeSpeed: changeSpeed
};
