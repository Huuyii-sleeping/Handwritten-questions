const customCollection = {
  items: ["前端", "Java", "Python", "UI/UX"], // 待遍历的数据
  length: 4,

  //   [Symbol.iterator]() {
  //     let index = 0;
  //     const items = this.items;
  //     return {
  //       next() {
  //         if (index < items.length) {
  //           return {
  //             done: false,
  //             value: items[index++],
  //           };
  //         }
  //         return { done: true };
  //       },
  //     };
  //   },

  [Symbol.iterator]() {
    function* generator() {
      for (const item of this.items) {
        yield item;
      }
    }
    return generator.call(this);
  },
};

for (const item of customCollection) {
  console.log("遍历结果", item);
}

const iterator = customCollection[Symbol.iterator]();
console.log(iterator.next()); // { done: false, value: '前端' }
console.log(iterator.next()); // { done: false, value: 'Java' }
console.log(iterator.next()); // { done: false, value: 'Python' }
console.log(iterator.next()); // { done: false, value: 'UI/UX' }
console.log(iterator.next()); // { done: true }
