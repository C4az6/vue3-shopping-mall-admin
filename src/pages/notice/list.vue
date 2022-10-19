<template>
  <div>
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <div class="flex items-center justify-between">
        <el-button type="primary" size="small" @click="create">新增</el-button>
        <el-tooltip class="box-item" effect="dark" content="刷新数据" placement="top">
          <el-icon @click="getData" class="cursor-pointer">
            <Refresh />
          </el-icon>
        </el-tooltip>
      </div>

      <div class="mt-4">
        <el-table :data="dataList" stripe style="width: 100%" v-loading="loading">
          <el-table-column prop="title" label="公告标题" />
          <el-table-column prop="create_time" label="发布时间" />
          <el-table-column align="center" prop="address" label="操作" width="200">
            <template #default="scope">
              <el-button type="primary" @click="handleEdit(scope.row)" text size="small">修改</el-button>

              <el-popconfirm width="200" title="是否要删除该公告?" confirmButtonText="确认" cancelButtonText="取消" @confirm="handleDelete(scope)">
                <template #reference>
                  <el-button type="primary" text size="small">删除</el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="mt-4 flex items-center justify-center">
        <el-pagination background layout="prev, pager, next" :current-page="currentPage" :page-size="limit" :total="totalCount" @current-change="getData" />
      </div>
    </el-card>

    <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
      <el-form ref="formRef" :model="form" :rules="rules">
        <el-form-item prop="title" label="公告标题">
          <el-input v-model.trim="form.title" placeholder="请输入公告标题">
          </el-input>
        </el-form-item>

        <el-form-item prop="content" label="公告内容">
          <el-input type="textarea" v-model.trim="form.content" placeholder="请输入公告内容">
          </el-input>

        </el-form-item>
      </el-form>
    </FormDrawer>
  </div>

</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { getNoticeList, createNotice, editNotice, removeNotice } from '~/api/notice.js';
import FormDrawer from '~/components/FormDrawer.vue'
import { toast } from '~/composables/utils.js'
import { useInitTable, useInitForm } from '~/composables/useCommon.js'

const { loading,
  dataList,
  currentPage,
  totalCount,
  limit,
  getData } = useInitTable({
    getList: getNoticeList
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
        title: [
          { required: true, message: "公告标题不能为空", trigger: "blur" },
        ],
        content: [
          { required: true, message: "公告内容不能为空", trigger: "blur" },
        ],
      },
      form: {
        title: "",
        content: ""
      },
      getData,
      update: editNotice,
      create: createNotice
    });



// 删除公告
const handleDelete = ({ row }) => {
  console.log('del notice', row.id);
  loading.value = true;
  removeNotice(row.id).then(res => {
    console.log("response: ", res);
    toast('删除成功');
    getData();
  }).finally(() => {
    loading.value = false;
  })
}


getData();
</script>

<style lang="less" scoped>
</style>

