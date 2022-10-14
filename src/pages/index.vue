<template>
  <div>
    <el-row :gutter="20">
      <el-col
        :span="6"
        :offset="0"
        v-for="(item, index) in panels"
        :key="index"
      >
        <el-card shadow="hover" class="border-0">
          <template #header>
            <div class="flex justify-between">
              <span class="text-sm">{{ item.title }}</span>
              <el-tag :type="item.unitColor" effect="dark">{{
                item.unit
              }}</el-tag>
            </div>
          </template>

          <span class="text-3xl font-bold text-gray-500">
            {{ item.value }}
          </span>
          <el-divider />

          <div class="flex justify-between text-sm text-gray-500">
            <span>{{ item.subTitle }}</span>
            <span>{{ item.subValue }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { getStatistics1 } from "~/api/index.js";
import { ref } from "vue";

const panels = ref([]);

getStatistics1().then((res) => {
  panels.value = res.panels;
});
</script>

<style></style>
