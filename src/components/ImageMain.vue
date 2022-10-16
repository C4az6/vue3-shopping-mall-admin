<template>
  <el-main class="image-main" v-loading="loading">
    <div class="top">
      <div v-for="item in imageList" :key="item">
        {{ item.url }}
      </div>
    </div>
    <div class="bottom">
      <el-pagination background layout="prev,pager, next" :total="total" :current-page="currentPage" :page-size="limit" @current-change="getData" />
    </div>
  </el-main>
</template>

<script setup>
import { getImageList } from '~/api/image.js';
import { ref, reactive, onMounted, computed } from 'vue';

const total = ref(0);
const limit = ref(10);
const currentPage = ref(1);
const imageList = ref([]);
const loading = ref(false);
const imageClassId = ref(0);

// 获取数据
function getData(p = null) {
  if (typeof p === 'number') {
    currentPage.value = p;
  }
  loading.value = true;
  getImageList(imageClassId.value, currentPage.value)
    .then((res) => {
      console.log("res: ", res);
      imageList.value = res.list;
      total.value = res.totalCount;
    })
    .finally(() => {
      loading.value = false;
    });
}

// 根据分类ID重新加载图片列表
const loadData = id => {
  console.log("id: ", typeof id);
  currentPage.value = 1;
  imageClassId.value = id;
  getData();
}
defineExpose({
  loadData
})
</script>

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
