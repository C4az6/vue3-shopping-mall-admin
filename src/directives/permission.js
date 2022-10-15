import store from '~/store';

// 判断当前角色是否有API访问权限,没有权限,按钮不显示
function hasPermission(value, el = false) {
  if (!Array.isArray(value)) {
    throw new Error(`需要配置权限,类似: v-permission="['getStatistics3,GET']"`)
  }
  // 把传入的API别名和vuex存储的当前用户所有权限别名列表进行匹配
  const hasAuth = value.findIndex(value => store.state.ruleNames.includes(value)) !== -1;
  if (el && !hasAuth) {
    // 如果用户没有权限同时元素存在，把该元素从页面移除
    el.parentNode && el.parentNode.removeChild(el);
  }
  return hasAuth;

}

export default {
  install(app) {
    console.log("执行全局指令~");
    // 定义全局自定义指令
    app.directive("permission", {
      mounted(el, binding) {
        hasPermission(binding.value, el);
      }
    })
  }
}