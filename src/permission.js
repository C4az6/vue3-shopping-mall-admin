/* 处理权限验证 */
import router from '~/router';
import { getToken } from '~/composables/auth.js'
import { toast } from '~/composables/utils.js'

// 全局前置守卫
router.beforeEach((to, from, next) => {
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
  // 放行
  next();
})
