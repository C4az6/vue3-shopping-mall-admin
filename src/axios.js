import axios from 'axios';
import { toast } from "~/composables/utils.js";
import { getToken, setToken, removeToken } from "~/composables/auth.js";


const service = axios.create({
  baseURL: "/api"
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
  return response.data.data;
}, error => {
  toast(error.response.data.msg || '请求失败');
  return Promise.reject(error.response.data.msg);
})

export default service