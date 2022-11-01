<template>
  <div>
    <el-card shadow="never" :body-style="{ padding: '20px' }">
      <Search @search="getData" :model="searchForm" @reset="resetSearchForm">
        <SearchItem label="关键词">
          <el-input size="small" v-model="searchForm.keyword" placeholder="手机号/邮箱/会员昵称" clearable></el-input>
        </SearchItem>

        <template #show>
          <SearchItem label="会员等级">
            <el-select size="small" v-model="searchForm.user_level_id" placeholder="请选择会员等级" clearable>
              <el-option v-for="item in userLevel" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </SearchItem>
        </template>
      </Search>

      <ListHeader @create="create" @refresh="getData"></ListHeader>

      <div class="mt-4">
        <el-table :data="dataList" stripe style="width: 100%" v-loading="loading">
          <el-table-column label="会员">
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
          <el-table-column label="会员等级" align="center">
            <template #default="{row}">
              {{row?.user_level?.name ?? "-" }}
            </template>
          </el-table-column>
          <el-table-column label="登录注册" align="center">
            <template #default="{row}">
              注册时间: {{row.create_time}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="200">
            <template #default="scope">
              <div>
                <el-button type="primary" @click="handleEdit(scope.row)" text size="small">修改</el-button>
                <el-popconfirm width="200" title="是否要删除该会员?" confirmButtonText="确认" cancelButtonText="取消" @confirm="handleDelete(scope.row.id)">
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
          <el-input style="width: 50%" v-model="form.username"></el-input>
        </el-form-item>

        <el-form-item label="密码">
          <el-input style="width: 50%" v-model="form.password"></el-input>
        </el-form-item>

        <el-form-item label="昵称">
          <el-input style="width: 50%" v-model="form.nickname"></el-input>
        </el-form-item>

        <el-form-item label="头像">
          <ChooseImage v-model="form.avatar" />
        </el-form-item>

        <el-form-item label="会员等级">
          <el-select v-model="form.user_level_id" placeholder="请选择会员等级">
            <el-option v-for="(item) in userLevel" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>

        <el-form-item label="手机号">
          <el-input style="width: 50%" v-model="form.phone" type="number"></el-input>
        </el-form-item>

        <el-form-item label="邮箱">
          <el-input style="width: 50%" v-model="form.email"></el-input>
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
import { getUserList, updateUserStatus, createUser, updateUser, deleteUser } from '~/api/user.js';
import FormDrawer from '~/components/FormDrawer.vue'
import ChooseImage from '~/components/ChooseImage.vue'
import ListHeader from '~/components/ListHeader.vue';
import { useInitTable, useInitForm } from '~/composables/useCommon.js'
import Search from '~/components/Search.vue';
import SearchItem from '~/components/SearchItem.vue';

const userLevel = ref([]);
const { loading,
  dataList,
  searchForm,
  currentPage,
  totalCount,
  limit,
  getData,
  statusChange,
  resetSearchForm,
  handleDelete, } = useInitTable({
    searchForm: { keyword: "", user_level_id: null },
    getList: getUserList, onGetListSuccess: res => {
      dataList.value = res.list.map(item => {
        item.statusLoading = false;
        return item;
      })
      totalCount.value = res.totalCount;
      userLevel.value = res.user_level;
    },
    updateStatus: updateUserStatus,
    delete: deleteUser
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
      form: {
        username: "",   // 用户名
        password: "",   // 密码
        status: 1,    // 状态 0 禁用 1 开启
        nickname: "", // 昵称
        phone: "",    // 手机
        email: "",    // 邮箱
        user_level_id: "",  // 会员等级
        avatar: ""  // 头像
      },
      getData,
      update: updateUser,
      create: createUser
    });


const errorHandler = () => true

</script>

<style lang="less" scoped>
</style>