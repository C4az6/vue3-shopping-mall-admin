<template>
  <el-aside width="220px" class="image-aside" v-loading="loading">
    <div class="top">
      <AsideList v-for="(item, index) in imageList" :key="index" :active="index === 0">{{ item.name }}</AsideList>
    </div>
    <div class="bottom">
      <el-pagination background layout="prev, next" :total="total" :current-page="currentPage" :page-size="limit" @current-change="getData" />
    </div>
  </el-aside>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import AsideList from "./AsideList.vue";
import { getImageClasList } from "~/api/image_class.js";

// 加载动画
const loading = ref(false);

// 图库菜单列表数据
const imageList = ref([]);

// 分页状态
const currentPage = ref(1);
const total = ref(0);
const limit = ref(10);

// 获取数据
function getData(p = null) {
  console.log(p)
  if (typeof p === 'number') {
    currentPage.value = p;
  }
  loading.value = true;
  getImageClasList(currentPage.value)
    .then((res) => {
      console.log("res: ", res);
      imageList.value = res.list;
      total.value = res.totalCount;
    })
    .finally(() => {
      loading.value = false;
    });
}

onMounted(() => {
  getData();
});
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
