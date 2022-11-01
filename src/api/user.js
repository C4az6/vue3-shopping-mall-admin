import axios from '~/axios';
import { queryParams } from '~/composables/utils.js'
// 获取用户列表
export const getUserList = (page, query = {}) => {
  return axios.get(`admin/user/${page}` + queryParams(query))
}

// 修改用户状态
export const updateUserStatus = (id, status) => {
  return axios.post(`admin/user/${id}/update_status`, { status })
}

// 新增用户
export const createUser = (data) => {
  return axios.post('admin/user', data);
}

// 修改用户
export const updateUser = (id, data) => {
  return axios.post(`admin/user/${id}`, data)
}

// 删除用户
export const deleteUser = id => {
  return axios.post(`admin/user/${id}/delete`);
}