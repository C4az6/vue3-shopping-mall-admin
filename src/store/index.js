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
      user: {}
    }
  },
  // 同步方法
  mutations: {
    // 设置用户信息
    SET_USERINFO(state, user) {
      state.user = user;
    }
  },
  // 异步方法
  actions: {
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
          commit('SET_USERINFO', res);
          resolve(res);
        }).catch(err => reject(err));
      })

    }
  }
})

// 3.导出store实例
export default store;

