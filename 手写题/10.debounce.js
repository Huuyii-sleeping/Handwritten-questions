function debounce(fn, wait) {
  let timer = null;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, wait);
  };
}

function saveData(data) {
  console.log(`data保存成功:${data},${new Date().toLocaleTimeString()}`);
}

const debounceSave = debounce(saveData, 1000);

let count = 1;
const interval = setInterval(() => {
  console.log(`触发${count}操作`);
  debounceSave(`测试数据${count}`);
  count++;
  if (count > 5) {
    clearInterval(interval);
  }
}, 300);
