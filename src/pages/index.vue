<template>
  <div>
    后台首页

    <el-button @click="set">设置</el-button>
    <el-button @click="get">读取</el-button>
    <el-button @click="removeCookie">删除</el-button>
  </div>
</template>

<script setup>
import { useCookies } from "@vueuse/integrations/useCookies";
import { getManagerInfo } from "~/api/manager.js";
const cookie = useCookies();
console.log(cookie);

// 设置cookie
function set() {
  cookie.set("admin-token", "123456");
}

// 获取cookie
function get() {
  const token = cookie.get("admin-token");
  console.log("get cookie: ", token);
}

// 删除cookie
function removeCookie() {
  cookie.remove("admin-token");
}
</script>
