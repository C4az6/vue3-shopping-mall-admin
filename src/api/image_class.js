import axios from '~/axios';

// 获取图库列表数据
export const getImageClasList = (page) => {
  return axios.get('admin/image_class/' + page + '?limit=' + 10);
}

// 创建图库分类
export const createImageClasList = (data) => {
  return axios.post('admin/image_class', data);
}

// 编辑图库分类
export const editImageClasList = (id, data) => {
  return axios.post('admin/image_class/' + id, data);
}

// 删除图库分类
export const deleteImageClasList = (id) => {
  return axios.post(`admin/image_class/${id}/delete`);
}
