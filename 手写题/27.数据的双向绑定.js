class Dep {
  constructor() {
    this.subs = [];
  }

  addSub(sub) {
    this.subs.push(sub);
  }

  notify() {
    this.subs.forEach((sub) => sub.update());
  }
}

class Watcher {
  constructor(vm, key, cb) {
    this.cb = cb;
    this.vm = vm;
    this.key = key;
    this.value = this.get();
  }

  get() {
    Dep.target = this;
    const value = this.vm[this.key];
    Dep.target = null;
    return value;
  }

  update() {
    const newValue = this.vm[this.key];
    if (newValue !== this.value) {
      this.value = newValue;
      this.cb(newValue);
    }
  }
}

class Vue {
  constructor(data) {
    this.data = data;
    this._proxyData();
    this._initWatch();
  }

  _proxyData() {
    const self = this;
    const keys = Object.keys(this.data);
    keys.forEach((key) => {
      Object.defineProperty(this, key, {
        get() {
          if (Dep.target) {
            if (!self.data.__deps__) self.data.__deps__ = {};
            const dep =
              self.data.__deps__[key] || (self.data.__deps__[key] = new Dep());
            dep.addSub(Dep.target);
          }
          return self.data[key];
        },
        set(newValue) {
          if (self.data[key] === newValue) return;
          self.data[key] = newValue;
          const dep = self.data.__deps__?.[key];
          dep && dep.notify();
        },
      });
    });
  }

  _initWatch() {
    const updateComponent = () => {
      console.log("组件更新");
    };
    Object.keys(this.data).forEach((key) => {
      new Watcher(this, key, updateComponent);
    });
  }

  $watch(key, cb) {
    new Watcher(this, key, cb);
  }
}

const vm = new Vue({
  message: "Hello, 双向绑定!",
});

// 监听message变化
vm.$watch("message", (newVal) => {
  console.log(`监听到变化：${newVal}`);
});

// 修改数据（触发更新）
vm.message = "Hello, World!";
