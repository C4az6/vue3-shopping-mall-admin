<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <div>
        <el-button v-if="btns.includes('create')" type="primary" size="small" @click="$emit('create')">新增</el-button>

        <el-popconfirm v-if="btns.includes('delete')" title="是否要删除选中记录?" confirmButtonText="确认" cancelButtonText="取消" @confirm="$emit('delete')">
          <template #reference>
            <el-button type="primary" size="small">批量删除</el-button>
          </template>
        </el-popconfirm>
        <slot></slot>
      </div>

      <el-tooltip v-if="btns.includes('refresh')" class="box-item" effect="dark" content="刷新数据" placement="top">
        <el-icon @click="$emit('refresh')" class="cursor-pointer">
          <Refresh />
        </el-icon>
      </el-tooltip>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
  layout: {
    type: String,
    default: "create,refresh"
  }
})
const btns = computed(() => props.layout.split(","));

defineEmits(["create", "refresh"]);
</script>

<style lang="less" scoped>
</style>