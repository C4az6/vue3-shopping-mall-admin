<template>
  <el-card shadow="never" class="border-0">
    <!-- 新增&刷新 -->
    <ListHeader @create="create" @refresh="getData"></ListHeader>

    <el-table :data="dataList" stripe v-loading="loading" style="width: 100%;">
      <el-table-column prop="name" label="规格名称" />

      <el-table-column prop="default" label="规格值" width="380" />

      <el-table-column prop="order" label="排序" />

      <el-table-column label="状态" width="120">
        <template #default="{ row }">
          <el-switch v-model="row.status" :active-value="1" :inactive-value="0" :loading="row.statusLoading" :disabled="row.super == 1" @change="statusChange($event, row)">
          </el-switch>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="250px">
        <template #default="{ row }">
          <el-button type="primary" size="small" text @click="handleEdit(row)">修改</el-button>
          <el-popconfirm title="是否要删除该规格" confirmButtonText="确认" cancelButtonText="取消" @confirm="handleDelete(row.id)">
            <template #reference>
              <el-button type="primary" size="small" text>删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <div class="flex items-center justify-center mt-5">
      <el-pagination background layout="prev, pager, next" :total="totalCount" :current-page="currentPage" :page-size="limit" @current-change="getData"></el-pagination>
    </div>

    <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
      <el-form :model="form" ref="formRef" :rules="rules" label-width="80px">
        <el-form-item label="规格名称" prop="name">
          <el-input v-model="form.name" placeholder="规格名称"></el-input>
        </el-form-item>

        <el-form-item label="排序" prop="order">
          <el-input-number v-model="form.order" :min="0" :max="1000" placeholder="排序">
          </el-input-number>

        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="0">
          </el-switch>
        </el-form-item>

        <el-form-item label="规格值" prop="default">
          <el-input v-model="form.default">
          </el-input>
        </el-form-item>
      </el-form>
    </FormDrawer>

  </el-card>

</template>

<script setup>
import { ref } from 'vue';
import ListHeader from '~/components/ListHeader.vue';
import { getSkuList, addSku, updateSku, deleteSku, updateSkuStatus } from '~/api/skus.js';
import { useInitTable, useInitForm } from '~/composables/useCommon.js';
import FormDrawer from '~/components/FormDrawer.vue';
import { toast } from '~/composables/utils.js'

const {
  dataList,
  loading,
  currentPage,
  totalCount,
  limit,
  getData,
  handleDelete,
  statusChange
} = useInitTable({
  getList: getSkuList,
  delete: deleteSku,
  updateStatus: updateSkuStatus
});

const {
  formDrawerRef,
  formRef,
  form,
  rules,
  drawerTitle,
  handleSubmit,
  create,
  handleEdit
} = useInitForm({
  form: {
    name: "",
    default: "",
    status: 1,
    order: 50
  },
  rule: {
    name: [
      {
        required: true,
        message: '规格名称不能为空',
        trigger: 'blur'
      }
    ],
    default: [
      {
        required: true,
        message: '规格值不能为空',
        trigger: 'blur'
      }
    ],
  },
  getData,
  update: updateSku,
  create: addSku
});


</script>

<style lang="less" scoped>
</style>