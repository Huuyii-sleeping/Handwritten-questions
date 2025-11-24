class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(type, handler) {
    if (!this.events[type]) {
      this.events[type] = [];
    }
    this.events[type].push(handler);
  }

  addListener(type, handler) {
    this.on(type, handler);
  }

  prependListener(type, handler) {
    if (!this.events[type]) {
      this.events[type] = [];
    }
    this.events[type].unshift(handler);
  }

  removeListener(type, handler) {
    if (!this.events[type]) {
      this.events[type] = [];
    }
    this.events[type] = this.events[type].filter((item) => item !== handler);
  }

  off(type, handler) {
    this.removeListener(type, handler);
  }

  emit(type, ...args) {
    this.events[type].forEach((item) => {
      Reflect.apply(item, this, args);
    });
  }

  once(type, handler) {
    this.on(type, this._onceWrap(type, handler, this));
  }

  _onceWrap(type, handler, target) {
    const state = { fired: false, handler, type, target };
    const wrapFn = this._onceWrapper.bind(state);
    state.wrapFn = wrapFn;
    return wrapFn;
  }

  _onceWrapper(...args) {
    if (!this.fired) {
      this.fired = true;
      Reflect.apply(this.handler, this.target, args);
      this.target.off(this.type, this.wrapFn);
    }
  }
}

const ee = new EventEmitter();

// 注册所有事件
ee.once("wakeUp", (name) => {
  console.log(`${name} 1`);
});
ee.on("eat", (name) => {
  console.log(`${name} 2`);
});
ee.on("eat", (name) => {
  console.log(`${name} 3`);
});
const meetingFn = (name) => {
  console.log(`${name} 4`);
};
ee.on("work", meetingFn);
ee.on("work", (name) => {
  console.log(`${name} 5`);
});

ee.emit("wakeUp", "xx");
ee.emit("wakeUp", "xx"); // 第二次没有触发
ee.emit("eat", "xx");
ee.emit("work", "xx");
ee.off("work", meetingFn); // 移除事件
ee.emit("work", "xx");
