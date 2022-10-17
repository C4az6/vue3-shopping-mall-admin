<template>
  <el-card shadow="always" :body-style="{ padding: '20px' }">
    <div class="flex items-center justify-between">
      <el-button type="primary" size="small" @click="createNotice">新增</el-button>
      <el-tooltip class="box-item" effect="dark" content="刷新数据" placement="top">
        <el-icon class="cursor-pointer">
          <Refresh />
        </el-icon>
      </el-tooltip>
    </div>

    <div class="mt-4">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="公告标题" />
        <el-table-column prop="name" label="发布时间" />
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
      <el-pagination background layout="prev, pager, next" :total="1" />
    </div>

  </el-card>

</template>

<script setup>
import { ref, reactive } from 'vue'
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }]

// 新增公告
const createNotice = () => {
  console.log("create notice");
};

// 删除公告
const handleDelete = () => {
  console.log('del notice')
}
</script>

<style lang="less" scoped>
</style>