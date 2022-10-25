<template>
  <div>
    <FormDrawer ref="formDrawerRef" title="设置商品详情" @submit="handleSubmit" destroy-on-close>
      <el-form :model="form" label-width="80px">
        <el-form-item label="商品详情">
          <Editor v-model="form.content"></Editor>
        </el-form-item>
      </el-form>
    </FormDrawer>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import FormDrawer from '~/components/FormDrawer.vue';
import Editor from '~/components/Editor.vue';
import { updateGoods, readGoods } from '~/api/goods.js'
import { toast } from '~/composables/utils.js';

const emit = defineEmits(['reload'])

const formDrawerRef = ref(null);
const form = reactive({
  content: ""
});
const goodsId = ref(0);
const open = (row) => {
  goodsId.value = row.id;
  row.contentLoading = true;
  readGoods(goodsId.value).then(res => {
    form.content = res.content;
    formDrawerRef.value.open();
  }).finally(() => {
    row.contentLoading = false;
  })
}

const handleSubmit = () => {
  formDrawerRef.value.showLoading();
  updateGoods(goodsId.value, form).then(res => {
    console.log("response: ", res);
    toast('设置商品详情成功');
    formDrawerRef.value.close();
    emit('reload');
  }).finally(() => {
    formDrawerRef.value.hideLoading();
  })
}

defineExpose({
  open
});

</script>

<style lang="less" scoped>
</style>