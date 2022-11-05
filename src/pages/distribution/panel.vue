<template>
  <div>
    <!-- el-row会把页面分成24分,el-col的span属性表示占据多少份 -->
    <el-row :gutter="20" class="mb-5">
      <template v-if="!loading">
        <el-col :span="6" v-for="i in 4" :key="i">
          <el-skeleton v-if="loading" style="width: 100%" animated loading>
            <template #template>
              <el-card shadow="hover" class="border-0">
                <template #header>
                  <div class="flex justify-between">
                    <el-skeleton-item variant="text" style="width: 50%" />
                  </div>
                </template>

                <span class="text-3xl font-bold text-gray-500">
                  <el-skeleton-item variant="h3" style="width: 80%" />
                </span>
              </el-card>
            </template>
          </el-skeleton>
        </el-col>
      </template>

      <el-col :span="6" :offset="0" v-for="(item,index) in list" :key="index">
        <el-card shadow="never">
          <div class="flex items-center">
            <el-icon class="text-white w-[40px] h-[40px] rounded-full flex items-center justify-center" :class="item.color" :size="20">
              <User v-if="index == 0"></User>
              <ShoppingCart v-else-if="index == 1"></ShoppingCart>
              <PriceTag v-else-if="index == 2"></PriceTag>
              <Timer v-else-if="index == 3"></Timer>
            </el-icon>

            <div class="ml-2">
              <h2 class="text-lg font-bold">{{item.value}}</h2>
              <small class="text-xs text-gray-400">{{item.label}}</small>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { getAgentStatistics } from '~/api/distribution';
import { ref, reactive } from 'vue';

const loading = ref(false);
const list = ref([]);   // 面板数据列表

// 获取面板数据
loading.value = true;
getAgentStatistics().then(res => {
  console.log("res: ", res);
  list.value = res.panels

}).finally(() => loading.value = false);

</script>

<style>
</style>