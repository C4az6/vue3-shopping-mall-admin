<template>
  <el-card shadow="never" class="border-0">
    <!-- 新增&刷新 -->
    <ListHeader @create="create" @refresh="getData"></ListHeader>

    <el-table :data="dataList" stripe style="width: 100%" v-loading="loading">
      <el-table-column label="优惠券名称" width="350">
        <template #default="{row}">
          <div class="border border-dashed py-2 px-4 rounded" :class="row.statusText == '领取中' ? 'active' : 'inactive'">
            <h5 class="font-bold text-md">{{row.name}}</h5>
            <small>{{row.start_time}} ~ {{row.end_time}}</small>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="statusText" label="状态"></el-table-column>
      <el-table-column label="优惠">
        <template #default="{row}">
          {{row.type == 0 ? "满减" : "折扣"}} {{row.type == 0 ? ("￥" + row.value) : (row.value + "折")}}
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

    <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
      <el-form :model="form" ref="formRef" :rules="rules" label-width="80px">
        <el-form-item label="公告标题" prop="title">
          <el-input v-model="form.title" placeholder="公告标题"></el-input>
        </el-form-item>
        <el-form-item label="公告标题" prop="title">
          <el-input v-model="form.title" placeholder="公告标题"></el-input>
        </el-form-item>

        <el-form-item label="公告标题" prop="title">
          <el-input v-model="form.title" placeholder="公告标题"></el-input>
        </el-form-item>
      </el-form>
    </FormDrawer>

  </el-card>

</template>

<script setup>
import ListHeader from '~/components/ListHeader.vue';
import FormDrawer from '~/components/FormDrawer.vue';
import { getCouponList, addCoupon, updateCoupon, deleteCoupon, disableCoupon } from "~/api/coupon.js";
import { useInitTable, useInitForm } from '~/composables/useCommon.js'

// 转换优惠券状态
const formatStatus = row => {
  let s = '领取中';
  let start_time = (new Date(row.start_time)).getTime();
  let now = (new Date()).getTime();
  let end_time = (new Date(row.end_time)).getTime();
  if (start_time > now) {
    s = '未开始'
  } else if (end_time < now) {
    s = '已结束'
  } else if (row.status == 0) {
    s = '已失效'
  }
  return s;
}


const {
  dataList,
  loading,
  currentPage,
  totalCount,
  limit,
  getData,
  handleDelete
} = useInitTable({
  getList: getCouponList,
  onGetListSuccess: res => {
    // 转换优惠券状态
    dataList.value = res.list.map(item => {
      item.statusText = formatStatus(item);
      return item;
    })
    totalCount.value = res.totalCount;
  },
  delete: deleteCoupon
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
  form: {},
  rules: {},
  getData,
  update: updateCoupon,
  create: addCoupon
});

</script>

<style lang="less" scoped>
.active {
  @apply border-rose-200 bg-rose-50 text-red-400;
}

.inactive {
  @apply border-gray-200 bg-gray-50 text-gray-400;
}
</style>