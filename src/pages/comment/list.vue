<template>
  <div>
    <el-card shadow="never" :body-style="{ padding: '20px' }" v-loading="loading">
      <Search v-model="searchForm" @search="getData" @reset="resetSearchForm">
        <SearchItem label="关键词">
          <el-input v-model="searchForm.title" placeholder="要搜索的商品" size="small" clearable></el-input>
        </SearchItem>
      </Search>

      <el-table :data="dataList" stripe>
        <el-table-column label="ID" prop="id" width="50">
        </el-table-column>

        <el-table-column label="商品" width="300">
          <template #default="{row}">
            <div class="flex">
              <el-image style="width:50px;height:50px;" class="rounded mr-3" :src="row.goods_item.cover" lazy></el-image>
              <small>{{row.goods_item.title}}</small>
            </div>

          </template>
        </el-table-column>

        <el-table-column label="评价信息">
          <template #default="{row}">
            <small>用户: {{row?.user?.nickname ?? row.user.username}}</small>
            <div>
              <el-rate v-model="row.rating" disabled show-score text-color="#ff9900" score-template="{value} 分" />
            </div>

          </template>
        </el-table-column>

        <el-table-column label="评价时间" prop="review_time" align="center">
        </el-table-column>

        <el-table-column label="是否显示" align="center">
          <template #default="{row}">
            <el-switch v-model="row.status" :active-value="1" :inactive-value="0" @change="statusChange($event, row)">
            </el-switch>
          </template>
        </el-table-column>
      </el-table>

      <div class="flex mt-5 justify-center">
        <el-pagination :currentPage="currentPage" :pageSize="limit" layout="prev, pager, next" :total="totalCount" background @current-change="getData">
        </el-pagination>
      </div>

    </el-card>

  </div>
</template>

<script setup>
import Search from '~/components/Search.vue';
import SearchItem from '~/components/SearchItem.vue';
import { ref, reactive } from 'vue';
import { getGoodsComment, updateGoodsCommentStatus, reviewGoodsComment } from '~/api/comment.js'
import { useInitTable } from '~/composables/useCommon.js'

const {
  loading,
  dataList,
  searchForm,
  currentPage,
  totalCount,
  limit,
  resetSearchForm,
  getData,
  statusChange
} = useInitTable({
  getList: getGoodsComment,
  searchForm: {
    title: ""
  },
  updateStatus: updateGoodsCommentStatus
});



</script>

<style lang="less" scoped>
</style>