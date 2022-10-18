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
  // return axios.get(`admin/manager/${page}?limit=${limit}&keyword=${name}`)
  // return axios.get(`admin/manager/${page}?limit=${limit}`);

  let q = [];
  for (const key in query) {
    if (query[key]) {
      // 如果传递过来的对象中有key,直接把这个对象的key做编码处理转换成字符串后放到数组中
      q.push(`${key}=${encodeURIComponent(query[key])}`);
      // "keywords=alexander"
    }
    console.log('q: ', q);
  }
  let r = q.join("&");
  r = r ? ("?" + r) : "";
  return axios.get(`admin/manager/${page}${r}`);

}