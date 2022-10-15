<template>
  <el-aside width="220px" class="image-aside">
    <div class="top">
      <div v-for="item in 100" :key="item">
        {{ item }}
      </div>
    </div>
    <div class="bottom">分页区域</div>
  </el-aside>
</template>

<script setup></script>

<style lang="less" scoped>
.image-aside {
  border-right: 1px solid #eee;
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
