var queue = [];
function enqueue (fn) {
  queue.push(fn);
}

var interval = null;

function startInterval (time) {
  interval = setInterval(function () {
    var fn = queue.shift();
    if (fn) setImmediate(fn);
  }, time || 1);
}

function wipeInterval() {
  clearInterval(interval);
}

function enqueue(fn) {
  queue.push(fn);
}

module.exports = {
  enqueue: enqueue,
  startInterval: startInterval,
  wipeInterval: wipeInterval
};
