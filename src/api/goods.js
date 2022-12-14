import axios from '~/axios';
import { queryParams } from '~/composables/utils.js'
export const getGoodsList = (page, query = {}) => {
  return axios.get(`admin/goods/${page}` + queryParams(query));
}

// 批量上架/下架商品
export const updateGoodsStatus = (ids, status) => {
  return axios.post(`admin/goods/changestatus`, { ids, status })
}

// 增加商品
export const createGoods = (data) => {
  return axios.post('admin/goods', data);
}


export const updateGoods = (id, data) => {
  return axios.post(`admin/goods/${id}`, data)
}


export const deleteGoods = ids => {
  return axios.post(`admin/goods/delete_all`, { ids });
}

// 获取商品轮播图
export const readGoods = id => {
  return axios.get(`admin/goods/read/${id}`);
}


// 设置商品轮播图
export const setGoodsBanner = (id, data) => {
  return axios.post(`admin/goods/banners/${id}`, data);
}


// 更新商品规格
export const updateGoodsSku = (id, data) => {
  return axios.post(`admin/goods/updateskus/${id}`, data);
}

// 添加商品规格选项
export const createGoodsSkusCard = (data) => {
  return axios.post(`admin/goods_skus_card`, data);
}

// 修改商品规格选项
export const updateGoodsSkuCard = (id, data) => {
  return axios.post(`admin/goods_skus_card/${id}`, data);
}

// 删除规格选项
export const deleteGoodsSkuCard = (id) => {
  return axios.post(`admin/goods_skus_card/${id}/delete`);
}

// 排序规格选项
export const sortGoodsSkuCard = (data) => {
  return axios.post(`admin/goods_skus_card/sort`, data);
}