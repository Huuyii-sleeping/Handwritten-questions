// 加法
let a = 5;
let b = 10;
a = a + b;
b = a - b;
a = a - b;
console.log(a); // 输出 10
console.log(b); // 输出 5

// 解构赋值 es6引入的一种语法
let c = 5;
let d = 10;
[c, d] = [d, c];
console.log(c); // 输出 10
console.log(d); // 输出 5


