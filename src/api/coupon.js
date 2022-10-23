import axios from '~/axios/';

export const getCouponList = (page) => {
  return axios.get(`admin/coupon/${page}`);
}

export const addCoupon = data => {
  return axios.post(`admin/coupon`, data);
}

export const updateCoupon = (id, data) => {
  return axios.post(`admin/coupon/${id}`, data);
}

export const deleteCoupon = id => {
  return axios.post(`coupon/${id}/delete`);
}


export const disableCoupon = (id, status) => {
  return axios.post(`admin/coupon/${id}/update_status`, { status })
}