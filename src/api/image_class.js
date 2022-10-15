import axios from '~/axios';

export const getImageClasList = (page) => {
  return axios.get('admin/image_class/' + page);
}