<template>
  <div>
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <div class="flex items-center justify-between">
        <el-button type="primary" size="small" @click="create">新增</el-button>
        <el-tooltip class="box-item" effect="dark" content="刷新数据" placement="top">
          <el-icon class="cursor-pointer">
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

              <el-popconfirm width="200" title="是否要删除该图片?" confirmButtonText="确认" cancelButtonText="取消" @confirm="handleDelete(scope)">
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

const loading = ref(false);
const dataList = ref([]);
const totalCount = ref(0);
const currentPage = ref(1);
const limit = ref(10);
const formDrawerRef = ref(null);
// 抽屉组件的标题
const drawerTitle = computed(() => editId.value ? '修改' : '新增');
const form = reactive({
  title: "",
  content: ""
});
const formRef = ref(null);
// 通过这个编辑ID状态来判断当前是新增还是编辑公告
const editId = ref(0);

const rules = {
  title: [
    { required: true, message: "公告标题不能为空", trigger: "blur" },
  ],
  content: [
    { required: true, message: "公告内容不能为空", trigger: "blur" },
  ],
};

// 重置表单数据
function resetForm(row = false) {
  console.log(!!formRef.value)
  // 清空表单验证
  if (formRef.value) formRef.value.clearValidate();
  if (row) {
    for (const key in form) {
      form[key] = row[key];
    }
  }
}

// 编辑公告
const handleEdit = (row) => {
  editId.value = row.id;
  resetForm(row);
  formDrawerRef.value.open();
}

// 新增提交
const handleSubmit = () => {
  // 表单验证
  formRef.value.validate(valid => {
    console.log(valid);
    if (!valid) return;
    formDrawerRef.value.showLoading();
    let promise = editId.value ? editNotice(editId.value, form) : createNotice(form);
    promise.then(res => {
      toast(drawerTitle.value + '成功');
      getData(editId.value ? false : 1);
      formDrawerRef.value.close();
    }).finally(() => {
      formDrawerRef.value.hideLoading();
    })
  })
}


// 新增公告
const create = () => {
  editId.value = 0;
  resetForm({
    title: "",
    content: ""
  })
  formDrawerRef.value.open()
};

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

// 获取数据
const getData = (p = null) => {
  // 处理当前页码发生改变
  if (typeof p == "number") {
    currentPage.value = p;
  }
  loading.value = true;
  getNoticeList(currentPage.value).then(res => {
    dataList.value = res.list;
    totalCount.value = res.totalCount;
  }).finally(() => {
    loading.value = false;
  })
}

getData();
</script>

<style lang="less" scoped>
</style>

