<template>
  <el-card shadow="never" :body-style="{ padding: '20px' }">
    <!-- 搜索 -->
    <el-form :model="searchForm" label-width="80px">
      <el-row :gutter="20">
        <el-col :span="8" :offset="0">
          <el-form-item label="关键词">
            <el-input size="small" v-model="searchForm.keyword" placeholder="管理员昵称" clearable></el-input>
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
        <el-table-column prop="title" label="管理员">
          <template #default="{row}">
            <div class="flex items-center">
              <el-avatar :size="40" :src="row.avatar" @error="errorHandler">
                <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
              </el-avatar>
              <div class="ml-4">
                <h6>{{row.username}}</h6>
                <small>ID: {{row.id}}</small>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="所属管理员" align="center">
          <template #default="{row}">
            {{row.role?.name ?? "-"}}
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="状态" align="center">
          <template #default="{row}">
            <div>
              <el-switch :loading="row.statusLoading" style="--el-switch-on-color: #4338ca;" :modelValue="row.status" :active-value="1" :inactive-value="0" :disabled="row.super == 1" @change="statusChange($event,row)"></el-switch>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="address" label="操作" width="200">
          <template #default="scope">
            <small class="text-sm text-gray-500" v-if="scope.row.super == 1">暂无操作</small>
            <div v-else>
              <el-button type="primary" @click="handleEdit(scope.row)" text size="small">修改</el-button>

              <el-popconfirm width="200" title="是否要删除该管理员?" confirmButtonText="确认" cancelButtonText="取消" @confirm="handleDelete(scope)">
                <template #reference>
                  <el-button type="primary" text size="small">删除</el-button>
                </template>
              </el-popconfirm>
            </div>
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
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { getManagerList, updateManagerStatus, createManager, updateManager, deleteManager } from '~/api/manager.js';
import FormDrawer from '~/components/FormDrawer.vue'
import ChooseImage from '~/components/ChooseImage.vue'
import ListHeader from '~/components/ListHeader.vue';
import { useInitTable } from '~/composables/useCommon.js'
import { useInitForm } from '~/composables/useCommon.js';

const roles = ref([]);
const { loading,
  dataList,
  searchForm,
  currentPage,
  totalCount,
  limit,
  getData,
  statusChange,
  handleDelete, } = useInitTable({
    searchForm: { keyword: "" },
    getList: getManagerList, onGetListSuccess: res => {
      console.log("callback res: ", res);
      dataList.value = res.list.map(item => {
        item.statusLoading = false;
        return item;
      })
      totalCount.value = res.totalCount;
      roles.value = res.roles;
    },
    updateStatus: updateManagerStatus,
    delete: deleteManager
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
      update: updateManager,
      create: createManager
    });


const errorHandler = () => true


onMounted(() => getData());

</script>

<style lang="less" scoped>
</style>