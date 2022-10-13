// 1.引入vuex
import { createStore } from 'vuex';

// 2.创建store实例
const store = createStore({
  state() {
    return {
      // 用户信息
      user: {}
    }
  },
  mutations: {
    // 设置用户信息
    SET_USERINFO(state, user) {
      state.user = user;
    }
  }
})

// 3.导出store实例
export default store;

