/**
 * 在JavaScript中，浅拷贝和深拷贝是处理对象和数据结构时常见的概念。
 * 浅拷贝只会复制对象的顶层属性和值，如果属性值是对象或数组，那么它实际上只是复制了引用，而不是真正的对象。
 * 而深拷贝则会递归地复制对象的所有层级，确保所有的对象或数组都被真正复制，而不是仅复制引用。
 */

/**
 * 浅拷贝可以通过扩展运算符（...）或者Object.assign()方法来实现。这里提供一个使用Object.assign()的示例：
 */
function shallowCopy(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }
  return Object.assign({}, obj);
}

// const original = {
//   a: 1,
//   b: {
//     c: 2,
//   },
// };
// const copied = shallowCopy(original);
// console.log(copied);

/**
 * 深拷贝的实现则相对复杂一些，因为需要递归地处理对象的所有属性。下面是一个简单的深拷贝实现，只处理了对象和数组的情况
 */
function deepCopy(obj, hash = new WeakMap()) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj);
  }

  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }

  if (hash.has(obj)) {
    return hash.get(obj);
  }

  let newObj = Array.isArray(obj) ? [] : {};
  hash.set(obj, newObj);
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 这个属性是判断是不是自己的属性（原型链继承的不是自己的属性）
      newObj[key] = deepCopy(obj[key], hash);
    }
  }
  return newObj;
}

const original = { a: 1, b: { c: 2 } };
const copied = deepCopy(original);
console.log(copied); // { a: 1, b: { c: 2 } }
console.log(original === copied); // false
console.log(original.b === copied.b); // false
/**
 * 这个深拷贝函数还使用了WeakMap来存储已经复制过的对象，以避免无限递归和循环引用的问题。
 * 如果对象中存在循环引用，即某个对象的属性直接或间接地引用了该对象本身，使用WeakMap可以有效地避免这个问题。
 * 请注意，这个深拷贝函数并不完整，它没有处理函数、Symbol、Error等特殊对象，也没有处理原型链、getter/setter等情况。
 * 在实际应用中，你可能需要使用更健壮的库，如lodash的_.cloneDeep()方法，或者实现更完整的深拷贝逻辑。
 */

function deepClone(obj, map = new WeakMap()) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }
  if (obj instanceof Date) {
    return new Date(obj);
  }
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }
  if (map.has(obj)) {
    return map.get(obj);
  }

  let newObj = Array.isArray(obj) ? [] : {};
  map.set(obj, newObj);
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      obj[key] = deepClone(obj[key], map);
    }
  }
  return obj;
}

function shallowClone(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }
  return Object.assign({}, obj);
}
