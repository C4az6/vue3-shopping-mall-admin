import axios from '~/axios';

export const getImageClasList = (page) => {
  return axios.get('admin/image_class/' + page + '?limit=' + 10);
}

export const createImageClasList = (data) => {
  return axios.post('admin/image_class', data);
}