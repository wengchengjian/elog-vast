import { SERVER_ADDRESS } from "@/constants";
import local from "@douyinfe/semi-ui/locale/source/zh_CN";
import axios from "axios";

export const sxios = axios.create({
    baseURL:`${SERVER_ADDRESS}`,
    withCredentials:true,
})

// 添加请求拦截器
sxios.interceptors.request.use(function (config) {
    // config.headers.common['Authorization'] = `Bearer ${localStorage.getItem("GOSSIP_BLOG_VAST_TOKEN")}`;
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
sxios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data.data;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  });