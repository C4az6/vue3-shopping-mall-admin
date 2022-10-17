<template>
  <el-card shadow="always" :body-style="{ padding: '20px' }">
    <div class="flex items-center justify-between">
      <el-button type="primary" size="small" @click="create">新增</el-button>
      <el-tooltip class="box-item" effect="dark" content="刷新数据" placement="top">
        <el-icon class="cursor-pointer">
          <Refresh />
        </el-icon>
      </el-tooltip>
    </div>

    <div class="mt-4">
      <el-table :data="dataList" stripe style="width: 100%" v-loading="loading">
        <el-table-column prop="title" label="公告标题" />
        <el-table-column prop="create_time" label="发布时间" />
        <el-table-column align="center" prop="address" label="操作" width="200">
          <template #default="scope">
            <el-button type="primary" text size="small">修改</el-button>

            <el-popconfirm width="200" title="是否要删除该图片?" confirmButtonText="确认" cancelButtonText="取消" @confirm="handleDelete">
              <template #reference>
                <el-button type="primary" text size="small">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="mt-4 flex items-center justify-center">
      <el-pagination background layout="prev, pager, next" :current-page="currentPage" :page-size="limit" :total="totalCount" @current-change="getData" />
    </div>

  </el-card>

</template>

<script setup>
import { ref, reactive } from 'vue';
import { getNoticeList, createNotice, editNotice, removeNotice } from '~/api/notice.js'

const loading = ref(false);
const dataList = ref([]);
const totalCount = ref(0);
const currentPage = ref(1);
const limit = ref(10);

// 新增公告
const create = () => {
  console.log("create notice");
};

// 删除公告
const handleDelete = () => {
  console.log('del notice')
}

// 获取数据
const getData = (p = null) => {
  // 处理当前页码发生改变
  if (p == "number") {
    currentPage.value = p;
  }
  loading.value = true;
  getNoticeList(currentPage.value).then(res => {
    dataList.value = res.list;
    totalCount.value = res.totalCount;
  }).finally(() => {
    loading.value = false;
  })
}

getData();
</script>

<style lang="less" scoped>
</style>