<template>
  <el-main class="image-main">
    <div class="top">
      <div v-for="item in 100" :key="item">
        {{ item }}
      </div>
    </div>
    <div class="bottom">分页区域</div>
  </el-main>
</template>

<script setup></script>

<style lang="less" scoped>
.image-main {
  position: relative;
  .top {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 50px;
    overflow-y: auto;
  }
  .bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    @apply flex justify-center items-center;
  }
}
</style>
