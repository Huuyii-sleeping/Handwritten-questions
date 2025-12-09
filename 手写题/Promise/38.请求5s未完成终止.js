const funcWait = (fn, delay = 5000) => {
  let wait = new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject("timeout");
    }, delay);
  });
  return Promise.race([fn, wait]);
};

const t1 = new Promise((resolve) => setTimeout(resolve, 3000));
const t2 = new Promise((resolve) => setTimeout(resolve, 6000));
funcWait(t1)
  .then((result) => console.log("t1"))
  .catch((error) => console.log(error));
funcWait(t2)
  .then((result) => console.log("t2"))
  .catch((error) => console.log(error));
