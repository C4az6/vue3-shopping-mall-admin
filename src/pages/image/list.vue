<template>
  <el-container class="bg-white rounded" :style="{ height: h + 'px' }">
    <el-header class="image-header">
      <el-button type="primary" size="small" @click="handleOpenCreate">新增图片分类</el-button>

    </el-header>
    <el-container>
      <ImageAside ref="imageAsideRef" @change="handleImageClassIdChange"></ImageAside>
      <ImageMain ref="imageMainRef"></ImageMain>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref } from 'vue'
import ImageAside from "~/components/ImageAside.vue";
import ImageMain from "~/components/ImageMain.vue";

const imageAsideRef = ref(null);
const imageMainRef = ref(null)

// 让高度撑满页面
const windowHeight = window.innerHeight || document.body.clientHeight;
// 最后的40是padding
const h = windowHeight - 64 - 44 - 40;

const handleOpenCreate = () => {
  // 打开新增图片分类的抽屉组件
  imageAsideRef.value.openFormDrawer();
}

// 监听图库分类ID变化
const handleImageClassIdChange = id => {
  console.log("image class id change: ", id);
  imageMainRef.value.loadData(id);
}

</script>

<style lang="less" scoped>
.image-header {
  border-bottom: 1px solid #eee;
  @apply flex items-center;
}
</style>
