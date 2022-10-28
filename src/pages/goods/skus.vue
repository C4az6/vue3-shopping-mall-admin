<template>
  <div>
    <FormDrawer ref="formDrawerRef" title="设置商品规格" @submit="handleSubmit" destroy-on-close size="70%">
      <el-form :model="form" label-width="80px">
        <el-form-item label="规格类型">
          <el-radio-group v-model="form.sku_type">
            <el-radio :label="0">
              单规格
            </el-radio>

            <el-radio :label="1">
              多规格
            </el-radio>
          </el-radio-group>
        </el-form-item>

        <template v-if="form.sku_type == 0">
          <el-form-item label="市场价格">
            <el-input v-model="form.sku_value.oprice" style="width: 35%">
              <template #append>
                元
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="销售价格">
            <el-input v-model="form.sku_value.pprice" style="width: 35%">
              <template #append>
                元
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="成本价格">
            <el-input v-model="form.sku_value.cprice" style="width: 35%">
              <template #append>
                元
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="销售重量">
            <el-input v-model="form.sku_value.weight" style="width: 35%">
              <template #append>
                公斤
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="商品体积">
            <el-input v-model="form.sku_value.volume" style="width: 35%">
              <template #append>
                立方米
              </template>
            </el-input>
          </el-form-item>
        </template>

        <template v-else>
          <SkuCard></SkuCard>
        </template>
      </el-form>
    </FormDrawer>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import FormDrawer from '~/components/FormDrawer.vue';
import { updateGoods, readGoods, updateGoodsSku } from '~/api/goods.js'
import { toast } from '~/composables/utils.js';
import SkuCard from './components/SkuCard.vue'
import { initSkuCardList, goodsId } from '~/composables/useSkus.js'

const emit = defineEmits(['reload'])

const formDrawerRef = ref(null);
const form = reactive({
  sku_type: 0,
  sku_value: {
    oprice: 0,
    pprice: 0,
    cprice: 0,
    weight: 0,
    volume: 0
  }
});

const open = (row) => {
  goodsId.value = row.id;
  row.skusLoading = true;
  readGoods(goodsId.value).then(res => {
    form.sku_type = res.sku_type;
    form.sku_value = res.sku_value || ({
      oprice: 0,
      pprice: 0,
      cprice: 0,
      weight: 0,
      volume: 0
    });
    initSkuCardList(res);

    formDrawerRef.value.open();
  }).finally(() => {
    row.skusLoading = false;
  })
}

const handleSubmit = () => {
  formDrawerRef.value.showLoading();
  updateGoodsSku(goodsId.value, form).then(res => {
    toast('更新商品规格成功');
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