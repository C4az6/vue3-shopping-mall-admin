import axios from '~/axios';

export const getGoodsList = (page, query = {}) => {
  return axios.get(`admin/goods/${page}`, {
    params: query
  });
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

