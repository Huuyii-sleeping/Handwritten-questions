async function repeat(fn, val, delay) {
  setInterval(() => fn(val), delay);
}

repeat(console.log, 5, 1000);
