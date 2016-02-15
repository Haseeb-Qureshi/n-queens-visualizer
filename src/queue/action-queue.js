var queue = [];
var interval = null;

var lastTick = null;
var tickInterval = null;

function enqueue(fn) {
  queue.push(fn);
}

function processQueue() {
  var fn = queue.shift();
  if (fn) setImmediate(fn);
}

function initInterval(speed) {
  interval = setInterval(processQueue, speed);
  eraseTicker();
}

function eraseTicker() {
  lastTick = null;
  clearInterval(tickInterval);
  tickInterval = null;
}

function startQueueing(speed) {
  initInterval(speed);
  processQueue();
}

function clearQueueInterval() {
  clearInterval(interval);
  interval = null;
}

function clear() {
  clearQueueInterval();
  queue = [];
}

function modulateSpeed(speed) {
  lastTick = lastTick || Date.now();
  clearInterval(tickInterval);
  initTickInterval(speed);
}

function initTickInterval(speed) {
  tickInterval = setInterval(tick.bind(null, speed), 1);
}

function tick(speed) {
  var elapsedTime = Date.now() - lastTick;
  if (elapsedTime > speed) {
    lastTick = Date.now();
    processQueue();
  }
}


function changeSpeed(speed) {
  clearQueueInterval();
  eraseTicker();
  initInterval(speed);
}

function enqueue(fn) {
  queue.push(fn);
}

module.exports = {
  enqueue: enqueue,
  startQueueing: startQueueing,
  clear: clear,
  clearQueueInterval: clearQueueInterval,
  changeSpeed: changeSpeed,
  modulateSpeed: modulateSpeed
};
