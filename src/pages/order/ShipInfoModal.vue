<template>
  <div>
    <el-drawer title="物流信息" v-model="dialogVisible" size="40%">
      <el-card shadow="never" class="border-0 mb-3">
        <div class="flex items-center">
          <el-image :src="info.logo" fit="cover" style="width:60px;height:60px;" class="rounded border" lazy></el-image>
          <div class="ml-3 text-sm">
            <p>物流公司: {{info.typename}}</p>
            <p class="mt-3">物流单号: {{info.number}}</p>
          </div>
        </div>
      </el-card>

      <el-card shadow="never" class="border-0 border-t">
        <el-timeline class="ml-[-40px]">
          <el-timeline-item v-for="(item, index) in info.list" placement="top" :key="index" :timestamp="item.time">
            {{item.status}}
          </el-timeline-item>
        </el-timeline>

      </el-card>

    </el-drawer>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { getShipInfo } from '~/api/order'
import { toast } from '~/composables/utils.js'

const dialogVisible = ref(false);
const info = ref({});
const open = id => {
  return getShipInfo(id).then(res => {
    if (res.status != 0) {
      // 订单异常情况
      return toast(res.msg, 'error');
    }
    info.value = res.result;
    console.log("order ship info: ", res.result);
    dialogVisible.value = true;
  })
}

defineExpose({
  open
});

</script>

<style>
</style>