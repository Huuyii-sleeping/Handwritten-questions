// 使用 toLocalString 方法将数字进行格式化
// 这个方法会根据地区的本地化设置来格式化数字

// let num = 12345.6789
// let formatNum = num.toLocaleString()
// console.log(formatNum)

// toLocalString 可以手动的指定语言环境
let num = 1234567.89;
let formattedNum = num.toLocaleString("en-US");
console.log(formattedNum); // 输出 "1,234,567.89"
