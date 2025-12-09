function deepEqual(obj1, obj2) {
  if (obj1 === obj2) return true;

  // 排除基本类型的情况
  if (
    typeof obj1 !== "object" ||
    obj1 === null ||
    typeof obj2 !== "object" ||
    obj2 === "null"
  ) {
    return false;
  }

  if (obj1 instanceof Date && obj2 instanceof Date) {
    return obj1.getTime() === obj2.getTime();
  }

  if (obj1 instanceof RegExp && obj2 instanceof RegExp) {
    return obj1.toString() === obj2.toString();
  }

  const key1 = Object.keys(obj1);
  const key2 = Object.keys(obj2);

  if (key1.length !== key2.length) return false;

  for (const key of key1) {
    // 判断是否具有这个属性
    if (!Object.prototype.hasOwnProperty.call(obj2, key)) return false;

    // 递归进行判断
    if (!deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}

// 基础测试
const a = { name: "hi", info: { age: 18 }, date: new Date(100) };
const b = { name: "hi", info: { age: 18 }, date: new Date(100) };
console.log(deepEqual(a, b)); // true

// 顺序不同测试
const c = { a: 1, b: 2 };
const d = { b: 2, a: 1 };
console.log(deepEqual(c, d)); // true

// 循环引用测试 (仅适用于版本二)
const x = {};
const y = {};
x.self = x;
y.self = y;
// console.log(deepEqualAdvanced(x, y)); // true
