class Observer {
  caches = {};
  on(eventName, fn) {
    this.caches[eventName] = this.caches[eventName] || [];
    this.caches[eventName].push(fn);
  }

  emit(eventName, data) {
    if (this.caches[eventName]) {
      this.caches[eventName].forEach((fn) => {
        fn(data);
      });
    }
  }

  off(eventName, fn) {
    if (this.caches[eventName]) {
      const newCaches = fn
        ? this.caches[eventName].filter((e) => e !== fn)
        : [];
      this.caches[eventName] = newCaches;
    }
  }
}

const ob = new Observer()
l1 = (data) => console.log(`l1_${data}`)
l2 = (data) => console.log(`l2_${data}`)

ob.on('eventName1', l1)
ob.on('eventName1', l2)

ob.emit('eventName1', 123)

// 取消订阅1
ob.off('eventName1', l1)

ob.emit('eventName1', 567)


