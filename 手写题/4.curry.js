function curry(fn) {
  // fn 参数 函数的形参长度
  if (fn.length === 0) {
    return fn;
  }

  function _curried(depth, args) {
    return function (newArgument) {
      if (depth - 1 === 0) {
        return fn(...args, newArgument);
      }
      // 参数没有收集够的情况
      return _curried(depth - 1, [...args, newArgument]);
    };
  }
  return _curried(fn.length, []);
}

function add(a, b) {
  return a + b;
}

var curriedAdd = curry(add);
var addFive = curriedAdd(5);
var result = [1, 2, 3].map(addFive);
console.log(result);
