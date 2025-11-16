function mySetInterval(callback, delay) {
  callback();

  const intervalId = setTimeout(() => {
    clearTimeout(intervalId);
    mySetInterval(callback, delay);
    callback();
  }, delay);
}

mySetInterval(() => console.log("Hello"), 2000);
