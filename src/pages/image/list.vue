<template>
  <el-container class="bg-white rounded" :style="{ height: h + 'px' }">
    <el-header class="image-header"> Header </el-header>
    <el-container>
      <ImageAside></ImageAside>
      <ImageMain></ImageMain>
    </el-container>
  </el-container>
</template>

<script setup>
import ImageAside from "~/components/ImageAside.vue";
import ImageMain from "~/components/ImageMain.vue";

// 让高度撑满页面
const windowHeight = window.innerHeight || document.body.clientHeight;
// 最后的40是padding
const h = windowHeight - 64 - 44 - 40;
</script>

<style lang="less" scoped>
.image-header {
  border-bottom: 1px solid #eee;
  @apply flex items-center;
}
</style>
