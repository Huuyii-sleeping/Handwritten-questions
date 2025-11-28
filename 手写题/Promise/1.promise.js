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
          cb(value);
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
          cb(value);
        });
      }
    }, 0);
  }

  try {
    fn(resolve, reject);
  } catch (error) {
    reject(e);
  }
}

myPromise.prototype.then = function (onResolved, onRejected) {
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
  if (this.status === PENDING) {
    this.resolvedCallbacks.push(onResolved);
    this.rejectedCallbacks.push(onRejected);
  }

  if (this.status === RESOLVED) {
    onResolved(this.value);
  }
  if (this.status === REJECTED) {
    onRejected(this.value);
  }
};

function fetchData() {
  return new myPromise((resolve, reject) => {
    setTimeout(() => {
      const data = { name: "111" };
      resolve(data);
    }, 2000);
    setTimeout(() => {
      reject("error");
    }, 1000);
  });
}

fetchData().then(
  (res) => console.log(res),
  (error) => console.log(error)
);
