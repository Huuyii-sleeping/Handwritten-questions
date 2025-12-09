/**
 * 在JavaScript中，有时我们可能需要将类数组对象（例如，具有数字索引和length属性的对象）转换为真正的数组。
 */
function toArray(arrayLike) {
  return Array.prototype.slice.call(arrayLike);
}

function toArrayByFrom(arrayLike) {
    return Array.from(arrayLike)
}

var arrayLike = { 0: "a", 1: "b", 2: "c", length: 3 };
console.log(toArrayByFrom(arrayLike));
