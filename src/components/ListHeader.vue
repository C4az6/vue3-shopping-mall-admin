<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <el-button type="primary" size="small" @click="$emit('create')">新增</el-button>
      <el-tooltip class="box-item" effect="dark" content="刷新数据" placement="top">
        <el-icon @click="$emit('refresh')" class="cursor-pointer">
          <Refresh />
        </el-icon>
      </el-tooltip>
    </div>
  </div>
</template>

<script setup>
defineEmits(["create", "refresh"]);
</script>

<style lang="less" scoped>
</style>