<template>
  <div>
    <el-button type="primary" size="default" @click="handleClick">test3</el-button>

  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();
console.log(route);
const handleClick = () => {
  router.go(-1);
}
</script>

<style lang="scss" scoped>
</style>