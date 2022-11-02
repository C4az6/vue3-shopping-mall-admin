import axios from '~/axios.js';

// 商品评价列表
export const getGoodsComment = (page, query = {}) => {
  return axios.get(`admin/goods_comment/${page}`, { params: query });
}


// 修改商品评价状态
export const updateGoodsCommentStatus = (id, status) => {
  return axios.post(`admin/goods_comment/${id}/update_status`, { status });
}


// 回复商品评价
export const reviewGoodsComment = (id, data) => {
  return axios.post(`admin/goods_comment/review/${id}`, data);
}