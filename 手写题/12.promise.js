/** 
 * 简单实现下面的功能
 *  executor函数接收resolve reject方法
 *  resolve和reject函数改变promise的状态，并触发相应的回调
 *  then方法用于指定Promise成功或者失败执行的回调函数，并返回一个新的Promise对象
 *  myPromise.resolve 和 reject是两个promise的静态方法，用来创建已经解决或者拒绝解决的promise’对象
 *
 *  请注意，这个实现省略了很多特性，比如链式调用、错误冒泡、catch 方法、finally 方法、
 *  以及微任务队列的处理等。在真实的项目中，通常会使用原生的 Promise 对象，因为它已经由JavaScript引擎进行了优化，
 *  并且提供了完整的API支持。
 */

/**
 * 构造函数，初始化promise实例对象 定义状态变更方式（状态 回调 结果）
 * @param {*} executor 
 */
function myPromise(executor) {
  this.status = "pending";
  this.value = undefined;
  this.reason = undefined;
  this.onFulfilledCallback = []; // 成功回调队列
  this.onRejectedCallback = []; // 失败回调队列

  // 绑定this，避免resolve/reject中的this指向丢失
  const resolve = (value) => {
    if (this.status !== "pending") return;
    this.status = "fulfilled";
    this.value = value;
    this.onFulfilledCallback.forEach((cb) => cb());
  };

  const reject = (reason) => {
    if (this.status !== "pending") return;
    this.status = "rejected";
    this.reason = reason;
    this.onRejectedCallback.forEach((cb) => cb());
  };

  // 捕获executor中抛出的异常
  try {
    executor(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

// 处理回调值（核心：支持返回Promise的链式调用） 
// 处理then的回调值，确保返回新的promise的状态正确跟随返回值的状态变化
function resolvePromise(promise2, result, resolve, reject) {
  if (result === promise2) {
    return reject(new TypeError("Chaining cycle detected for promise"));
  }

  // 当返回值是myPromise实例或者thenable对象（有then方法的对象）
  if (
    result instanceof myPromise ||
    (result !== null &&
      typeof result === "object" &&
      typeof result.then === "function")
  ) {
    try {
      result.then(
        (val) => {
          resolvePromise(promise2, val, resolve, reject);
        },
        (err) => {
          reject(err);
        }
      );
    } catch (error) {
      reject(error);
    }
  } else {
    resolve(result);
  }
}

// then方法，成功或者失败执行的回调 返回新的回调，衔接新的promise，支持链式调用
myPromise.prototype.then = function (onFulfilled, onRejected) {
  onFulfilled =
    typeof onFulfilled === "function" ? onFulfilled : (value) => value;
  onRejected =
    typeof onRejected === "function"
      ? onRejected
      : (reason) => {
          throw reason;
        };
  const promise2 = new myPromise((resolve, reject) => {
    if (this.status === "fulfilled") {
      queueMicrotask(() => {
        try {
          const result = onFulfilled(this.value);
          resolvePromise(promise2, result, resolve, reject);
        } catch (error) {
          reject(error);
        }
      });
    } else if (this.status === "rejected") {
      queueMicrotask(() => {
        try {
          const result = onRejected(this.reason);
          resolvePromise(promise2, result, resolve, reject);
        } catch (error) {
          reject(error);
        }
      });
    } else {
      // 还是pending的状态
      this.onFulfilledCallback.push(() => {
        queueMicrotask(() => {
          try {
            const result = onFulfilled(this.value);
            resolvePromise(promise2, result, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      });
      this.onRejectedCallback.push(() => {
        queueMicrotask(() => {
          try {
            const result = onRejected(this.reason);
            resolvePromise(promise2, result, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      });
    }
  });
  return promise2;
};

// 快速创建决议 直接返回promise
myPromise.resolve = function (value) {
  if (value instanceof myPromise) {
    return value;
  }
  return new myPromise((resolve) => {
    resolve(value);
  });
};

myPromise.reject = function (reason) {
  return new myPromise((_, reject) => {
    reject(reason);
  });
};

const promise = new myPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("成功");
  }, 1000);
});

promise
  .then() // 测试可选参数透传
  .then((value) => {
    console.log("第一次then:", value); // 输出：第一次then: 成功
    return new myPromise((resolve) => resolve(value + "，第二次处理")); // 测试返回Promise
  })
  .then((value) => {
    console.log("第二次then:", value); // 输出：第二次then: 成功，第二次处理
    throw new Error("故意出错"); // 测试错误传递
  })
  .then(
    () => {},
    (reason) => {
      console.log("捕获错误:", reason.message); // 输出：捕获错误: 故意出错
      return "错误已处理";
    }
  )
  .then((value) => {
    console.log("最终结果:", value); // 输出：最终结果: 错误已处理
  });
