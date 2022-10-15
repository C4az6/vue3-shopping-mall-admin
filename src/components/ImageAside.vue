<template>
  <el-aside width="220px" class="image-aside">
    <div class="top">
      <AsideList>分类标题</AsideList>
      <AsideList active>分类标题2</AsideList>
    </div>
    <div class="bottom">分页区域</div>
  </el-aside>
</template>

<script setup>
import AsideList from "./AsideList.vue";
</script>

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
