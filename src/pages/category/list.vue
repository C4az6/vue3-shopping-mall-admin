<template>
  <div>
    <el-card shadow="never" class="border-0" :body-style="{ padding: '20px' }">
      <ListHeader @create="create" @refresh="getData"></ListHeader>

      <el-tree :data="dataList" :props="{label: 'name',children: 'child'}" v-loading="loading" node-key="id">
        <template #default="{data}">
          <div class="custom-tree-node">
            <span class="!w-100">{{data.name}}</span>

            <div class="ml-auto">
              <el-button class="mr-2" type="primary" size="small" text :loading="data.goodsDrawerLoading" @click="openGoodsDrawer(data)">推荐商品</el-button>
              <el-switch class="mr-2" v-loading="data.statusLoading" v-model="data.status" :active-value="1" :inactive-value="0" @change="statusChange($event, data)">
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

      <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
        <el-form :model="form" ref="formRef" :rules="rules" label-width="80px">
          <el-form-item label="分类名称" prop="name">
            <el-input v-model="form.name" placeholder="分类名称"></el-input>
          </el-form-item>
        </el-form>
      </FormDrawer>

      <GoodsDrawer ref="goodsDrawerRef"></GoodsDrawer>

    </el-card>

  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue';
import ListHeader from '~/components/ListHeader.vue'
import { getCategoryList, addCategory, updateCategory, deleteCategory, updateCategoryStatus } from '~/api/category.js'
import FormDrawer from '~/components/FormDrawer.vue';
import {
  useInitTable,
  useInitForm
} from '~/composables/useCommon.js';
import GoodsDrawer from './components/GoodsDrawer.vue';

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
      item.goodsDrawerLoading = false;
      return item;
    })
  },
  delete: deleteCategory,
  updateStatus: updateCategoryStatus
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
    name: ""
  },
  rules: {},
  getData,
  update: updateCategory,
  create: addCategory
});

const goodsDrawerRef = ref(null);

const openGoodsDrawer = (data) => {
  goodsDrawerRef.value.open(data);
};



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