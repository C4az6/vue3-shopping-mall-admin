<template>
  <el-drawer title="设置轮播图" v-model="dialogVisible" size="50%" destroy-on-close>
    <el-form :model="form" label-width="80px">
      <el-form-item label="轮播图">
        <ChooseImage :limit="9" v-model="form.banners"></ChooseImage>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit" :loading="loading">提交</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script setup>
import { ref, reactive } from 'vue';
import ChooseImage from '~/components/ChooseImage.vue'
import { readGoods, setGoodsBanner } from '~/api/goods';
import { toast } from '~/composables/utils.js';

const emit = defineEmits(["reloadData"])

const dialogVisible = ref(false);

const form = reactive({
  banners: []
})
const loading = ref(false);

const submit = () => {
  loading.value = true;
  setGoodsBanner(goodsId.value, form).then(res => {
    console.log("res: ", res);
    toast('设置轮播图成功');
    dialogVisible.value = false;
    emit("reloadData");
  }).finally(() => {
    loading.value = false;
  })
}

const goodsId = ref(0);
const open = (row) => {
  goodsId.value = row.id;
  dialogVisible.value = true;
  row.bannersLoading = true;
  readGoods(goodsId.value).then(res => {
    form.banners = res.goodsBanner.map(item => item.url);
  }).finally(() => {
    row.bannersLoading = false;
  })

};

defineExpose({
  open
});


</script>

<style lang="less" scoped>
</style>