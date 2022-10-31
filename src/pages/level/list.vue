<template>
  <div>
    <el-card shadow="never" :body-style="{ padding: '20px' }">
      <ListHeader></ListHeader>

      <el-table :data="dataList" stripe v-loading="loading">
        <el-table-column label="会员等级" prop="name">
        </el-table-column>

        <el-table-column label="折扣率(%)" prop="discount">
        </el-table-column>

        <el-table-column label="等级序号" prop="level">
        </el-table-column>

        <el-table-column label="状态">
          <template #default="{row}">
            <el-switch v-model="row.status" :active-value="1" :inactive-value="0" @change="statusChange($event, row)" v-loading="row.statusLoading">
            </el-switch>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template #default="{row}">
            <el-button text type="primary" size="small" @click="handleEdit(row)">修改</el-button>
            <el-popconfirm title="确认要删除该记录吗?" confirmButtonText="确认" cancelButtonText="取消" @confirm="handleDelete(row.id)">
              <template #reference>
                <el-button text type="primary" size="small">删除</el-button>
              </template>
            </el-popconfirm>

          </template>
        </el-table-column>
      </el-table>

      <div class="mt-4 flex items-center justify-center">
        <el-pagination background layout="prev, pager, next" :current-page="currentPage" :page-size="limit" :total="totalCount" @current-change="getData" />
      </div>

    </el-card>

  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { getUserLevelList, addUserLevel, upateUserLevel, upateUserLevelStatus, deleteUserLevel } from '~/api/level'
import ListHeader from '~/components/ListHeader.vue'
import FormDrawer from '~/components/FormDrawer.vue'
import { useInitForm, useInitTable } from '~/composables/useCommon.js'

const {
  loading,
  dataList,
  searchForm,
  currentPage,
  totalCount,
  limit,
  getData,
  statusChange,
  handleDelete
} = useInitTable({
  delete: deleteUserLevel,
  updateStatus: upateUserLevelStatus,
  getList: getUserLevelList
});

const {
  formDrawerRef,
  formRef,
  form,
  editId,
  rules,
  drawerTitle,
  handleEdit,
  create,
  handleSubmit,
} = useInitForm({
  getData
});


</script>

<style lang="scss" scoped>
</style>