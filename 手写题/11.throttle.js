function throttle(fn, limit) {
  let inThrottle;
  return function () {
    const context = this;
    const args = arguments;
    if (!inThrottle) {
      fn.apply(context, args);
      inThrottle = true;
      setTimeout(function () {
        return (inThrottle = false);
      }, limit);
    }
  };
}

function handleTemperature(data) {
  console.log(`处理数据 ${data}, ${new Date().toLocaleTimeString()}`);
}

const throttleHandle = throttle(handleTemperature, 200);

let count = 1;
const sensorInterval = setInterval(() => {
  const temperature = 25 + Math.random() * 5;
  console.log(`第${count}次数据${temperature}`);
  throttleHandle(temperature.toFixed(1));
  count++;
  if (count > 10) {
    clearInterval(sensorInterval);
  }
}, 50);
