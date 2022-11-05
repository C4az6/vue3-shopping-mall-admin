import axios from 'axios';
import { toast } from "~/composables/utils.js";
import { getToken, setToken, removeToken } from "~/composables/auth.js";
import { router } from './router'

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API
})

// 请求拦截器
service.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  // 给headers头自动添加token
  const token = getToken('admin-token');
  // token有值的时候才给header头添加token
  token && (config.headers["token"] = token);
  return config;
}, error => {
  console.log("error: ", error);
  // 对请求错误做些什么
  return Promise.reject(error);
})


// 响应拦截器
service.interceptors.response.use(response => {
  // 处理响应数据
  return response.request.responseType == "blob" ? response.data : response.data.data;
}, error => {
  if (error.response.data.msg === '非法token，请先登录！') {
    removeToken();
    router.push('/logout');
  } else {
    toast(error.response.data.msg || '请求失败', 'error', true);
  }
  return Promise.reject(error.response.data.msg);
})

export default service