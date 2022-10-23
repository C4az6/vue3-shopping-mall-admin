<template>
  <el-card shadow="never" class="border-0">
    <!-- 新增&刷新 -->
    <ListHeader @create="handleCreate" @refresh="getData"></ListHeader>

    <el-table :data="dataList" stripe style="width: 100%" v-loading="loading">
      <el-table-column label="优惠券名称" width="350">
        <template #default="{row}">
          <div class="border border-dashed py-2 px-4 rounded">
            <h5 class="font-bold text-md">{{row.name}}</h5>
            <small>{{row.start_time}} ~ {{row.end_time}}</small>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="statusText" label="状态"></el-table-column>
      <el-table-column label="优惠">
        <template #default="{row}">
          {{row.type ? "满减" : "折扣"}} {{row.type ? ("￥" + row.value) : (row.value + "折")}}
        </template>
      </el-table-column>
      <el-table-column prop="total" label="发放数量"></el-table-column>
      <el-table-column prop="used" label="已使用"></el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template #default="{row}">
          <el-button type="primary" size="small" text @click="handleEdit(row)">修改</el-button>
          <el-popconfirm title="是否要删除该优惠券?" confirmButtonText="确认" cancelButtonText="取消" @confirm="handleDelete(row.id)">
            <template #reference>
              <el-button type="primary" size="small" text>删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <div class="flex items-center justify-center mt-5">
      <el-pagination background layout="prev,pager,next" :total="totalCount" :current-page="currentPage" :page-size="limit" @current-change="getData"></el-pagination>
    </div>

  </el-card>

</template>

<script setup>
import ListHeader from '~/components/ListHeader.vue';
// import { } from "~/api/coupon.js";
import { useInitTable, useInitForm } from '~/composables/useCommon.js'



</script>

<style lang="less" scoped>
</style>