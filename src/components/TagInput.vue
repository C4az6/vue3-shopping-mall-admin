<template>
  <el-tag v-for="tag in tagList" :key="tag" class="mx-1" closable :disable-transitions="false" @close="handleClose(tag)">
    {{ tag }}
  </el-tag>
  <el-input v-if="inputVisible" ref="InputRef" v-model="inputValue" class="ml-1 w-20" size="small" @keyup.enter="handleInputConfirm" @blur="handleInputConfirm" />
  <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput">
    + 添加值
  </el-button>
</template>

<script lang="ts" setup>
import { nextTick, ref } from "vue";

const props = defineProps({
  modelValue: String,
});

const emit = defineEmits(["update:modelValue"]);

const inputValue = ref("");
const tagList = ref(props.modelValue ? props.modelValue.split(",") : []);
const inputVisible = ref(false);
const InputRef = ref(null);

// 关闭标签
const handleClose = (tag) => {
  tagList.value.splice(tagList.value.indexOf(tag), 1);
  emit("update:modelValue", tagList.value.join(","));
};

const showInput = () => {
  inputVisible.value = true;
  nextTick(() => {
    InputRef.value.input.focus();
  });
};

// 增加标签
const handleInputConfirm = () => {
  if (inputValue.value) {
    tagList.value.push(inputValue.value);
    emit("update:modelValue", tagList.value.join(","));
  }
  inputVisible.value = false;
  inputValue.value = "";
};
</script>