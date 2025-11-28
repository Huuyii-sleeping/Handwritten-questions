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

myPromise.race = function (iterable) {
  return new Promise((resolve, reject) => {
    if (typeof iterable[Symbol.iterator] !== "function") {
      return reject(
        new TypeError(`${typeof iterable} ${iterable} is not iterable`)
      );
    }

    const promises = Array.from(iterable);
    promises.forEach((item) => {
      myPromise.resolve(item).then(
        (value) => resolve(value),
        (reason) => reject(reason)
      );
    });
  });
};

// 测试1：Promise竞速（reject先完成）
const raceP1 = new myPromise((resolve) =>
  setTimeout(() => resolve("慢Promise"), 100)
);
const raceP2 = new myPromise((_, reject) =>
  setTimeout(() => reject("快reject"), 500)
);

myPromise.race([raceP1, raceP2]).then(
  (res) => console.log("race成功：", res),
  (err) => console.log("race失败：", err) // 输出：race失败：快reject
);

// 测试2：普通值优先
const raceP3 = new myPromise((resolve) =>
  setTimeout(() => resolve("Promise结果"), 300)
);
myPromise.race([123, raceP3]).then((res) => {
  console.log("race普通值优先：", res); // 输出：race普通值优先：123
});
