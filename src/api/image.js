import axios from '~/axios';

// 获取指定分类下的图片列表
export const getImageList = (id, page = 1, limit = 10) => {
  console.log("~~~id: ", id);
  return axios.get(`admin/image_class/${id}/image/${page}?limit=${limit}`)
}