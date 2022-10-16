<template>
  <el-main class="image-main" v-loading="loading">
    <div class="top p-3">
      <el-row :gutter="10">
        <el-col :span="6" :offset="0" v-for="(item, index) in imageList" :key="index">
          <el-card shadow="hover" class="relative mb-3" :body-style="{'padding': 0}">
            <el-image :src="item.url" fit="cover" :lazy="true" class=" w-full h-[150px]" :preview-src-list="[item.url]" :initial-index="0"></el-image>
            <div class="image-title">{{item.name}}</div>
            <div class="flex items-center justify-center p-2">
              <el-button type="primary" size="small" text @click="handleRename(item)">重命名</el-button>
              <el-popconfirm width="200" title="是否要删除该图片?" confirmButtonText="确认" cancelButtonText="取消" @confirm="handleDelete(item.id)">
                <template #reference>
                  <el-button type="primary" size="small" text>删除</el-button>
                </template>
              </el-popconfirm>
            </div>
          </el-card>

        </el-col>
      </el-row>

    </div>
    <div class="bottom">
      <el-pagination background layout="prev,pager, next" :total="total" :current-page="currentPage" :page-size="limit" @current-change="getData" />
    </div>
  </el-main>
</template>

<script setup>
import { getImageList, renameImage, deleteImage } from '~/api/image.js';
import { ref, reactive, onMounted, computed } from 'vue';
import { showPrompt, toast } from '~/composables/utils.js';

const total = ref(0);
const limit = ref(10);
const currentPage = ref(1);
const imageList = ref([]);
const loading = ref(false);
const imageClassId = ref(0);

// 删除图片
const handleDelete = (id) => {
  loading.value = true;
  deleteImage([id]).then(res => {
    toast("删除成功");
    getData();
  }).finally(() => {
    loading.value = false;
  })
}

// 图片重命名事件
const handleRename = (item) => {
  console.log("item: ", item);
  showPrompt('重命名', item.name).then(({ value }) => {
    loading.value = true;
    renameImage(item.id, value).then(res => {
      toast('修改成功!');
      getData();
    }).finally(() => {
      loading.value = false;
    })
  })
}

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
});
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

.image-title {
  position: absolute;
  top: 122px;
  left: 0;
  right: 0;
  @apply text-sm truncate text-gray-100 bg-opacity-50 bg-gray-800 px-2 py-1;
}
</style>
