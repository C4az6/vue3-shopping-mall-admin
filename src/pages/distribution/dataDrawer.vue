<template>
  <el-drawer :title="drawerTitle" v-model="dialogVisible" size="70%">
    <el-form :model="searchForm" size="small">
      <el-form-item label="时间选择">
        <el-radio-group v-model="searchForm.type" size="small">
          <el-radio-button label="all">全部</el-radio-button>
          <el-radio-button label="today">今天</el-radio-button>
          <el-radio-button label="yesterday">昨天</el-radio-button>
          <el-radio-button label="last7day">最近7天</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="开始时间">
        <el-date-picker v-model="searchForm.starttime" type="date" placeholder="请输入开始时间" size="small" value-format="YYYY-MM-DD" />
      </el-form-item>

      <el-form-item label="结束时间">
        <el-date-picker v-model="searchForm.endtime" type="date" placeholder="请输入开始时间" size="small" value-format="YYYY-MM-DD" />
      </el-form-item>

      <el-form-item label="用户类型">
        <el-radio-group v-model="searchForm.level" size="small">
          <el-radio-button label="0">全部</el-radio-button>
          <el-radio-button label="1">一级推广</el-radio-button>
          <el-radio-button label="2">二级推广</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" size="small" @click="getData">搜索</el-button>
        <el-button size="small" @click="resetSearchForm">重置</el-button>
      </el-form-item>
    </el-form>

    <div class="mt-4">
      <el-table :data="dataList" stripe style="width: 100%" v-loading="loading">
        <template v-if="type == 'user'">
          <el-table-column label="ID" prop="id" align="center">
          </el-table-column>
          <el-table-column label="头像" width="65">
            <template #default="{row}">
              <el-avatar :size="40" :src="row.avatar">
              </el-avatar>
            </template>
          </el-table-column>
          <el-table-column label="用户信息" prop="username" align="center">
          </el-table-column>

          <el-table-column label="推广数" align="center" prop="share_num" />
          <el-table-column label="推广订单数量" align="center" prop="share_order_num" />
          <el-table-column label="绑定时间" align="center" prop="create_time" />
        </template>

        <template v-else>
          <el-table-column label="订单号">
            <template #default="{row}">
              {{row.order.no}}
            </template>
          </el-table-column>

          <el-table-column label="用户名|昵称|手机">
            <template #default="{row}">
              <div v-if="!row.order.user">
                该用户已被删除
              </div>

              <div v-else>
                {{row.order.user.username}} | {{row.order.user.nickname}}| {{row.order.user.phone}}
              </div>
            </template>
          </el-table-column>

          <el-table-column label="时间" prop="create_time">
          </el-table-column>

          <el-table-column label="返还佣金" prop="commission">
          </el-table-column>

        </template>
      </el-table>
    </div>

    <div class="mt-4 flex items-center justify-center">
      <el-pagination background layout="prev, pager, next" :current-page="currentPage" :page-size="limit" :total="totalCount" @current-change="getData" />
    </div>
  </el-drawer>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { getAgentStatistics, getAgentList, getAgentOrderList } from '~/api/distribution';
import { useInitTable } from '~/composables/useCommon.js'
import Search from '~/components/Search.vue';
import SearchItem from '~/components/SearchItem.vue';

const props = defineProps({
  type: {
    type: String,
    default: "user"
  }
})

const drawerTitle = computed(() => props.type == 'user' ? '推广人列表' : '推广订单列表')

const { loading,
  dataList,
  searchForm,
  currentPage,
  totalCount,
  limit,
  getData
} = useInitTable({
  searchForm: { type: "all", starttime: "", endtime: "", level: 0, user_id: 0 },
  getList: (props.type == 'user' ? getAgentList : getAgentOrderList),
  onGetListSuccess: res => {
    dataList.value = res.list;
    totalCount.value = res.totalCount;
  },
});


const dialogVisible = ref(false);
const open = (userid) => {
  dialogVisible.value = true
  searchForm.user_id = userid;
  getData();
};

const resetSearchForm = () => {
  searchForm.type = 'all';
  searchForm.starttime = null;
  searchForm.endtime = null;
  searchForm.level = 0;
}

const close = () => dialogVisible.value = false;


defineExpose({
  open
});


</script>

<style>
</style>