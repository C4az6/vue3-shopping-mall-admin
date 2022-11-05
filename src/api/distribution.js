import axios from '~/axios';
import { queryParams } from '~/composables/utils.js'

// 推广员列表
export const getAgentList = (page, query) => {
  let params = queryParams(query);
  return axios.get(`admin/agent/${page}` + params)
}

// 获取分销数据统计
export function getAgentStatistics() {
  return axios.get(`admin/agent/statistics`)
}

// 推广订单列表
export function getAgentOrderList(page, query) {
  let p = queryParams(query);
  return axios.get(`admin/user_bill/${page}`)
}