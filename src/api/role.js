import axios from '~/axios';

// 角色列表
export const getRoleList = (page) => {
  return axios.get(`admin/role/${page}`)
}

// 增加角色
export const addRole = (data) => {
  return axios.post(`admin/role`, data)
}

// 修改角色
export const updateRole = (id, data) => {
  return axios.post(`admin/role/${id}`, data)
}

// 删除角色
export const deleteRole = (id) => {
  return axios.post(`admin/role/${id}/delete`)
}

// 修改角色状态
export const updateRoleStatus = (id, status) => {
  return axios.post(`admin/role/${id}/update_status`, { status })
}

// 配置角色权限
export const setRules = (data) => {
  return axios.get(`admin/role/set_rules`, data)
}