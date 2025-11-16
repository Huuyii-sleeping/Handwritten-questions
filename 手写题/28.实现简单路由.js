const routes = {
  "/": function () {
    document.getElementById("content").textContent = "Home Page";
  },
  "/about": function () {
    document.getElementById("content").textContent = "About Page";
  },
  "/contact": function () {
    document.getElementById("content").textContent = "Contact Page";
  }, // 添加更多路由...
};

function initRoute() {
  const hash = window.location.hash.substr(1);
  if (routes[hash]) {
    routes[hash]();
  } else {
    routes["/"]();
  }
}

window.addEventListener("hashchange", () => {
  initRoute();
});

window.onload = initRoute;
