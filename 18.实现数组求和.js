const arr = [1, 2, 3, 4, 5];

// for

// reduce
console.log(arr.reduce((sum, currentValue) => sum + currentValue, 0));
/**
 * 在上面的代码中，reduce方法接受一个回调函数和一个初始值（在这里是0）作为参数。
 * 回调函数接受两个参数：累加器（accumulator）和当前值（currentValue）。
 * 累加器的初始值是reduce方法的第二个参数，
 * 然后回调函数返回的新值会作为下一次调用的累加器的值。
 * 在每次调用中，累加器的值都会与数组中的下一个元素相加，最后返回总和。
 */

// 递归
function sum(arr) {
  if (arr.length === 0) return 0;
  return arr[0] + sum(arr.slice(1));
}
console.log(sum(arr))
