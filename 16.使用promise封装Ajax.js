/**
 * 在JavaScript中，我们可以使用Promise来封装AJAX请求，使得异步操作更加易于管理和理解。
 */

// const https = require("node:http");

function ajaxRequest(url, method = "GET", data = null) {
  return new Promise((resolve, reject) => {
    // XMLHttpRequest只能在浏览器环境中使用
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);

    if (method === "POST") {
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    }
    xhr.onload = function () {
      if (this.status === 200) {
        resolve(this.responseText);
      } else {
        reject(new Error(this.statusText));
      }
    };

    xhr.onerror = function () {
      reject(new Error("Netword Error"));
    };

    if (data) {
      xhr.send(data);
    } else {
      xhr.send();
    }
  });
}

// ajaxRequest("https://api.example.com/data", "GET")
//   .then((response) => {
//     console.log(response);
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });

// Node.js 环境中使用 https 模块
const https = require("https");

function httpRequest(url, method = "GET", data = null) {
  return new Promise((resolve, reject) => {
    const options = new URL(url); // 解析 URL
    options.method = method;

    const req = https.request(options, (res) => {
      let responseData = "";
      // 收集响应数据
      res.on("data", (chunk) => {
        responseData += chunk;
      });
      // 响应结束
      res.on("end", () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(responseData);
        } else {
          reject(new Error(`HTTP Error: ${res.statusCode}`));
        }
      });
    });

    // 处理请求错误
    req.on("error", (error) => {
      reject(new Error(`Network Error: ${error.message}`));
    });

    // 发送数据（POST 请求时）
    if (data && method === "POST") {
      req.write(data);
    }
    req.end(); // 结束请求
  });
}

// 调用测试（Node.js 中运行）
httpRequest("https://api.example.com/data", "GET")
  .then((response) => console.log(response))
  .catch((error) => console.error(error));
