import axios from '~/axios';

// 获取权限菜单列表
export const getRoleList = () => {
  return axios.get(`admin/rule/1`)
};