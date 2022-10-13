import axios from '~/axios';

// 用户登录接口
/* export function login(username, password) {
  return axios.post('/admin/login', {
    username,
    password
  })
} */

// 用户登录接口
export const login = (username, password) => {
  return axios.post('/admin/login', { username, password });
}