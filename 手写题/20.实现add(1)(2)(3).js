function add(num) {
  let sum = 0;
  sum += num
  function innerAdd(num) {
    sum += num;
    return innerAdd;
  }
  innerAdd.getResult = function () {
    return sum;
  };
  return innerAdd;
}
let result = add(1)(2)(3);
console.log(result.getResult()); // 输出 6
