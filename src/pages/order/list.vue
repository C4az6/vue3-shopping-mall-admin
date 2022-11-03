<template>
  <div>
    <!-- tab栏部分 -->
    <el-tabs v-model="activeName" @tab-change="getData">
      <el-tab-pane v-for="(item,index) in tabList" :key="index" :label="item.label" :name="item.name"></el-tab-pane>
    </el-tabs>

    <el-card shadow="never" :body-style="{ padding: '20px' }">
      <Search @search="getData" @reset="resetSearchForm">
        <search-item label="订单编号">
          <el-input style="width:50%;" v-model="searchForm.no" placeholder="请输入订单编号" size="small" clearable></el-input>
        </search-item>

        <template #show>
          <SearchItem label="收货人">
            <el-input style="width:50%;" v-model="searchForm.name" placeholder="请输入收货人" size="small" clearable></el-input>
          </SearchItem>

          <SearchItem label="手机号">
            <el-input style="width:50%;" v-model="searchForm.phone" placeholder="请输入手机号" size="small" clearable></el-input>
          </SearchItem>

          <SearchItem label="开始时间">
            <el-date-picker v-model="searchForm.starttime" type="date" placeholder="请输入开始时间" size="small" />
          </SearchItem>

          <SearchItem label="结束时间">
            <el-date-picker v-model="searchForm.endtime" type="date" placeholder="请输入开始时间" size="small" />
          </SearchItem>
        </template>
      </Search>

      <ListHeader class="mt-3" layout="delete,refresh,export"></ListHeader>

      <el-table :data="dataList" border stripe>
        <el-table-column label="商品">
        </el-table-column>

        <el-table-column label="实付款">
        </el-table-column>

        <el-table-column label="买家">
        </el-table-column>

        <el-table-column label="交易状态">
        </el-table-column>

        <el-table-column label="操作">
        </el-table-column>
      </el-table>

      <div class="flex flex-1 justify-center mt-5">
        <el-pagination @current-change="getData" currentPage="currentPage" layout="prev, pager, next" :total="totalCount" background>>
        </el-pagination>
      </div>

    </el-card>

  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import Search from '~/components/Search.vue';
import SearchItem from '~/components/SearchItem.vue';
import ListHeader from '~/components/ListHeader.vue';
import { useInitTable } from '~/composables/useCommon.js';
import { getOrderList, deleteOrder } from '~/api/order.js'

const tabList = ref([
  {
    name: 'all',
    label: '全部'
  },
  {
    name: 'nopay',
    label: '待付款'
  },
  {
    name: 'noship',
    label: '待发货'
  },
  {
    name: 'shiped',
    label: '已发货'
  },
  {
    name: 'received',
    label: '已收货'
  },
  {
    name: 'finish',
    label: '已完成'
  },
  {
    name: 'closed',
    label: '已关闭'
  },
  {
    name: 'refunding',
    label: '退款中'
  },
]);
const activeName = ref("all");

const {
  loading,
  dataList,
  searchForm,
  resetSearchForm,
  currentPage,
  totalCount,
  limit,
  getData,
  statusChange,
  handleDelete,
  multipleTableRef,
  multiSelectionIds,
  handleSelectionChange,
  handleMultiDelete,
  handleMultiStatusChange
} = useInitTable({
  searchForm: {
    tab: "all",
    no: "",
    starttime: "",
    endtime: "",
    name: "",
    phone: ""
  },
  getList: getOrderList,
  delete: deleteOrder
});


</script>

<style>
</style>