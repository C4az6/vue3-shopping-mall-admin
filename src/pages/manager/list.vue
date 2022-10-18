<template>
  <el-card shadow="never" :body-style="{ padding: '20px' }">
    <!-- 搜索 -->
    <el-form :model="searchForm" label-width="80px">
      <el-row :gutter="20">
        <el-col :span="8" :offset="0">
          <el-form-item label="关键词">
            <el-input size="small" v-model="searchForm.keyword" placeholder="管理员昵称" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="8">
          <div class="flex items-center justify-center">
            <el-button size="small" type="primary" @click="getData">搜索</el-button>
            <el-button size="small" @click="resetSearchForm">重置</el-button>
          </div>
        </el-col>
      </el-row>

    </el-form>

    <div class="flex items-center justify-between">
      <el-button type="primary" size="small" @click="create">新增</el-button>
      <el-tooltip class="box-item" effect="dark" content="刷新数据" placement="top">
        <el-icon @click="getData" class="cursor-pointer">
          <Refresh />
        </el-icon>
      </el-tooltip>
    </div>

    <div class="mt-4">
      <el-table :data="dataList" stripe style="width: 100%" v-loading="loading">
        <el-table-column prop="title" label="管理员">
          <template #default="{row}">
            <div class="flex items-center">
              <el-avatar :size="40" :src="row.avatar" @error="errorHandler">
                <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
              </el-avatar>
              <div class="ml-4">
                <h6>{{row.username}}</h6>
                <small>ID: {{row.id}}</small>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="所属管理员" align="center">
          <template #default="{row}">
            {{row.role?.name ?? "-"}}
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="状态" align="center">
          <template #default="{row}">
            <div>
              <el-switch :loading="row.statusLoading" style="--el-switch-on-color: #4338ca;" :modelValue="row.status" :active-value="1" :inactive-value="0" :disabled="row.super == 1" @change="statusChange($event,row)"></el-switch>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="address" label="操作" width="200">
          <template #default="scope">
            <small class="text-sm text-gray-500" v-if="scope.row.super == 1">暂无操作</small>
            <div v-else>
              <el-button type="primary" @click="handleEdit(scope.row)" text size="small">修改</el-button>

              <el-popconfirm width="200" title="是否要删除该管理员?" confirmButtonText="确认" cancelButtonText="取消" @confirm="handleDelete(scope)">
                <template #reference>
                  <el-button type="primary" text size="small">删除</el-button>
                </template>
              </el-popconfirm>
            </div>
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
import { ref, reactive, computed, onMounted } from 'vue';
import { getManagerList, updateManagerStatus } from '~/api/manager.js';
import { toast } from '~/composables/utils.js'
const loading = ref(false);
const dataList = ref([]);
const searchForm = reactive({
  keyword: ""
});
const currentPage = ref(1);
const totalCount = ref(0);
const limit = ref(10);

function statusChange(status, row) {
  row.statusLoading = true;
  updateManagerStatus(row.id, status).then(res => {
    toast('修改状态成功');
    row.status = status;
  }).finally(() => {
    row.statusLoading = false;
  })
}

function resetSearchForm() {
  searchForm.keyword = "";
  getData();
}

const errorHandler = () => true

function handleEdit() {

}

function handleDelete() {

}

function create() {
  console.log('创建')
}

function getData(p = null) {
  if (typeof p == 'number') {
    currentPage.value = p;
  }
  loading.value = true;
  getManagerList(currentPage.value, searchForm).then(res => {
    dataList.value = res.list.map(item => {
      item.statusLoading = false;
      return item;
    })
    totalCount.value = res.totalCount;
  }).finally(() => {
    loading.value = false;
  });
}

onMounted(() => getData());

</script>

<style lang="less" scoped>
</style>