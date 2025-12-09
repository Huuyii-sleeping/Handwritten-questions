class EventBus {
  #headers = {};

  $on(eventName, callback) {
    if (typeof callback !== "function") {
      throw new Error("回调只能是函数");
    }

    if (!this.#headers[eventName]) {
      this.#headers[eventName] = [];
    }
    this.#headers[eventName].push(callback);
  }

  $emit(eventName, ...args) {
    const cbs = this.#headers[eventName] || [];
    cbs.forEach((cb) => cb(...args));
  }

  $off(eventName) {
    if (eventName) {
      this.#headers[eventName] = [];
    } else {
      this.#headers = {};
    }
  }

  $once(eventName, callback) {
    const wrapper = (...args) => {
      callback(...args);
      this.$off(eventName);
    };
    this.$on(eventName, wrapper);
  }
}

const bus = new EventBus();

bus.$on("userLogin", (username) => {
  console.log(`欢迎 ${username} 登录`);
});
bus.$once("showTip", (msg) => {
  console.log("提示：", msg);
});
// 触发事件
bus.$emit("userLogin", "张三"); // 输出：欢迎 张三 登录
bus.$emit("showTip", "请完善个人资料"); // 输出：提示：请完善个人资料
bus.$emit("showTip", "再次触发"); // 无输出（已取消订阅）

// 取消订阅
bus.$off("userLogin");
bus.$emit("userLogin", "李四"); // 无输出（已取消订阅）
