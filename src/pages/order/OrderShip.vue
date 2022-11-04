<template>
  <div>
    <el-drawer title="订单发货" v-model="dialogVisible" size="40%">
      <el-form :model="form" ref="formRef" label-width="auto" v-loading="loading">
        <el-form-item label="快递公司">
          <el-select v-model="form.express_company" value-key="" placeholder="请选择快递公司" clearable>
            <el-option v-for="item in expressList" :key="item.id" :label="item.name" :value="item.name">
            </el-option>
          </el-select>

        </el-form-item>
        <el-form-item label="快递单号">
          <el-input v-model="form.express_no" placeholder="请输入快递单号" clearable style="width: 50%;"></el-input>

        </el-form-item>

        <el-button type="primary" :loading="btnLoading" @click="onSubmit">提交</el-button>
      </el-form>

    </el-drawer>

  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { getExpressCompanyList, orderShip } from '~/api/order';

const form = reactive({
  express_company: "",
  express_no: ""
});

const expressList = ref([]);
const loading = ref(false);
const btnLoading = ref(false);
const dialogVisible = ref(false);
const id = ref(null);

function getList() {
  loading.value = true;
  getExpressCompanyList().then(res => {
    expressList.value = res.list;
  }).finally(() => {
    loading.value = false;
  })
}


function onSubmit() {
  btnLoading.value = true;
  orderShip(id.value, form).then(res => {
    toast('发货成功~');
  }).finally(() => {
    btnLoading.value = false;
  })
};

function open(orderId) {
  id.value = orderId;
  dialogVisible.value = true;
  getList();
}

function close() {
  dialogVisible.value = false;
}

defineExpose({
  open
});
</script>

<style lang="scss" scoped>
</style>