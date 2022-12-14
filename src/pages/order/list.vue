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
            <el-date-picker v-model="searchForm.starttime" type="date" placeholder="请输入开始时间" size="small" value-format="YYYY-MM-DD" />
          </SearchItem>

          <SearchItem label="结束时间">
            <el-date-picker v-model="searchForm.endtime" type="date" placeholder="请输入开始时间" size="small" value-format="YYYY-MM-DD" />
          </SearchItem>
        </template>
      </Search>

      <ListHeader class="mt-3" layout="delete,refresh,export" @refresh="getData" @delete="handleMultiDelete" @export="handleExportExcel">

      </ListHeader>

      <el-table ref="multipleTableRef" @selection-change="handleSelectionChange" :data="dataList" border v-loading="loading">
        <el-table-column type="selection" width="55" />
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
            <el-button text size="small" type="primary" @click="openInfoModal(row)">订单详情</el-button>
            <el-button v-if="searchForm.tab == 'noship'" text size="small" type="primary" @click="openOrderShip(row)">订单发货</el-button>
            <el-button v-if="searchForm.tab == 'refunding'" text size="small" type="primary" @click="handleRefundClick(row,1)">同意退款</el-button>
            <el-button v-if="searchForm.tab == 'refunding'" text size="small" type="primary" @click="handleRefundClick(row,0)">拒绝退款</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="flex flex-1 justify-center mt-5">
        <el-pagination @current-change="getData" :currentPage="currentPage" layout="prev, pager, next" :total="totalCount" background>>
        </el-pagination>
      </div>
    </el-card>

    <ExportExcel :tabs="tabList" ref="ExportExcelRef"></ExportExcel>
    <InfoModal ref="InfoModalRef" :info="info"></InfoModal>
    <OrderShip ref="OrderShipRef"></OrderShip>

  </div>
</template>

<script setup>
import { ref, reactive, computed, registerRuntimeCompiler } from 'vue';
import Search from '~/components/Search.vue';
import SearchItem from '~/components/SearchItem.vue';
import ListHeader from '~/components/ListHeader.vue';
import { useInitTable } from '~/composables/useCommon.js';
import { getOrderList, deleteOrder, handleRefund } from '~/api/order.js'
import ExportExcel from './ExportExcel.vue'
import InfoModal from './InfoModal.vue'
import OrderShip from './OrderShip.vue'
import { showModal, showPrompt } from '~/composables/utils.js'

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

// 导出excel
const ExportExcelRef = ref(null);
const handleExportExcel = () => {
  ExportExcelRef.value.open();
};

// 订单详情
const InfoModalRef = ref(null);
const info = ref(null);

const OrderShipRef = ref(null);
const openOrderShip = row => {
  OrderShipRef.value.open(row.id);
}

const openInfoModal = row => {
  console.log("row: ", row);
  row.order_items = row.order_items.map(v => {
    // 处理多规格SKU的情况
    if (v.skus_type == 1 && v.goods_skus) {
      let s = [];
      for (const k in v.goods_skus.skus) {
        console.log("k: ", k);
        s.push(v.goods_skus.skus[k].value);
      }
      v.sku = s.join(',');
    }
    return v;
  })
  info.value = row;
  InfoModalRef.value.open();
}

const handleRefundClick = (row, agree) => {
  (agree ? showModal('是否同意该订单退款?') : showPrompt('请输入拒绝的理由')).then(({ value }) => {
    let data = { agree }
    if (!agree) {
      data.disagree_reason = value;
    }
    handleRefund(row.id, data).then(res => {
      getList();
      toast('操作成功');
    })
  })
}

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