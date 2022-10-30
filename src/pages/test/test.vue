<template>
  <div>
    <el-button type="primary" size="small" @click="handleClick">预览文件</el-button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const handleClick = () => {
  console.log(window.location.href);
  // router.push('/test2')
};
</script>

<style lang="scss" scoped>
</style>