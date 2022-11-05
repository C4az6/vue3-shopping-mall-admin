<template>
  <div>
    <Panel></Panel>

    <el-card shadow="never" :body-style="{ padding: '20px' }">
      <Search @search="getData" :model="searchForm" @reset="resetSearchForm">
        <SearchItem label="时间选择">
          <el-radio-group v-model="searchForm.type" size="small">
            <el-radio-button label="all">全部</el-radio-button>
            <el-radio-button label="today">今天</el-radio-button>
            <el-radio-button label="yesterday">昨天</el-radio-button>
            <el-radio-button label="last7day">最近7天</el-radio-button>
          </el-radio-group>

        </SearchItem>

        <template #show>
          <SearchItem label="开始时间">
            <el-date-picker v-model="searchForm.starttime" type="date" placeholder="请输入开始时间" size="small" value-format="YYYY-MM-DD" />
          </SearchItem>

          <SearchItem label="结束时间">
            <el-date-picker v-model="searchForm.endtime" type="date" placeholder="请输入开始时间" size="small" value-format="YYYY-MM-DD" />
          </SearchItem>

          <SearchItem label="关键词">
            <el-input style="width:50%;" v-model="searchForm.keyword" placeholder="请输入关键词" size="small" clearable></el-input>
          </SearchItem>
        </template>
      </Search>

      <div class="mt-4">
        <el-table :data="dataList" stripe style="width: 100%" v-loading="loading">
          <el-table-column label="ID" prop="id" align="center">
          </el-table-column>
          <el-table-column label="头像" width="65">
            <template #default="{row}">
              <el-avatar :size="40" :src="row.avatar" @error="errorHandler">
                <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
              </el-avatar>
            </template>
          </el-table-column>
          <el-table-column label="用户信息" align="center" width="200">
            <template #default="{row}">
              <div class="text-xs">
                <p>用户: {{row.username || '暂无'}}</p>
                <p>昵称: {{row.nickname || '暂无'}}</p>
                <p>姓名: {{row.user_info.name || '暂无'}}</p>
                <p>手机: {{row.phone || '暂无'}}</p>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="推广用户数量" align="center" prop="share_num" />
          <el-table-column label="订单数量" align="center" prop="share_order_num" />
          <el-table-column label="订单金额" align="center" prop="order_price" />
          <el-table-column label="账户佣金" align="center" prop="commission" />
          <el-table-column label="已提现金额" align="center" prop="cash_out_price" />
          <el-table-column label="提现次数" align="center" prop="cash_out_time" />
          <el-table-column label="未提现金额" align="center" prop="no_cash_out_price" />

          <el-table-column align="center" label="操作" fixed="right" width="200">
            <template #default="scope">
              <div>
                <el-button type="primary" text size="small">推广人</el-button>
                <el-button type="primary" text size="small">推广订单</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="mt-4 flex items-center justify-center">
        <el-pagination background layout="prev, pager, next" :current-page="currentPage" :page-size="limit" :total="totalCount" @current-change="getData" />
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { getAgentStatistics, getAgentList } from '~/api/distribution';
import { ref, reactive } from 'vue';
import Panel from './panel.vue'

import { useInitTable } from '~/composables/useCommon.js'
import Search from '~/components/Search.vue';
import SearchItem from '~/components/SearchItem.vue';

const { loading,
  dataList,
  searchForm,
  currentPage,
  totalCount,
  limit,
  getData,
  resetSearchForm
} = useInitTable({
  searchForm: { keyword: "", type: "all", starttime: "", endtime: "" },
  getList: getAgentList, onGetListSuccess: res => {
    dataList.value = res.list;
    totalCount.value = res.totalCount;
  },
});


const errorHandler = () => true

</script>

<style>
</style>