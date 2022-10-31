import axios from '~/axios';

// 获取会员等级列表
export const getUserLevelList = (page) => {
  return axios.get(`admin/user_level/${page}`)
}

// 增加会员等级
export const addUserLevel = data => {
  return axios.post(`admin/user_level`, data)
}

// 修改会员等级
export const upateUserLevel = (id, data) => {
  return axios.post(`admin/user_level/${id}`, data)
}

// 修改会员等级状态
export const upateUserLevelStatus = (id, status) => {
  return axios.post(`admin/user_level/${id}/update_status`, { status })
}

// 删除会员等级
export const deleteUserLevel = (id) => {
  return axios.post(`admin/user_level/${id}/delete`)
}