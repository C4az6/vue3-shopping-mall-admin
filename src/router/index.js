import {
  createRouter,
  createWebHashHistory
} from 'vue-router';

import Index from '~/pages/index.vue'
import Login from '~/pages/login.vue'
import NotFound from '~/pages/404.vue'

const routes = [
  {
    path: '/',
    component: Index
  },
  {
    path: '/login',
    name: 'login',
    component: Login
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