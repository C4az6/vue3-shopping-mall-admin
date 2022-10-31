<template>
  <FormDrawer ref="formDrawerRef" title="推荐商品" @submit="handleConnect" confirmText="关联">
    <el-table :data="dataList" border stripe style="width: 100%;">
      <el-table-column prop="goods_id" label="ID" width="60">
      </el-table-column>

      <el-table-column label="商品封面" width="180">
        <template #default="{row}">
          <el-image :src="row.cover" fit="cover" lazy style="width:64px;height:64px;"></el-image>
        </template>
      </el-table-column>

      <el-table-column prop="name" label="商品名称" width="180">
      </el-table-column>

      <el-table-column label="操作">
        <template #default="{row}">
          <el-popconfirm title="是否要删除该记录?" confirm-button-text="确认" cancel-button-text="取消" @confirm="handleDelete(row)">
            <template #reference>
              <el-button type="primary" text size="small" :loading="row.loading">删除</el-button>
            </template>
          </el-popconfirm>

        </template>
      </el-table-column>

    </el-table>
  </FormDrawer>

  <ChooseGoods ref="ChooseGoodsRef"></ChooseGoods>
</template>

<script setup>
import { ref, reactive } from 'vue';
import FormDrawer from '~/components/FormDrawer.vue';
import ChooseGoods from '~/components/ChooseGoods.vue';
import { toast } from '~/composables/utils.js';
import {
  getCategoryGoodsList,
  deleteCategoryGoods,
  connectCategoryGoods
} from '~/api/category.js';

const ChooseGoodsRef = ref(null);
const formDrawerRef = ref(null);
const category_id = ref(0);
const dataList = ref([]);

const open = data => {
  category_id.value = data.id;
  // 父组件的推荐按钮增加loading状态
  data.goodsDrawerLoading = true;
  getData().then(() => {
    formDrawerRef.value.open()
  }).finally(() => {
    data.goodsDrawerLoading = false;
  })
}

const getData = () => {
  return getCategoryGoodsList(category_id.value).then(res => {
    dataList.value = res.map(o => {
      o.loading = false;
      return o;
    })
  })
}

const handleDelete = (row) => {
  row.loading = true;
  deleteCategoryGoods(row.id).then(res => {
    toast('删除成功~');
    getData();
  })
};


const handleConnect = () => {
  ChooseGoodsRef.value.open(ids => {
    console.log("选中的关联商品id: ", ids);
    formDrawerRef.value.showLoading();
    connectCategoryGoods({
      category_id: category_id.value,
      goods_ids: ids
    }).then(res => {
      getData();
      toast("商品关联成功~");
    }).finally(() => {
      formDrawerRef.value.hideLoading();
    })
  });
}

defineExpose({
  open
});
</script>

<style>
</style>