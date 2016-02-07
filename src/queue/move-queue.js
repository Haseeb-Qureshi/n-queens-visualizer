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

function clearQueue() {
  clearInterval(interval);
  queue = [];
}

function enqueue(fn) {
  queue.push(fn);
}

module.exports = {
  enqueue: enqueue,
  startQueuing: startQueuing,
  clearQueue: clearQueue
};
