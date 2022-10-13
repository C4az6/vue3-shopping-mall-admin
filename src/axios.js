import axios from 'axios';
import { ElNotification } from "element-plus";
import { useCookies } from "@vueuse/integrations/useCookies";

const cookie = useCookies();

const service = axios.create({
  baseURL: "/api"
})

// 请求拦截器
service.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  // 给headers头自动添加token
  const token = cookie.get('admin-token');
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
  ElNotification({
    message: error.response.data.msg || '请求失败',
    type: "error",
    duration: 2500,
  });
  return Promise.reject(error.response.data.msg);
})

export default service