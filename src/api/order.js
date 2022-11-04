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

// 获取订单物流信息
export const getShipInfo = id => {
  return axios.get(`admin/order/${id}/get_ship_info`)
}

// 获取快递公司列表
export const getExpressCompanyList = () => {
  return axios.get(`admin/express_company/1`)
}

// 订单发货
export const orderShip = (id, data) => {
  return axios.post(`admin/order/${id}/ship`, data)
}

// 拒绝/同意退款
export const handleRefund = (id, data) => {
  return axios.post(`admin/order/${id}/handle_refund`, data);
}