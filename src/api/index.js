import axios from '~/axios';


// 后台首页统计数据接口1
export const getStatistics1 = () => {
  return axios.get('admin/statistics1');
}


export const getStatistics3 = (type) => {
  console.log("type: ", type);
  return axios.get('admin/statistics3?type=' + type);
}