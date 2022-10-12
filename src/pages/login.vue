<template>
  <div>
    <el-row class="bg-indigo-500 min-h-screen">
      <el-col :span="16" class="flex items-center justify-center">
        <div>
          <div class="font-bold text-5xl text-light-50 mb-4">欢迎光临</div>
          <div class="text-gray-200 text-sm">
            这是我的一个Vue3+vite实战后台管理系统的个人练习项目
          </div>
        </div>
      </el-col>
      <el-col
        :span="8"
        class="bg-light-50 flex items-center justify-center flex-col"
      >
        <h2 class="font-bold text-3xl text-gray-900">欢迎回来</h2>
        <div
          class="flex items-center justify-center my-5 text-gray-300 space-x-2"
        >
          <span class="h-[1px] w-16 bg-gray-200"></span>
          <span>账号密码登录</span>
          <span class="h-[1px] w-16 bg-gray-200"></span>
        </div>

        <el-form :model="form" class="w-[250px]">
          <el-form-item>
            <el-input v-model="form.name" placeholder="请输入用户名" />
          </el-form-item>

          <el-form-item>
            <el-input v-model="form.password" placeholder="请输入密码" />
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
  </div>
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
