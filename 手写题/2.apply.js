Function.prototype.myApply = function (context) {
  // 只有函数才能使用call方法，不是报错
  if (typeof this !== "function") {
    console.error("type error");
  }
  let result = null;
  context = context || window;
  context.fn = this;
  if (arguments[1]) {
    result = context.fn(...arguments[1]);
  } else {
    result = context.fn();
  }

  delete context.fn;
  return result;
};

function fn(a, b) {
  console.log(this.name, a + b);
}
const obj = { name: "test" };
fn.myApply(obj, [2, 3]);
