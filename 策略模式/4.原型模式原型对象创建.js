const userPrototype = {
  greet() {
    console.log(`Hello, 我是 ${this.name}，年龄 ${this.age}`);
  },
  role: "user",
};

const user1 = Object.create(userPrototype);
user1.name = "张三";
user1.age = 20;
user1.greet();
console.log(user1.role);

function createUser(name, age) {
  const user = {};
  // 设置原型：让新对象继承userPrototype
  Object.setPrototypeOf(user, userPrototype);
  // 添加自身属性
  user.name = name;
  user.age = age;
  return user;
}

const user2 = createUser("李四", 22);
user2.greet(); // 输出：Hello, 我是 李四，年龄 22
console.log(user2.__proto__ === userPrototype); // true（验证原型链）
