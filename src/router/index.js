import {
  createRouter,
  createWebHashHistory
} from 'vue-router';

import Admin from '~/layouts/admin.vue'
import Index from '~/pages/index.vue'
import Login from '~/pages/login.vue'
import NotFound from '~/pages/404.vue'
import GoodsList from '~/pages/goods/list.vue'
import CategoryList from '~/pages/category/list.vue'

// 默认路由,所有用户共享
const routes = [
  {
    path: '/',
    name: 'admin',
    component: Admin,
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

// 定义动态路由数组,用于根据菜单数据来动态添加路由
const asyncRoutes = [
  {
    path: '/',
    name: '/',
    component: Index,
    meta: {
      title: '后台首页'
    }
  },
  {
    path: '/goods/list',
    name: '/goods/list',
    component: GoodsList,
    meta: {
      title: '商品管理'
    }
  },
  {
    path: '/category/list',
    name: '/category/list',
    component: CategoryList,
    meta: {
      title: '分类管理'
    }
  }
]


export const router = createRouter({
  // 路由模式：hash
  history: createWebHashHistory(),
  routes
});


// 动态添加路由方法
/* 
  实现思路:

*/
export const addRoutes = (menus) => {
  // 是否由新路由
  let hasNewRoutes = false;
  const findAndAddRoutesByMenus = (arr) => {
    arr.forEach(e => {
      const item = asyncRoutes.find(o => o.path === e.frontpath);
      if (item && !router.hasRoute(item.path)) {
        // 路由存在并且没有注册过,那么添加到嵌套路由中
        router.addRoute('admin', item)
        hasNewRoutes = true;
      }
      if (e.child && e.child.length > 0) {
        // 有子路由
        findAndAddRoutesByMenus(e.child);
      }
    })
  }
  findAndAddRoutesByMenus(menus);
  return hasNewRoutes;
}