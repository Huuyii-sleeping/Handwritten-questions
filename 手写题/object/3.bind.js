Function.prototype.myBind = function (context) {
  if (typeof this !== "function") {
    console.error("not function");
  }

  // 保存原来的函数和预传的参数
  let args = [...arguments].slice(1),
    fn = this;
  // 返回新的函数
  function Fn() {
    return fn.apply(
      // 处理this的指向
      // 新的函数fn被当作构造函数（使用new进行调用），this指向新创建的fn实例，
      // 否则指向bind时指定的context（原来创建的fn实例）
      this instanceof Fn ? this : context,

      // 合并参数
      args.concat(...arguments)
    );
  }
  // 记得最后修改prototype的指向
  Fn.prototype = fn.prototype;
  return Fn;
};

// 普通的调用
function hello() {
  console.log(`hello:${this.name}`);
}
const person = { name: "张三" };
// 这里也是支持预先传递参数的
const boundHello = hello.myBind(person);
boundHello();

// 作为构造函数使用
function User(name, age) {
  this.name = name;
  this.age = age;
}

const boundUser = User.myBind({ extra: "无关属性" });
const user = new boundUser("李四", 20);
console.log(user.name);
console.log(user.age);
console.log(user.__proto__ === User.prototype);

