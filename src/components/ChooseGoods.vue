<template>
  <div>
    <el-dialog title="商品选择" v-model="dialogVisible" width="80%" destroy-on-close>

      <el-table ref="multipleTableRef" @selection-change="handleSelectionChange" :data="dataList" stripe style="width: 100%;" v-loading="loading" height="400">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="商品">
          <template #default="{row}">
            <div class="flex">
              <el-image class="mr-3 rounded" :src="row.cover" fit="cover" lazy style="width:50px;height:50px;"></el-image>
              <div class="flex-1">
                <p>{{row.title}}</p>
                <p class=" text-gray-400 text-xs mb-1">分类: {{row?.category?.name ?? "未分类"}}</p>
                <p class=" text-gray-400 text-xs">创建时间: {{row.create_time}}</p>
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="总库存" width="90" prop="stock" align="center"></el-table-column>

        <el-table-column label="价格(元)" width="200" align="center">
          <template #default="{row}">
            <span class=" text-rose-500">￥{{row.min_price}}</span>
            <el-divider direction="vertical"></el-divider>
            <span class="text-gray-500 text-xs">￥{{row.min_oprice}}</span>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="flex items-center justify-center mt-5">
        <el-pagination background layout="prev,pager,next" :total="totalCount" :current-page="currentPage" :page-size="limit" @current-change="getData"></el-pagination>
      </div>
      <template #footer>
        <span>
          <el-button @click="close">取消</el-button>
          <el-button type="primary" @click="submit">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { getGoodsList } from '~/api/goods.js';
import { useInitTable } from '~/composables/useCommon.js'

const {
  handleSelectionChange,
  multipleTableRef,
  searchForm,
  dataList,
  loading,
  currentPage,
  limit,
  totalCount,
  getData,
  multiSelectionIds
} = useInitTable({
  getList: getGoodsList,
  onGetListSuccess: res => {
    dataList.value = res.list;
    totalCount.value = res.totalCount;
  }
})

const dialogVisible = ref(null);
const callbackFunction = ref(null);

const open = callback => {
  callbackFunction.value = callback;
  dialogVisible.value = true;
}

const close = () => dialogVisible.value = false;

const submit = () => {
  if (typeof callbackFunction.value === 'function') {
    callbackFunction.value(multiSelectionIds.value);
  }
  close()
}

defineExpose({
  open
});

</script>

<style>
</style>