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

      <el-form ref="formRef" :model="form" class="w-[250px]" :rules="rules">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名">
            <template #prefix>
              <el-icon><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            placeholder="请输入密码"
            type="password"
            show-password
          >
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
import { reactive, ref } from "vue";
import { login } from "~/api/manager.js";
import { ElNotification } from "element-plus";
import { useCookies } from "@vueuse/integrations/useCookies";
import { useRouter } from "vue-router";
const router = useRouter();
const cookie = useCookies();
console.log("login: ", login);

const form = reactive({
  username: "",
  password: "",
});

const rules = {
  // 这里面的key值最好和上面的form中的key值是对应的。
  // 每一条验证规则都是一个对象
  username: [
    { required: true, message: "用户名不能为空", trigger: "blur" },
    { min: 3, max: 5, message: "用户名长度必须是3-5个字符", trigger: "blur" },
  ],
  password: [
    { required: true, message: "密码不能为空", trigger: "blur" },
    { min: 3, max: 5, message: "密码长度必须是3-5个字符", trigger: "blur" },
  ],
};

// 主要用来在template中定义ref，固定写法
const formRef = ref(null);

const onSubmit = () => {
  // 监听表单验证结果回调事件,false为不通过,true为通过
  formRef.value.validate(async (valid) => {
    console.log("valid: ", valid);
    if (!valid) {
      return false;
    }
    console.log("验证通过!");
    /* login(form.username, form.password)
      .then((res) => {
        console.log("res: ", res.data.data.token);
        // 提示登录成功

        // 存储用户的登录信息
      })
      .catch((err) => {
        ElNotification({
          message: err.response.data.msg || "请求失败",
          type: "error",
          duration: 2500,
        });
      }); */
    try {
      const result = await login(form.username, form.password);
      console.log("result: ", result.data.data.token);
      // 提示登录成功
      ElNotification({
        message: "登录成功",
        type: "success",
        duration: 2500,
      });
      // 存储用户的登录信息
      cookie.set("adminToken", result.data.data.token);

      // 跳转到后台首页
      router.push("/");
    } catch (error) {
      ElNotification({
        message: error.response.data.msg || "请求失败",
        type: "error",
        duration: 2500,
      });
    }
  });
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
