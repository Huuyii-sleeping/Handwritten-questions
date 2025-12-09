function Hinstance(left, right) {
  let proto = Object.getPrototypeOf(left),prototype = right.prototype
  while (true) {
    if (!proto) return false;
    if (proto === prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
}

const test = new Array(10)
console.log(Hinstance(test, Array));
