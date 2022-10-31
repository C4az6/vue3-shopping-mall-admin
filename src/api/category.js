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
export const updateCategory = (id, data) => {
  return axios.post(`admin/category/${id}`, data)
}

// 删除分类
export const deleteCategory = (id) => {
  return axios.post(`admin/category/${id}/delete`)
}

// 修改分类状态
export const updateCategoryStatus = (id, status) => {
  return axios.post(`admin/category/${id}/update_status`, { status })
}

// 商品分类已关联的产品列表
export const getCategoryGoodsList = (category_id) => {
  return axios.get(`admin/app_category_item/list?category_id=${category_id}`)
}

// 删除商品分类已关联的产品
export const deleteCategoryGoods = (id) => {
  return axios.post(`admin/app_category_item/${id}/delete`)
}

// 给指定的商品分类关联产品
export const connectCategoryGoods = (data) => {
  return axios.post(`admin/app_category_item`, data)
}