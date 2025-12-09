function flattenArrayByRecursion(arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flattenArray(arr[i]));
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}

function flattenArrayByReduce(arr) {
  const result = arr.reduce((sum, currentVal) => {
    if (Array.isArray(currentVal)) {
      return sum.concat(flattenArrayByReduce(currentVal));
    } else {
      sum.push(currentVal);
      return sum;
    }
  }, []);
  return result;
}

function flattenArrayByExpand(arr) {
  while (arr.some((item) => Array.isArray(item))) {
    arr = [].concat(...arr);
    // 是array的会再次执行展架
  }
  return arr;
}

let nestedArray = [1, [2, [3, [4]], 5]];
console.log(flattenArrayByExpand(nestedArray));
// 方法四：直接使用flat方法 参数是指定展开的depth
console.log(nestedArray.flat(Infinity));
