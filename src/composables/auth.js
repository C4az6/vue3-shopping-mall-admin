import { useCookies } from "@vueuse/integrations/useCookies";
const TOKEN_KEY = "admin-token";
const cookie = useCookies();

// 获取token
export const getToken = () => {
  return cookie.get(TOKEN_KEY);
}

// 设置token
export const setToken = (token) => {
  return cookie.set(TOKEN_KEY, token);
}

// 清除token
export const removeToken = () => {
  return cookie.remove(TOKEN_KEY);
} 