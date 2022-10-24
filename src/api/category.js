import axios from '~/axios';

export const getCategoryList = () => {
  return axios.get('admin/category');
}