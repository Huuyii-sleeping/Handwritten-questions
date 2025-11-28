function create(obj) {
  function F() {}
  F.prototype = obj;
  return new F();
}

const a = {
  name: "21314",
  say() {
    console.log("23213123");
  },
};
const t = create(a);
console.log(Object.getPrototypeOf(t) === a);
t.say();
