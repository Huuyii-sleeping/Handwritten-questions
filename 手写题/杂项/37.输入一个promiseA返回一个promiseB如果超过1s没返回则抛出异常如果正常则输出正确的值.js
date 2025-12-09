async function tool(promiseA, delay) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error("..."));
    }, delay);

    promiseA
      .then((result) => {
        clearTimeout(timer);
        resolve(result);
      })
      .catch((error) => {
        clearTimeout(timer);
        reject(error);
      });
  });
}
