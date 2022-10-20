import axios from '~/axios';

// 获取权限菜单列表
export const getRoleList = () => {
  return axios.get(`admin/rule/1`)
};

// 增加菜单权限
export const addRule = (data) => {
  return axios.post('admin/rule', data);
}

// 编辑菜单权限
export const updateRule = (id, data) => {
  return axios.post(`/admin/rule/${id}`, data);
}

// 删除菜单权限
export const removeRule = (id) => {
  return axios.post(`rule/${id}/delete`);
}