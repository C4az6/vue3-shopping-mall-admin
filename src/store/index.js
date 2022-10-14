// 1.引入vuex
import { createStore } from 'vuex';
import { login, getManagerInfo } from "~/api/manager.js";
import { toast } from "~/composables/utils.js";
import { getToken, setToken, removeToken } from "~/composables/auth.js";
// 2.创建store实例
const store = createStore({
  state() {
    return {
      // 用户信息
      user: {},
      // 侧边宽度 250px是展开状态 缩起状态是64px
      asideWidth: "250px",
      // 左侧菜单数据列表
      menus: [],
      // 角色权限数组
      ruleNames: []
    }
  },
  // 同步方法
  mutations: {
    // 设置用户信息
    SET_USERINFO(state, user) {
      state.user = user;
    },
    // 展开/缩起侧边
    handleAsideWidth(state) {
      state.asideWidth = state.asideWidth === "250px" ? "64px" : "250px";
    },
    // 设置菜单数据
    SET_MENUS(state, menus) {
      state.menus = menus;
    },
    // 设置
    SET_RULENAMES(state, ruleNames) {
      state.ruleNames = ruleNames;
    }
  },
  // 异步方法
  actions: {
    // 用户退出登录
    logout({ commit }) {
      // 清除用户token
      removeToken();
      // 清空Vuex用户状态数据
      commit('SET_USERINFO', {});
    },
    // 用户登录
    login({ commit }, { username, password }) {
      return new Promise((resolve, reject) => {
        login(username, password).then(res => {
          // 提示登录成功
          toast("登录成功");
          // 存储用户的登录信息
          setToken(res.token);
          resolve(res);
        }).catch(err => reject(err));
      })
    },

    // 获取当前登录用户信息
    getInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getManagerInfo().then(res => {
          console.log("userinfo: ", res);
          commit('SET_MENUS', res.menus);
          commit('SET_RULENAMES', res.ruleNames)
          commit('SET_USERINFO', res);
          resolve(res);
        }).catch(err => reject(err));
      })
    }
  }
})

// 3.导出store实例
export default store;

