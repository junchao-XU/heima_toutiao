import axios from "axios";
import store from "@/store/Login";
import router from "@/router";
import { getNewTokenAPI } from "@/api/login";

const request = axios.create({
  // 配置基地址
  baseURL: "https://toutiao.itheima.net/v1_0",
  // 请求超时时间
  timeout: 5000,
});

// 请求拦截器
request.interceptors.request.use((config) => {
  // 成功的回调
  if (config.headers.Authorization == undefined) {
    if (store.state.token) {
      config.headers.Authorization = `Bearer ${store.state.token}`;
    }
  }

  return config;
});

// 响应拦截器
request.interceptors.response.use(
  (res) => {
    return res.data;
  },

  async function (error) {
    if (error.response.status == 401) {
      let { data } = await getNewTokenAPI();
      console.log(data);
      localStorage.setItem("USER_TOKEN", data.token);
      let obj = {
        url: `${error.config.baseURL}${error.config.url}`,
        method: error.config.method,
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      };
      //如果没有return，请求就此卡住，出不去了
      return axios(obj);
    } else {
      localStorage.clear();
      //跳转登录页
      router.replace("/login");
    }
    return Promise.reject(error); // 判断中中途没return的统一抛出错误
  }
);

export default request;
