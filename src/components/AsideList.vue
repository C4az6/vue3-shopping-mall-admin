<template>
  <div class="aside-list" :class="{ 'active': active }">
    <span class="truncate">
      <slot></slot>
    </span>
    <el-button class="ml-auto px-1" text type="primary" size="small" @click="$emit('edit')">
      <el-icon :size="12">
        <Edit />
      </el-icon>
    </el-button>

    <el-button class="px-1" text type="primary" size="small" @click="$emit('delete')">
      <el-icon :size="12">
        <Close />
      </el-icon>
    </el-button>
  </div>
</template>

<script setup>
// 暴露参数
defineProps({
  active: {
    type: Boolean,
    default: false,
  },
});

// 暴露事件
defineEmits(["edit", "delete"]);
</script>

<style lang="less" scoped>
.aside-list {
  border-bottom: 1px solid #f4f4f4;
  @apply flex items-center p-3 text-sm text-gray-600 cursor-pointer;
  &:hover,
  &.active {
    @apply bg-blue-50;
  }
}
</style>
