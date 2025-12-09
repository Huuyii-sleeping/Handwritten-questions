function red() {
  console.log("red");
}

function yellow() {
  console.log("yellow");
}

function green() {
  console.log("green");
}

async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function open() {
  while (true) {
    red();
    await delay(3000);
    green();
    await delay(2000);
    yellow();
    await delay(1000);
  }
}

open()
