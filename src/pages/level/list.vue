<template>
  <div>
    <el-card shadow="never" :body-style="{ padding: '20px' }">
      <ListHeader @create="create" @refresh="getData"></ListHeader>

      <el-table :data="dataList" stripe v-loading="loading">
        <el-table-column label="会员等级" prop="name" align="center">
        </el-table-column>

        <el-table-column label="折扣率(%)" prop="discount" align="center">
        </el-table-column>

        <el-table-column label="等级序号" prop="level" align="center">
        </el-table-column>

        <el-table-column label="状态" align="center">
          <template #default="{row}">
            <el-switch v-model="row.status" :active-value="1" :inactive-value="0" @change="statusChange($event, row)" v-loading="row.statusLoading">
            </el-switch>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center">
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

    <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
      <el-form :model="form" ref="formRef" :rules="rules" label-width="auto">
        <el-form-item label="等级名称">
          <el-input v-model="form.name" style="width: 200px;"></el-input>
        </el-form-item>

        <el-form-item label="等级权重">
          <el-input v-model="form.level" style="width: 200px;"></el-input>
        </el-form-item>

        <el-form-item label="是否启用">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="0">
          </el-switch>
        </el-form-item>

        <el-form-item label="升级条件">
          <div>
            <div class="mb-2">
              <div class="flex items-center">
                <small class="mr-2">累计消费满</small>
                <el-input style="width: 300px;" size="small" v-model="form.max_price" type="number">
                  <template #append>
                    元
                  </template>
                </el-input>
              </div>
              <p class="text-rose-300 text-xs">设置会员等级所需要的累计消费必须大于等于{{form.max_price}},单位：元</p>
            </div>

            <div>
              <div class="flex items-center">
                <small class="mr-2">累计次数满</small>
                <el-input style="width: 300px;" size="small" v-model="form.max_times" type="number">
                  <template #append>
                    次
                  </template>
                </el-input>
              </div>
              <p class="text-rose-300 text-xs">设置会员等级所需要的购买量必须大于等于{{form.max_times}},单位：笔</p>
            </div>
          </div>
        </el-form-item>

        <el-form-item label="折扣率(%)">
          <div>
            <div class="flex items-center">
              <small class="mr-2">累计次数满</small>
              <el-input style="width: 300px;" size="small" v-model="form.discount" type="number">
                <template #append>
                  %
                </template>
              </el-input>
            </div>
            <p class="text-rose-300 text-xs">折扣率单位为百分比，如输入90，表示该会员等级的用户可以以商品原价的90%购买</p>
          </div>
        </el-form-item>
      </el-form>
    </FormDrawer>

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
  getData,
  form: {
    name: "", // 等级名称
    level: 0, // 等级权重
    status: 1,  // 0 禁用 1启用
    discount: 0,  // 折扣率
    max_price: 0,  // 累计消费金额
    max_times: 0  // 累计消费次数
  },
  create: addUserLevel,
  update: upateUserLevel
});


</script>

<style lang="scss" scoped>
</style>