<template>
  <div class="f-header flex">
    <span class="logo">
      <el-icon class="mr-1">
        <eleme-filled />
      </el-icon>
      youkewang.top
    </span>

    <el-icon class="icon-btn" @click="$store.commit('handleAsideWidth')">
      <fold v-if="$store.state.asideWidth === '250px'" />
      <Expand v-else />
    </el-icon>
    <el-tooltip class="box-item" effect="dark" content="刷新" placement="bottom">
      <el-icon class="icon-btn" @click="handleRefresh">
        <refresh />
      </el-icon>
    </el-tooltip>

    <div class="ml-auto flex items-center">
      <el-tooltip class="box-item" effect="dark" :content="isFullscreen ? '退出全屏' : '全屏'" placement="bottom">
        <el-icon class="icon-btn" @click="toggle">
          <full-screen v-if="!isFullscreen" />
          <aim v-else />
        </el-icon>
      </el-tooltip>
      <!-- 下拉菜单组件 -->
      <el-dropdown class="dropdown" @command="hanldeCommand">
        <span class="flex items-center text-light-50">
          <el-avatar class="mr-2" :size="25" :src="$store.state.user.avatar"></el-avatar>
          {{ $store.state.user.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="rePassword">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>

  <formDrawer ref="formDrawerRef" title="修改密码" destroyOnClose @submit="onSubmit">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="auto">
      <el-form-item label="旧密码" prop="oldpassword">
        <el-input v-model="form.oldpassword"> </el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password" show-password>
        </el-input>
      </el-form-item>

      <el-form-item label="确认密码" prop="repassword">
        <el-input v-model="form.repassword" type="password" show-password>
        </el-input>
      </el-form-item>
    </el-form>
  </formDrawer>
</template>

<script setup>
import { useFullscreen } from "@vueuse/core";
import FormDrawer from "~/components/FormDrawer.vue";
import { useRepassword, useLogout } from "~/composables/useManager.js";
const { isFullscreen, toggle } = useFullscreen();

const { formDrawerRef, form, rules, formRef, onSubmit, openRepasswordForm } =
  useRepassword();

const { handleLogout } = useLogout();

// 监听刷新点击事件
const handleRefresh = () => location.reload();

// 下拉菜单选择回调
const hanldeCommand = (key) => {
  switch (key) {
    case "logout":
      handleLogout();
      break;
    case "rePassword":
      openRepasswordForm();
      break;
    default:
      break;
  }
};
</script>

<style>
.f-header {
  @apply flex bg-indigo-700 text-light-50 fixed top-0 right-0 left-0 items-center;
  height: 64px;
  z-index: 1000;
}

.logo {
  width: 250px;
  @apply flex justify-center items-center text-xl font-thin;
}

.icon-btn {
  @apply flex justify-center items-center;
  width: 42px;
  height: 64px;
  cursor: pointer;
}

.icon-btn:hover {
  @apply bg-indigo-600;
}

.f-header .dropdown {
  height: 64px;
  cursor: pointer;
  @apply flex justify-center items-center mx-5;
}
</style>
