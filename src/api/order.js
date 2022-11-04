import axios from '~/axios.js'
import { queryParams } from '~/composables/utils.js'

// 订单列表
export const getOrderList = (page, query) => {
  let params = queryParams(query);
  return axios.get(`admin/order/${page}` + params)
}

// 批量删除订单
export const deleteOrder = (ids) => {
  return axios.post(`admin/order/delete_all`, { ids })
}

// 导出订单下载excel
export const exportOrder = query => {
  let q = queryParams(query);
  return axios.post(`admin/order/excelexport${q}`, {}, {
    // 表示浏览器将要响应的数据类型
    responseType: "blob"
  });
}