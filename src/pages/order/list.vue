<template>
  <div>
    <!-- tab栏部分 -->
    <el-tabs v-model="searchForm.tab" @tab-change="getData">
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

      <el-table :data="dataList" border v-loading="loading">
        <el-table-column label="商品" width="350">
          <template #default="{row}">
            <div class="flex text-xs">
              <span class="mr-8">
                <p>订单号:</p>
                <p>{{row.no}}</p>
              </span>
              <span>
                <p>下单时间:</p>
                <p>{{row.create_time}}</p>
              </span>
            </div>
            <div class="flex mt-2 items-center" v-for="(item,index) in row.order_items" :key="index">
              <el-image class="rounded" :src="item.goods_item?.cover ?? ''" lazy style="width:30px;height:30px;"></el-image>
              <p class="text-rose-500 ml-5">{{item.goods_item?.title ?? '暂无商品标题'}}</p>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="实付款" width="100" align="center" prop="total_price">
        </el-table-column>

        <el-table-column label="买家" width="100" align="center">
          <template #default="{row}">
            <p><small>{{row.user.username}}</small></p>
            <p><small>(用户ID: {{row.user_id}})</small></p>
          </template>
        </el-table-column>

        <el-table-column label="交易状态" align="center">
          <template #default="{row}">
            <div>
              付款状态：
              <el-tag size="small" v-if="row.payment_method == 'alipay'">支付宝支付</el-tag>
              <el-tag type="success" size="small" v-else-if="row.payment_method == 'wechat'">微信支付</el-tag>
              <el-tag type="info" size="small" v-else>未支付</el-tag>
            </div>

            <div>
              发货状态：
              <el-tag :type="row.ship_data ? 'success' : 'info'" size="small">{{row.ship_data ? '已发货' : '未发货'}}</el-tag>
            </div>

            <div>
              收货状态：
              <el-tag :type="row.ship_status == 'received' ? 'success' : 'info'" size="small">{{row.ship_status == 'received' ? '已收货' : '未收货'}}</el-tag>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center">
          <template #default="{row}">
            <el-button text size="small" type="primary">订单详情</el-button>
            <el-button v-if="searchForm.tab == 'noship'" text size="small" type="primary">订单发货</el-button>
            <el-button v-if="searchForm.tab == 'refunding'" text size="small" type="primary">同意退款</el-button>
            <el-button v-if="searchForm.tab == 'refunding'" text size="small" type="primary">拒绝退款</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="flex flex-1 justify-center mt-5">
        <el-pagination @current-change="getData" :currentPage="currentPage" layout="prev, pager, next" :total="totalCount" background>>
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