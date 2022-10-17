import axios from '~/axios';

// 公告列表
export const getNoticeList = (page) => {
  return axios.get(`admin/notice/${page}`)
}

// 增加公告
export const createNotice = (data) => {
  return axios.post(`admin/notice`, data)
}

// 修改公告
export const editNotice = (id, data) => {
  return axios.post(`admin/notice/${id}`, data);
}

// 删除公告
export const removeNotice = (id) => {
  return axios.post(`admin/notice/${id}/delete`)
}
