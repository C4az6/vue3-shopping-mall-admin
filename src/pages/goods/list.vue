<template>
  <div>
    <!-- 标签页 -->
    <el-tabs v-model="searchForm.tab" @tab-change="getData">
      <el-tab-pane v-for="(item, index) in tabbars" :key="index" :label="item.name" :name="item.key">
      </el-tab-pane>
    </el-tabs>

    <el-card shadow="never" :body-style="{ padding: '20px' }">
      <!-- 搜索 -->
      <el-form :model="searchForm" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="8" :offset="0">
            <el-form-item label="关键词">
              <el-input size="small" v-model="searchForm.title" placeholder="商品名称" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="8">
            <div class="flex items-center justify-center">
              <el-button size="small" type="primary" @click="getData">搜索</el-button>
              <el-button size="small" @click="resetSearchForm">重置</el-button>
            </div>
          </el-col>
        </el-row>

      </el-form>

      <!-- <div class="flex items-center justify-between">
      <el-button type="primary" size="small" @click="create">新增</el-button>
      <el-tooltip class="box-item" effect="dark" content="刷新数据" placement="top">
        <el-icon @click="getData" class="cursor-pointer">
          <Refresh />
        </el-icon>
      </el-tooltip>
    </div> -->

      <ListHeader @create="create" @refresh="getData"></ListHeader>

      <div class="mt-4">
        <el-table :data="dataList" stripe style="width: 100%" v-loading="loading">
          <el-table-column prop="title" label="商品" width="300">
            <template #default="{row}">
              <div class="flex">
                <el-image class="mr-3 rounded" :src="row.cover" fit="cover" :lazy="true" style="width:50px;height:50px;"></el-image>
                <div class="flex-1">
                  <p>{{row.title}}</p>
                  <div>
                    <span class="text-rose-500">${{row.min_price}}</span>
                    <el-divider direction="vertical"></el-divider>
                    <span class=" text-gray-500 text-xs">${{row.min_oprice}}</span>
                  </div>
                  <!-- row.category 如果是undefined 则会显示未分类 -->
                  <p class="text-gray-400 text-xs mb-1">分类: {{row.category?.name ?? '未分类'}}</p>
                  <p class="text-gray-400 text-xs">创建时间: {{row.create_time}}</p>
                </div>
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="sale_count" label="实际销量" width="90" align="center">
          </el-table-column>

          <el-table-column label="商品状态" width="100" align="center">
            <template #default="{row}">
              <el-tag :type="row.status ? 'success' : 'danger'" size="small">
                {{row.status ? '上架' : '仓库'}}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column label="审核状态" width="120" align="center" v-if="searchForm.tab !== 'delete'">
            <template #default="{row}">
              <div v-if="row.ischeck == 0">
                <el-button type="success" size="small" plain>审核通过</el-button>
                <el-button class="mt-3 !ml-0" type="danger" size="small" plain>审核拒绝</el-button>
              </div>
              <span v-else>{{row.ischeck == 1 ? '通过' : '拒绝'}}</span>
            </template>
          </el-table-column>

          <el-table-column prop="stock" label="总库存" width="90" align="center">
          </el-table-column>

          <el-table-column align="center" prop="address" label="操作">
            <template #default="scope">
              <div v-if="searchForm.tab !== 'delete'">
                <el-button class="px-1" type="primary" text size="small">修改</el-button>
                <el-button class="px-1" type="primary" text size="small">商品规格</el-button>
                <el-button class="px-1" type="primary" text size="small">设置轮播图</el-button>
                <el-button class="px-1" type="primary" text size="small">商品详情</el-button>

                <el-popconfirm width="200" title="是否要删除该商品?" confirmButtonText="确认" cancelButtonText="取消" @confirm="handleDelete(scope)">
                  <template #reference>
                    <el-button type="primary" text size="small">删除</el-button>
                  </template>
                </el-popconfirm>
              </div>
              <span v-else>暂无操作</span>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="mt-4 flex items-center justify-center">
        <el-pagination background layout="prev, pager, next" :current-page="currentPage" :page-size="limit" :total="totalCount" @current-change="getData" />
      </div>
    </el-card>

    <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
      <el-form :model="form" ref="formRef" :rules="rules" label-width="auto">
        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>

        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>

        <el-form-item label="头像">
          <ChooseImage v-model="form.avatar" />
        </el-form-item>

        <el-form-item label="所属管理员">
          <el-select v-model="form.role_id" placeholder="请选择所属管理员">
            <el-option v-for="(item, index) in roles" :key="index" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="0">
          </el-switch>
        </el-form-item>
      </el-form>

    </FormDrawer>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { getGoodsList, updateGoodsStatus, createGoods, updateGoods, deleteGoods } from '~/api/goods.js';
import FormDrawer from '~/components/FormDrawer.vue'
import ChooseImage from '~/components/ChooseImage.vue'
import ListHeader from '~/components/ListHeader.vue';
import { useInitTable } from '~/composables/useCommon.js'
import { useInitForm } from '~/composables/useCommon.js';



const { loading,
  dataList,
  searchForm,
  currentPage,
  totalCount,
  limit,
  getData,
  statusChange,
  handleDelete, } = useInitTable({
    searchForm: { title: "", tab: "all", category_id: null },
    getList: getGoodsList, onGetListSuccess: res => {
      dataList.value = res.list.map(item => {
        item.statusLoading = false;
        return item;
      })
      totalCount.value = res.totalCount;
    },
    updateStatus: updateGoodsStatus,
    delete: deleteGoods
  });


const { formDrawerRef,
  formRef,
  form,
  editId,
  rules,
  drawerTitle,
  handleSubmit,
  resetForm,
  handleEdit,
  create } = useInitForm(
    {
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
        role_id: [{
          required: true,
          message: '请选择管理员所属角色',
          trigger: 'change',
        }],
        status: [],
        avatar: []
      },
      form: {
        username: "",
        password: "",
        role_id: null,
        status: 1,
        avatar: ""
      },
      getData,
      update: updateGoods,
      create: createGoods
    });


const errorHandler = () => true

const tabbars = [
  {
    key: 'all',
    name: "全部"
  },
  {
    key: 'checking',
    name: "审核"
  },
  {
    key: "saling",
    name: "出售中"
  },
  {
    key: "off",
    name: "已下架"
  },
  {
    key: "min_stock",
    name: "库存预警"
  },
  {
    key: "delete",
    name: "回收站"
  }
]


</script>

<style lang="less" scoped>
</style>