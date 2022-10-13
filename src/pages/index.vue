<template>
  <div>
    后台首页

    {{ $store.state.user.username }}

    <el-button type="primary" @click="handleLogout">退出登录</el-button>
  </div>
</template>

<script setup>
import { showModal, toast } from "~/composables/utils.js";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { logout } from "~/api/manager.js";

const router = useRouter();

const store = useStore();
function handleLogout() {
  showModal("是否要退出登录?")
    .then((res) => {
      logout();
    })
    .finally(() => {
      store.dispatch("logout");
      // 跳转登录页面
      router.push("/login");
      // 提示退出登录成功
      toast("退出登录成功", "success");
    });
}
</script>
