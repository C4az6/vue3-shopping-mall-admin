/* 处理权限验证 */
import router from '~/router';
import { getToken } from '~/composables/auth.js'
import { toast } from '~/composables/utils.js'
import store from './store';

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  console.log("全局前置守卫");
  const token = getToken();
  // 没有登录强制跳转回登录页
  if (!token && to.path !== '/login') {
    toast('请先登录', 'error');
    return next({ path: '/login' });
  }

  // 防止重复登录
  if (token && to.path === '/login') {
    toast('请勿重复登录', 'error');
    return next({ path: from.path ? from.path : '/' });
  }

  // 如果用户登录了，自动获取用户信息并且存储到vuex中
  if (token) {
    await store.dispatch('getInfo')
  }

  // 放行
  next();
})
