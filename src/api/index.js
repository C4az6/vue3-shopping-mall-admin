import axios from '~/axios';


// 后台首页统计数据接口1

export const getStatistics1 = () => {
  return axios.get('admin/statistics1');
}