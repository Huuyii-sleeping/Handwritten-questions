const test = {
  fruits: ["a", "b", "c"],
  [Symbol.iterator]() {
    let index = 0;
    const fruits = this.fruits;
    return {
      next() {
        if (index < fruits.length) {
          return { value: fruits[index++], done: false };
        } else {
          return { value: undefined, done: true };
        }
      },
    };
  },
};
// iterator将普通的对象转换成可迭代对象
for (const fruit of test) {
  console.log(fruit);
}
