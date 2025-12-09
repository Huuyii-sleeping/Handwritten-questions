// 这个需要结合html一同观看
const cache = {};

async function searchCity(provinceName) {
  if (cache[provinceName]) {
    console.log("从缓存中获取");
    return cache[provinceName];
  }

  console.log("从API中获取");
  try {
    const response = await axios({
      url: "http://hmajax.itheima.net/api/city",
      params: { pname: provinceName },
    });
    // 缓存结果（键：省份名，值：城市列表）
    cache[provinceName] = response.data.list;
    return response.data.list;
  } catch (err) {
    console.error("查询失败：", err);
    throw err;
  }
}

document.querySelector(".query-input").addEventListener("keyup", async (e) => {
  if (e.keyCode === 13) {
    // 按下回车键
    const province = e.target.value.trim();
    if (!province) return;
    const cities = await searchCity(province);
    console.log("查询结果：", cities);
  }
});
