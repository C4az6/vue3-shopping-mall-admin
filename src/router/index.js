import {
  createRouter,
  createWebHashHistory
} from 'vue-router';

import Admin from '~/layouts/admin.vue'
import Index from '~/pages/index.vue'
import Login from '~/pages/login.vue'
import NotFound from '~/pages/404.vue'

const routes = [
  {
    path: '/',
    component: Admin,
    // 子路由
    children: [
      {
        path: '/',
        component: Index,
        meta: {
          title: '后台首页'
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: "登录页"
    }
  },
  {
    // 404路由的正则匹配规则
    path: '/:pathMatch(.*)*',
    component: NotFound
  }
];

const router = createRouter({
  // 路由模式：hash
  history: createWebHashHistory(),
  routes
});


export default router;