const queuedObservers = new Set();
const observe = (fn) => queuedObservers.add(fn);

const observable = (obj) =>
  new Proxy(obj, {
    set(target, key, value, receiver) {
      const result = Reflect.set(target, key, value, receiver);
      queuedObservers.forEach((observer) => observer());
      return result;
    },
  });

obj = observable({ name: "789" });
observe(function test() {
  console.log("触发了");
});

obj.name = "1111";
