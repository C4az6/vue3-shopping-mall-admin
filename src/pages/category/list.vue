<template>
  <div>
    <el-card shadow="never" class="border-0">
      <ListHeader @create="handleCreate" @refresh="getData"></ListHeader>
    </el-card>

    <el-tree :data="dataList" :props="{label: 'name',children: 'child'}" v-loading="loading" node-key="id">
      <template #default="{data}">
        <div class="custom-tree-node">
          <span class="!w-100">{{data.name}}</span>

          <div class="ml-auto">
            <el-button class="mr-2" type="primary" size="small" text :loading="data.goodsDrawerLoading">推荐商品</el-button>
            <el-switch class="mr-2" v-model="data.status" :active-value="1" :inactive-value="0" @change="statusChange($event, data)">
            </el-switch>
            <el-button class="mr-2" type="primary" size="small" text @click.stop="handleEdit(data)">修改</el-button>

            <el-popconfirm title="是否要删除该记录?" confirm-button-text="确认" cancel-button-text="取消" @confirm="handleDelete(data.id)">
              <template #reference>
                <el-button text type="primary" size="small">删除</el-button>
              </template>
            </el-popconfirm>

          </div>
        </div>
      </template>
    </el-tree>

  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import ListHeader from '~/components/ListHeader.vue'
import { getCategoryList, addCategory, updateCategory, deleteCategory, updateCategoryStatus } from '~/api/category.js'
import {
  useInitTable,
  useInitForm
} from '~/composables/useCommon.js';

const {
  loading,
  dataList,
  getData,
  handleDelete,
  statusChange
} = useInitTable({
  getList: getCategoryList,
  onGetListSuccess: response => {
    dataList.value = response.map(item => {
      // handleDelete(item.id);
      item.goodsDrawerLoading = false;
      return item;
    })
  },
  delete: deleteCategory,
  updateStatus: updateCategoryStatus
});


const { } = useInitForm();



</script>

<style lang="less">
.custom-tree-node {
  display: flex;
  flex: 1;
  align-items: center;
  font-size: 14px;
  padding-right: 8px;
}

.el-tree-node__label {
  flex: 1;
}

.el-tree-node__content {
  padding: 20px 0;
}
</style>