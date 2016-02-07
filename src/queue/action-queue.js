var queue = [];
var interval = null;

function enqueue(fn) {
  queue.push(fn);
}

function processQueue() {
  var fn = queue.shift();
  if (fn) setImmediate(fn);
}

function startQueueing(speed) {
  interval = setInterval(processQueue, speed);
}

function clearQueueInterval() {
  clearInterval(interval);
  interval = null;
}

function clear() {
  clearQueueInterval();
  queue = [];
}

function easingFn(speed) {
  return Math.pow(Math.random(), 2) * 400 > speed;
}

function changeSpeed(speed) {
  clearQueueInterval();
  if (easingFn(speed)) processQueue();
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
