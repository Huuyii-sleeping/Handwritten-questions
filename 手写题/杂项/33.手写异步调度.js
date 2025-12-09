const queue = new Set();

const p = Promise.resolve();

let isFlushing = false;

function nextTick(fn) {
  return fn ? p.then(fn) : p;
}

function queueJob(job) {
  queue.add(job);
  if (!isFlushing) {
    isFlushing = true;
    nextTick(flushJobs);
  }
}

function flushJobs() {
  try {
    queue.forEach((job) => job());
  } catch (error) {
    isFlushing = false;
    queue.clear();
  }
}
