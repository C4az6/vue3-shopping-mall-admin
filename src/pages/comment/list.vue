<template>
  <div>
    <el-card shadow="never" :body-style="{ padding: '20px' }">
      <Search v-model="searchForm" @search="getData" @reset="resetSearchForm">
        <SearchItem label="关键词">
          <el-input v-model="searchForm.title" placeholder="要搜索的商品" size="small" clearable></el-input>
        </SearchItem>
      </Search>

      <el-table :data="dataList" stripe default-expand-all v-loading="loading">
        <el-table-column type="expand">
          <template #default="{row}">
            <div class="flex pl-18">
              <el-avatar :size="50" :src="row.user.avatar" fit="fill" class="mr-3"></el-avatar>
              <div class="text-xs flex-1">
                <div class="flex items-center">
                  <h6 class="text-rose-500 mr-3">{{row.user.username}}</h6>
                  <small class="text-gray-500">{{row.review_time}}</small>
                  <el-button size="small" class="ml-auto" v-if="!row.textareaEdit && !row.extra.length" @click="openTextarea(row)">回复</el-button>
                </div>
                <div>
                  <h6 class="text-purple-500 my-3">{{row.review.data}}</h6>
                  <el-image style="width:100px;height:100px;" v-for="(img,index) in row.review.image" :key="index" :src="img" lazy class="rounded"></el-image>
                </div>

                <div v-if="row.textareaEdit">
                  <el-input v-model="textarea" placeholder="请输入评价内容" type="textarea" :row="2"></el-input>
                  <div class="py-2">
                    <el-button type="primary" size="small" @click="review(row)">回复</el-button>
                    <el-button size="small" @click="row.textareaEdit = false">取消</el-button>
                  </div>
                </div>
                <template v-else>
                  <div class="mt-3 p-3 bg-gray-100 rounded" v-for="(item,index) in row.extra" :key="index">
                    <h6 class="flex font-bold">
                      客服
                      <el-button type="info" size="small" class="ml-auto" @click="openTextarea(row,item.data)">修改</el-button>
                    </h6>
                    <p>{{item.data}}</p>
                  </div>
                </template>
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="ID" prop="id" width="50">
        </el-table-column>

        <el-table-column label="商品" width="300">
          <template #default="{row}">
            <div class="flex">
              <el-image style="width:50px;height:50px;" class="rounded mr-3" :src="row.goods_item.cover"></el-image>
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
            <el-switch :loading="row.statusLoading" v-model="row.status" :active-value="1" :inactive-value="0" @change="statusChange($event, row)">
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
import { toast } from '~/composables/utils.js'

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
  onGetListSuccess: res => {
    dataList.value = res.list.map(v => {
      v.statusLoading = false;
      v.textareaEdit = false;
      return v;
    });
    totalCount.value = res.totalCount;
  },
  searchForm: {
    title: ""
  },
  updateStatus: updateGoodsCommentStatus
});

const textarea = ref("");

const openTextarea = (row, data = "") => {
  textarea.value = data;
  row.textareaEdit = true;
}

const review = row => {
  console.log("row: ", row);
  if (!textarea.value) {
    return toast('回复内容不能为空', 'error')
  }

  reviewGoodsComment(row.id, textarea.value).then(res => {
    row.textareaEdit = false;
    toast('回复成功');
    getData();
  })
}

</script>
