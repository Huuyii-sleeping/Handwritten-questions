/**
 * 函数柯里化（Currying）是一种在 JavaScript 中处理函数的技术，
 * 它可以将一个接受多个参数的函数转换成一系列使用一个参数的函数。
 * 这个转换后的函数链中的每一个函数都返回下一个函数，直到最后一个函数返回最终的结果
 */

function curry(fn) {
  if (fn.length === 0) {
    return fn;
  }
  function _curried(depth, args) {
    return function (newArgument) {
      if (depth - 1 === 0) {
        return fn(...args, newArgument);
      }
      return _curried(depth - 1, [...args, newArgument]);
    };
  }
  return _curried(fn.length, [])
}

function add(a,b) {
    return a + b
}

const curriedAdd = curry(add)
const addFive = curriedAdd(5)
addFive(1)
console.log([1,2,3].map(addFive))