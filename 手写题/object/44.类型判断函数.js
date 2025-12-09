function getType(value) {
  if (value === null) {
    return value + "";
  }
  if (typeof value === "object") {
    let valueClass = Object.prototype.toString.call(value),
      type = valueClass.split(" ")[1].split("");
    console.log(valueClass, type)
    type.pop();
    return type.join("").toLowerCase();
  } else {
    return typeof value;
  }
}

const obj = {
  a: 1,
};

console.log(getType(undefined));
