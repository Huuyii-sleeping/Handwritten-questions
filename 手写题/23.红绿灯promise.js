const redLight = document.getElementById("red");
const greenLight = document.getElementById("green");
const yellowLight = document.getElementById("yellow");

const turnOn = (light) => (light.style.opacity = 1);
const turnOff = (light) => (light.style.opacity = 0);

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function triffecCycle() {
  while (true) {
    // 无限循环
    // 1. 红灯亮3秒
    turnOn(redLight);
    await delay(3000); // 等待3秒
    turnOff(redLight);

    // 2. 绿灯亮1秒
    turnOn(greenLight);
    await delay(1000); // 等待1秒
    turnOff(greenLight);

    // 3. 黄灯亮2秒
    turnOn(yellowLight);
    await delay(2000); // 等待2秒
    turnOff(yellowLight);
  }
}

triffecCycle();
