function myNew(constructor, ...args) {
  const obj = {};
  //   obj.__proto__ = constructor.prototype;
  // __proto__ 虽然可行但是不是标准的规范，es6之前这样使用
  // 这个是新的标准使用的方法
  Object.setPrototypeOf(obj, constructor.prototype);
  const result = constructor.apply(obj, args);
  return result instanceof Object ? result : obj;
}

function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.greet = function () {
  console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`);
};

const person = myNew(Person, "alice", 20);
console.log(person.name);
console.log(person.age);
person.greet();
