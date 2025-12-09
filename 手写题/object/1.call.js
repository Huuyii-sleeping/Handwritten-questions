Function.prototype.myCall = function (context) {
  // 只有函数才能使用call方法，不是报错
  if (typeof this !== "function") {
    console.error("type error");
  }
  // 参数的提取除了context之外的全部参数
  let args = [...arguments].slice(1),
    result = null;

  // 处理context是null/undefined的情况，指向全局
  context = context || window;

  // 绑定this的指向，给context添加临时属性，指向调用call函数（this就是目标函数）
  // fn() 调用，函数内部指向context
  context.fn = this;

  result = context.fn(...args);

  delete context.fn;

  return result;
};


function fn(a, b) {
  console.log(this.name, a + b);
}

const obj = { name: "test" };
fn.myCall(obj, 1, 2);
