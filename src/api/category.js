import axios from '~/axios';

// 分类列表
export const getCategoryList = () => {
  return axios.get('admin/category');
}

// 增加分类
export const addCategory = (data) => {
  return axios.post(`admin/category`, data)
}

// 修改分类
export const updateCategory = (id, name) => {
  return axios.post(`admin/category/${id}`, { name })
}

// 删除分类
export const deleteCategory = (id) => {
  return axios.post(`admin/category/${id}/delete`)
}

// 修改分类状态
export const updateCategoryStatus = (id, status) => {
  return axios.post(`admin/category/${id}/update_status`, { status })
}