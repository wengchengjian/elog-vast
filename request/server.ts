import { useRecoilState } from "recoil";
import { loginVisible } from "@/store";
import { GOSSIP_BLOG_TOKEN_KEY, SERVER_ADDRESS } from "@/constants";
import local from "@douyinfe/semi-ui/locale/source/zh_CN";
import axios from "axios";
import { Toast } from "@douyinfe/semi-ui";
export const sxios = axios.create({
  baseURL: `${SERVER_ADDRESS}`,
  withCredentials: true,
});

// 添加请求拦截器
sxios.interceptors.request.use(
  function (config) {
    if (typeof window !== "undefined") {
      let token = localStorage.getItem(GOSSIP_BLOG_TOKEN_KEY);
      console.log("asdas", token);
      if (token) {
        config.headers["Authorization"] = `Bearer ${localStorage.getItem(
          GOSSIP_BLOG_TOKEN_KEY
        )}`;
      }
    }

    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
sxios.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    let res = response.data;
    if (!res.success) {
      if (typeof window !== "undefined") {
        if (res.errorCode == 509) {
          localStorage.removeItem(GOSSIP_BLOG_TOKEN_KEY);
          Toast.warning("凭证已过期");
        } else {
          Toast.error(res.errorMessage);
        }
      }
    }
    return res.data;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);
