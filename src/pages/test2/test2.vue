<template>
  <div>
    <el-button type="primary" size="default" @click="handleClick">test2</el-button>

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const handleClick = () => {
  router.replace({
    path: '/test3',
    query: {
      name: 'alexander',
      age: 25
    }
  })
}
</script>

<style lang="scss" scoped>
</style>