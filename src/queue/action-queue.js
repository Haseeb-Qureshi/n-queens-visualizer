var queue = [];
function enqueue (fn) {
  queue.push(fn);
}

var interval = null;

function startQueuing (time) {
  interval = setInterval(function () {
    var fn = queue.shift();
    if (fn) setImmediate(fn);
  }, time || 1);
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

function enqueue(fn) {
  queue.push(fn);
}

module.exports = {
  enqueue: enqueue,
  startQueuing: startQueuing,
  clearQueueInterval: clearQueueInterval,
  clearQueue: clearQueue,
  clear: clear
};
