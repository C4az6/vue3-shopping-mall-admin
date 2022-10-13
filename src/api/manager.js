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

// 获取管理员信息和权限菜单
export const getManagerInfo = () => {
  return axios.post('/admin/getinfo');
}

// 用户退出登录
export const logout = () => {
  return axios.post('/admin/logout');
}

// 用户修改密码
export const updatePassword = (data) => {
  return axios.post('admin/updatepassword', data)
}