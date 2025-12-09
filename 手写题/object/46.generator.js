function fetchData(url) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`${url}`);
    }, 1000);
  });
}

function* asyncGenerator() {
  console.log("1");
  const res1 = yield fetchData("url1"); // 执行到这里返回一个promise
  console.log(res1);
  console.log(2);
  const res2 = yield fetchData("url2");
  console.log(res2);

  return "finish";
}

// const gen = asyncGenerator();

// const result1 = gen.next(); // 对应第一个返回的promise
// result1.value.then((data1) => {
//   // 第二次调用，将第一次的作为返回值，执行到第二个yield
//   const result2 = gen.next(data1);
//   result2.value.then((data2) => {
//     const finalResult = gen.next(data2);
//     console.log(finalResult.value);
//   });
// });

// 自动化执行
function run(genFunc){
    const gen = genFunc()
    function next(data) {
        const result = gen.next(data)
        if(result.done) return result.value
        if(result.value instanceof Promise){
            result.value.then(res => next(res))
        }
    }
    next()
}

run(asyncGenerator)
