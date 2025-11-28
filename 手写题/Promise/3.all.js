const PENDING = "pending";
const RESOLVED = "resolved";
const REJECTED = "rejected";

function myPromise(fn) {
  let self = this;
  this.status = PENDING;
  this.value = null;
  this.resolvedCallbacks = [];
  this.rejectedCallbacks = [];

  function resolve(value) {
    if (value instanceof myPromise) {
      return value.then(resolve, reject);
    }

    setTimeout(() => {
      if (self.status === PENDING) {
        self.status = RESOLVED;
        self.value = value;
        self.resolvedCallbacks.forEach((cb) => {
          cb(self.value);
        });
      }
    }, 0);
  }

  function reject(value) {
    setTimeout(() => {
      if (self.status === PENDING) {
        self.status = REJECTED;
        self.value = value;
        self.rejectedCallbacks.forEach((cb) => {
          cb(self.value);
        });
      }
    }, 0);
  }

  try {
    fn(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

myPromise.prototype.then = function (onResolved, onRejected) {
  const self = this;
  onResolved =
    typeof onResolved === "function"
      ? onResolved
      : function (value) {
          return value;
        };
  onRejected =
    typeof onRejected === "function"
      ? onRejected
      : function (error) {
          throw error;
        };

  return new myPromise((resolve, reject) => {
    function handleResolve() {
      setTimeout(() => {
        try {
          const result = onResolved(self.value);
          result instanceof myPromise
            ? result.then(resolve, reject)
            : resolve(result);
        } catch (error) {
          reject(error);
        }
      }, 0);
    }

    function handleReject() {
      setTimeout(() => {
        try {
          const result = onRejected(self.value);
          result instanceof myPromise
            ? result.then(resolve, reject)
            : resolve(result);
        } catch (error) {
          reject(error);
        }
      }, 0);
    }

    if (self.status === PENDING) {
      self.resolvedCallbacks.push(handleResolve);
      self.rejectedCallbacks.push(handleReject);
    } else if (self.status === RESOLVED) {
      handleResolve();
    } else if (self.status === REJECTED) {
      handleReject();
    }
  });
};

myPromise.resolve = function (value) {
  if (value instanceof myPromise) {
    return value;
  }
  return new myPromise((resolve) => {
    resolve(value);
  });
};

myPromise.all = function (iterable) {
  return new myPromise((resolve, reject) => {
    if (typeof iterable[Symbol.iterator] !== "function") {
      return reject(
        new TypeError(`${typeof iterable} ${iterable} is not iterable`)
      );
    }
    const result = [];
    let completeCount = 0;
    const promises = Array.from(iterable);
    if (promises.length === 0) {
      resolve(result);
    }

    promises.forEach((item, index) => {
      myPromise.resolve(item).then(
        (value) => {
          result[index] = value;
          completeCount++;

          if (completeCount === promises.length) {
            resolve(result);
          }
        },
        (reason) => {
          reject(reason);
        }
      );
    });
  });
};

// 测试1：所有Promise成功
const p1 = new myPromise((resolve) => setTimeout(() => resolve(1), 1000));
const p2 = new myPromise((resolve) => setTimeout(() => resolve(2), 500));
const p3 = 3; // 普通值

myPromise.all([p1, p2, p3]).then((res) => {
  console.log("all成功结果：", res); // 输出：all成功结果：[1, 2, 3]
});

// 测试2：有Promise失败
const p4 = new myPromise((_, reject) =>
  setTimeout(() => reject("p4是垃圾"), 300)
);

myPromise.all([p1, p4, p3]).then(
  (res) => console.log(res),
  (err) => console.log("all失败原因：", err) // 输出：all失败原因：失败原因
);

