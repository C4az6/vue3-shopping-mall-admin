<template>
  <el-row class="login-container">
    <el-col :lg="16" :md="12" class="left">
      <div>
        <div>欢迎光临</div>
        <div>这是我的一个Vue3+vite实战后台管理系统的个人练习项目</div>
      </div>
    </el-col>
    <el-col :lg="8" :md="12" class="right">
      <h2 class="title">欢迎回来</h2>
      <div>
        <span class="line"></span>
        <span>账号密码登录</span>
        <span class="line"></span>
      </div>

      <el-form :model="form" class="w-[250px]">
        <el-form-item>
          <el-input v-model="form.name" placeholder="请输入用户名">
            <template #prefix>
              <el-icon><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-input v-model="form.password" placeholder="请输入密码">
            <template #prefix>
              <el-icon class="el-input__icon"><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            round
            color="#6366f1"
            type="primary"
            class="w-[250px]"
            @click="onSubmit"
            >登 录</el-button
          >
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script setup>
import { reactive } from "vue";

// do not use same name with ref
const form = reactive({
  username: "",
  password: "",
});

const onSubmit = () => {
  console.log("submit!");
};
</script>

<style lang="less" scoped>
.el-col-md-12 {
  display: flex;
}

.login-container {
  @apply bg-indigo-500 min-h-screen;
  .left,
  .right {
    @apply flex items-center justify-center;
  }
  .right {
    @apply bg-light-50 flex-col;
    .title {
      @apply font-bold text-3xl text-gray-900;
    }
    > div {
      @apply flex items-center justify-center my-5 text-gray-300 space-x-2;
    }
  }

  .left > div > div {
    &:first-child {
      @apply font-bold text-5xl text-light-50 mb-4;
    }
    &:nth-child(2) {
      @apply text-gray-200 text-sm;
    }
  }
}

.right .line {
  @apply h-1px w-16 bg-gray-200;
}
</style>
