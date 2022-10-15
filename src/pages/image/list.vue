<template>
  <el-container class="bg-white rounded" :style="{ height: h + 'px' }">
    <el-header class="image-header"> Header </el-header>
    <el-container>
      <el-aside width="220px" class="image-aside">
        <div class="top">
          <div v-for="item in 100" :key="item">
            {{ item }}
          </div>
        </div>
        <div class="bottom">分页区域</div>
      </el-aside>
      <el-main class="image-main">
        <div class="top">
          <div v-for="item in 100" :key="item">
            {{ item }}
          </div>
        </div>
        <div class="bottom">分页区域</div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
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
