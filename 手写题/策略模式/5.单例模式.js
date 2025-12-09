/**
 * 实现单例模式，确保一个类只能创建一个实例对象
 */
let CreateSingleton = (function () {
  // 闭包保存一次 + 构造函数判断实例是否存在
  let instance; // 只能赋值一次
  return function (name) {
    if (instance) {
      return instance;
    }
    this.name = name;
    return (instance = this);
  };
})();

CreateSingleton.prototype.getName = function () {
  console.log(this.name);
};

let winner = new CreateSingleton("winner");
let looser = new CreateSingleton("looser");

console.log(winner === looser);
console.log(winner.getName());
console.log(looser.getName());
