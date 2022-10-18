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

// 管理员列表
export const getManagerList = (page, query = {}) => {
  /* let q = [];
  for (const key in query) {
    if (query[key]) {
      q.push(`${key}=${encodeURIComponent(query[key])}`);
    }
    console.log('q: ', q);
  }
  let r = q.join("&");
  r = r ? ("?" + r) : "";
  return axios.get(`admin/manager/${page}${r}`); */
  return axios.get(`admin/manager/${page}`, {
    params: query
  });
}

// 修改管理员状态
export const updateManagerStatus = (id, status) => {
  return axios.post(`admin/manager/${id}/update_status`, { status })
}

// 新增管理员
export const createManager = (data) => {
  return axios.post('admin/manager', data);
}

// 修改管理员
export const updateManager = (id, data) => {
  return axios.post(`admin/manager/${id}`, data)
}

// 删除管理员
export const deleteManager = id => {
  return axios.post(`admin/manager/${id}/delete`);
}