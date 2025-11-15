// 模拟axios工厂：根据配置创建实例c
class AxiosFactory {
  static create(config = {}) {
    const defaultConfig = {
      baseURL: "",
      timeout: 5000,
      headers: { "Content-type": "application/json" },
    };
    const finalConfig = { ...defaultConfig, ...config };
    const request = async (options) => {
      const { url, method = "GET", data = {} } = options;
      try {
        const response = await fetch(`${finalConfig.baseURL}${url}`, {
          method,
          headers: finalConfig.headers,
          timeout: finalConfig.timeout,
          body: method === "POST" ? JSON.stringify(data) : null,
        });
        return await response.json();
      } catch (error) {
        console.error("请求失败", error);
        throw error;
      }
    };

    return {
      get: (url, params) => request({ url, params }),
      post: (url, data) => request({ url, method: "POST", data }),
    };
  }
}

const userApi = AxiosFactory.create({ baseURL: "https://api.user.com" });
const orderApi = AxiosFactory.create({
  baseURL: "https://api.order.com",
  timeout: 10000,
});

userApi.get("/info");
orderApi.post("/create", { goodId: 123 });
