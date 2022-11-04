import axios from '~/axios.js';

// 获取系统配置信息
export function getSysConfig() {
  return axios.get(`/admin/sysconfig`);
}

// 设置系统配置
export function setSysConfig(data) {
  return axios.post(`/admin/sysconfig`, data);
}


// 上传文件
export const uploadAction = "/api/admin/sysconfig/upload"