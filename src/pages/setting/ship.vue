<template>
  <div v-loading="loading" class="bg-white p-4 rounded">
    <el-card shadow="never" class="border-0">
      <el-form :model="form" label-width="160px">
        <el-form-item label="物流查询key">
          <el-input v-model="form.ship" placeholder="请输入物流查询key"></el-input>
          <small class="text-rose-500 ml-3">用于查询物流信息，接口申请（仅供参考）</small>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" size="small" @click="save">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>

  </div>
</template>

<script setup>
import {
  getSysConfig,
  setSysConfig,
} from '~/api/sysconfig'
import { ref, reactive, onMounted } from 'vue';
import { toast } from '~/composables/utils.js'

const loading = ref(false);
const form = reactive({
  ship: ""
});

function getData() {
  loading.value = true;
  getSysConfig().then(res => {
    for (const key in form) {
      form[key] = res[key];
    }
  }).finally(() => {
    loading.value = false;
  })
}

function save() {
  loading.value = true;
  setSysConfig(form).then(res => {
    toast('保存成功')
    getData();
  }).finally(() => {
    loading.value = false;
  })
}

</script>

<style>
</style>