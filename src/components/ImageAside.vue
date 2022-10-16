<template>
  <el-aside width="220px" class="image-aside" v-loading="loading">
    <div class="top">
      <AsideList v-for="(item, index) in imageList" :key="index" :active="index === 0">{{ item.name }}</AsideList>
    </div>
    <div class="bottom">
      <el-pagination background layout="prev, next" :total="total" :current-page="currentPage" :page-size="limit" @current-change="getData" />
    </div>
  </el-aside>

  <FormDrawer title="新增" ref="formDrawerRef" @submit="handleSubmit">
    <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
      <el-form-item label="分类名称" prop="name">
        <el-input v-model.trim="form.name"></el-input>
      </el-form-item>
      <el-form-item label="排序">
        <el-input-number v-model="form.order" :min="0" :max="1000"></el-input-number>
      </el-form-item>
    </el-form>

  </FormDrawer>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import AsideList from "./AsideList.vue";
import { getImageClasList, createImageClasList } from "~/api/image_class.js";
import FormDrawer from '~/components/FormDrawer.vue';
import { toast } from '~/composables/utils.js'

// 表单
const form = reactive({
  // 相册名称
  name: "",
  // 排序规则
  order: 50
})

const rules = {
  name: [{ required: true, message: "图库分类名称不能为空", trigger: "blur" }]
}

// 加载动画
const loading = ref(false);

// 图库菜单列表数据
const imageList = ref([]);

// 分页状态
const currentPage = ref(1);
const total = ref(0);
const limit = ref(15);


const formDrawerRef = ref(null);
const formRef = ref(null);

const openFormDrawer = () => formDrawerRef.value.open();

const handleSubmit = () => {
  console.log("提交表单")
  formRef.value.validate((valid) => {
    if (!valid) return;
    formDrawerRef.value.showLoading();
    console.log('提交成功~');
    createImageClasList(form).then(res => {
      console.log("response: ", res);
      toast('新增成功', 'success');
      getData(1);
      // 关闭抽屉弹框
      formDrawerRef.value.close();
    }).finally(() => {
      formDrawerRef.value.hideLoading();
    })
  })
}

defineExpose({
  openFormDrawer
})

// 获取数据
function getData(p = null) {
  console.log(p)
  if (typeof p === 'number') {
    currentPage.value = p;
  }
  loading.value = true;
  getImageClasList(currentPage.value)
    .then((res) => {
      console.log("res: ", res);
      imageList.value = res.list;
      total.value = res.totalCount;
    })
    .finally(() => {
      loading.value = false;
    });
}

onMounted(() => {
  getData();
});
</script>

<style lang="less" scoped>
.image-aside {
  border-right: 1px solid #eee;
  position: relative;
  .top {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 50px;
    overflow-y: auto;
  }
  .bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    @apply flex justify-center items-center;
  }
}
</style>
