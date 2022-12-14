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
import UserList from '~/pages/user/list.vue'
import OrderList from '~/pages/order/list.vue'
import CommentList from '~/pages/comment/list.vue'
import ImageList from '~/pages/image/list.vue'
import NoticeList from '~/pages/notice/list.vue'
import SettingBase from '~/pages/setting/base.vue'
import CouponList from '~/pages/coupon/list.vue'
import ManagerList from '~/pages/manager/list.vue'
import AccessList from '~/pages/access/list.vue'
import RoleList from '~/pages/role/list.vue'
import SkusList from '~/pages/skus/list.vue';
import LevelList from '~/pages/level/list.vue'
import SettingBuy from '~/pages/setting/buy.vue'
import SettingShip from '~/pages/setting/ship.vue'
import DistributionIndex from '~/pages/distribution/index.vue'
import DistributionSetting from '~/pages/distribution/setting.vue'
import test from '~/pages/test/test.vue'
import test2 from '~/pages/test2/test2.vue'
import test3 from '~/pages/test3/test3.vue'

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
    path: '/test',
    name: 'test',
    component: test,
    meta: {
      title: '测试页面'
    }
  },
  {
    path: '/test2',
    name: 'test2',
    component: test2,
    meta: {
      title: '测试页面2'
    }
  },
  {
    path: '/test3',
    name: 'test3',
    component: test3,
    meta: {
      title: '测试页面3'
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
  },

  {
    path: "/user/list",
    name: "/user/list",
    component: UserList,
    meta: {
      title: "用户列表"
    }
  }, {
    path: "/order/list",
    name: "/order/list",
    component: OrderList,
    meta: {
      title: "订单列表"
    }
  }, {
    path: "/comment/list",
    name: "/comment/list",
    component: CommentList,
    meta: {
      title: "评价列表"
    }
  }, {
    path: "/image/list",
    name: "/image/list",
    component: ImageList,
    meta: {
      title: "图库列表"
    }
  }, {
    path: "/notice/list",
    name: "/notice/list",
    component: NoticeList,
    meta: {
      title: "公告列表"
    }
  }, {
    path: "/setting/base",
    name: "/setting/base",
    component: SettingBase,
    meta: {
      title: "配置"
    }
  },

  {
    path: "/setting/buy",
    name: "/setting/buy",
    component: SettingBuy,
    meta: {
      title: "支付配置"
    }
  },

  {
    path: "/setting/ship",
    name: "/setting/ship",
    component: SettingShip,
    meta: {
      title: "物流配置"
    }
  },

  {
    path: "/coupon/list",
    name: "/coupon/list",
    component: CouponList,
    meta: {
      title: "优惠券列表"
    }
  },
  {
    path: "/manager/list",
    name: "/manager/list",
    component: ManagerList,
    meta: {
      title: '管理员列表'
    }
  },
  {
    path: "/access/list",
    name: "/access/list",
    component: AccessList,
    meta: {
      title: '菜单权限管理'
    }
  },
  {
    path: "/role/list",
    name: '/role/list',
    component: RoleList,
    meta: {
      title: '角色管理'
    }
  },
  {
    path: "/skus/list",
    name: '/skus/list',
    component: SkusList,
    meta: {
      title: '规格管理'
    }
  },
  {
    path: "/level/list",
    name: '/level/list',
    component: LevelList,
    meta: {
      title: '会员等级'
    }
  },
  {
    path: "/distribution/index",
    name: '/distribution/index',
    component: DistributionIndex,
    meta: {
      title: '分销员管理'
    }
  },
  {
    path: "/distribution/setting",
    name: '/distribution/setting',
    component: DistributionSetting,
    meta: {
      title: '分销设置'
    }
  }
]


export const router = createRouter({
  // 路由模式：hash
  history: createWebHashHistory(),
  routes
});


// 动态添加路由方法
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