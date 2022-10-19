<template>
  <div>
    <el-drawer v-model="showDrawer" :title="title" direction="rtl" :close-on-click-modal="false" :size="size" :destroy-on-close="destroyOnClose">
      <div class="formDrawer">
        <div class="body">
          <slot></slot>
        </div>
        <div class="actions">
          <el-button type="primary" :loading="isLoading" @click="submit">{{
            confirmText
          }}</el-button>
          <el-button type="default" @click="close">取消</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";

const showDrawer = ref(false);
const isLoading = ref(false);

const props = defineProps({
  title: String,
  size: {
    type: String,
    default: "45%",
  },
  destroyOnClose: {
    type: Boolean,
    default: false,
  },
  confirmText: {
    type: String,
    default: "提交",
  },
});

const showLoading = () => (isLoading.value = true);
const hideLoading = () => (isLoading.value = false);

// 对外发射的事件
const emit = defineEmits(["submit"]);

// 打开抽屉弹窗
const open = () => (showDrawer.value = true);

// 关闭抽屉弹窗
const close = () => (showDrawer.value = false);

// 提交
const submit = () => emit("submit");

// 向父组件暴露以下方法
defineExpose({
  open,
  close,
  showLoading,
  hideLoading,
});
</script>

<style>
.formDrawer {
  width: 100%;
  height: 100%;
  position: relative;
  @apply flex flex-col;
}
.formDrawer .body {
  flex: 1;
  overflow-y: auto;
}

.formDrawer .actions {
  height: 50px;
  @apply mt-auto flex items-center;
}
</style>
