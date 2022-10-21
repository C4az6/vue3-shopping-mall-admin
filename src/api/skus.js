import axios from '~/axios';

// 获取商品规格列表
export const getSkuList = (page) => {
  return axios.get(`admin/skus/${page}`)
}

// 增加商品规格
export const addSku = (data) => {
  return axios.post(`admin/skus`, data)
}

// 修改商品规格
export const updateSku = (id, data) => {
  return axios.post(`admin/skus/${id}`, data)
}

// 批量删除商品规格
export const deleteSku = (ids) => {
  ids = !Array.isArray(ids) ? [ids] : ids;
  return axios.post(`/admin/skus/delete_all`, { ids })
}

// 修改商品规格状态
export const updateSkuStatus = (id, status) => {
  return axios.post(`admin/skus/${id}/update_status`, { status })
}
