class PubSub {
  constructor() {
    this.subscribers = {};
  } // 订阅事件
  subscribe(event, callback) {
    if (!this.subscribers[event]) {
      this.subscribers[event] = [];
    }
    this.subscribers[event].push(callback);
  } // 取消订阅事件
  unsubscribe(event, callback) {
    if (this.subscribers[event]) {
      this.subscribers[event] = this.subscribers[event].filter(
        (subCallback) => subCallback !== callback
      );
    }
  } // 发布事件
  publish(event, data) {
    if (this.subscribers[event]) {
      this.subscribers[event].forEach((callback) => callback(data));
    }
  }
}
// 使用示例
const pubsub = new PubSub();
// 订阅事件
pubsub.subscribe("myEvent", (data) => console.log("Received data:", data));
// 发布事件
pubsub.publish("myEvent", "Hello, world!"); // 输出: Received data: Hello, world!
// 取消订阅事件
pubsub.unsubscribe("myEvent", (data) => console.log("Received data:", data));
// 再次发布事件，此时不会有输出，因为已经取消了订阅
pubsub.publish("myEvent", "Hello again!");
