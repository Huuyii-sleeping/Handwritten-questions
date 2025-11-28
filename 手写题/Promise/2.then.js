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

function fetchData() {
  return new myPromise((resolve, reject) => {
    setTimeout(() => reject("error"), 1000);
    setTimeout(() => resolve({ name: "111" }), 50);
  });
}

fetchData()
  .then(
    (res) => console.log(res),
    (err) => `处理错误：${err}`
  )
  .then((res) => console.log("链式结果：", res));
