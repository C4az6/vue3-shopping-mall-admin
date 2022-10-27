<template>
  <div v-if="modelValue && preview">
    <el-image v-if="typeof modelValue == 'string'" class="w-[100px] h-[100px] rounded border mr-2" :src="modelValue" fit="cover" :lazy="true"></el-image>
    <div class="flex flex-wrap" v-else>
      <div class=" relative mx-1 mb-2 w-[100px] h-[100px]" v-for="(item, index) in modelValue" :key="index">
        <el-icon class=" absolute right-[5px] top-[5px] cursor-pointer bg-white rounded-full" style="z-index: 10;" @click="removeImage(item)">
          <CircleClose></CircleClose>
        </el-icon>
        <el-image class="w-[100px] h-[100px] rounded border mr-2" :src="item" fit="cover" :lazy="true"></el-image>
      </div>
    </div>
  </div>

  <div v-if="preview" class="choose-image-btn " @click="open">
    <el-icon :size="25" class="text-gray-500">
      <Plus />
    </el-icon>
  </div>

  <el-dialog title="选择图片" v-model="dialogVisible" width="80%" top="5vh">

    <el-container class=" bg-white rounded" style="height: 70vh">
      <el-header class="image-header">
        <el-button type="primary" size="small" @click="handleOpenCreate">新增图片分类</el-button>
        <el-button type="warning" size="small" @click="handleOpenUpload">上传图片</el-button>
      </el-header>
      <el-container>
        <ImageAside ref="ImageAsideRef" @change="handleAsideChange"></ImageAside>
        <ImageMain :limit="limit" ref="ImageMainRef" @choose="handleChoose" openChoose></ImageMain>
      </el-container>
    </el-container>

    <template #footer>
      <span>
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </span>
    </template>
  </el-dialog>

</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import ImageAside from '~/components/ImageAside.vue'
import ImageMain from '~/components/ImageMain.vue'
import { toast } from '~/composables/utils.js'
const dialogVisible = ref(false);
const ImageAsideRef = ref(null);
const ImageMainRef = ref(null);

const callbackFunction = ref(null);
const open = (callback = null) => {
  callbackFunction.value = callback;
  dialogVisible.value = true;
};
const close = () => dialogVisible.value = false;
const handleOpenCreate = () => ImageAsideRef.value.handleCreate();
const handleAsideChange = (image_class_id) => ImageMainRef.value.loadData(image_class_id);
const handleOpenUpload = () => ImageMainRef.value.openUploadFile();

const props = defineProps({
  modelValue: [String, Array],
  limit: {
    type: Number,
    default: 1
  },
  preview: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(["update:modelValue"])

let urls = [];
const handleChoose = e => {
  console.log("e: ", e);
  urls = e.map(item => item.url);
  console.log("urls: ", urls);
};

const handleSubmit = () => {
  let value = [];
  if (props.limit == 1) {
    value = urls[0];
  } else {
    value = props.preview ? [...props.modelValue, ...urls] : [...urls];
    if (value.length > props.limit) {
      let limit = props.preview ? (props.limit - props.modelValue.length) : props.limit;
      return toast(`最多还能选择${limit}张`)
    }
  }
  if (value && props.preview) emit("update:modelValue", value);
  if (!props.preview && typeof callbackFunction.value == "function") {
    callbackFunction.value(value);
  }
  close();
}

// 移除轮播图
const removeImage = (url) => emit('update:modelValue', props.modelValue.filter(e => e != url));

defineExpose({
  open
})

</script>

<style lang="less" scoped>
.image-header {
  border-bottom: 1px solid #eee;
  @apply flex items-center;
}

.choose-image-btn {
  @apply w-100px h-100px rounded border border-dashed flex justify-center items-center cursor-pointer hover:(bg-gray-100);
}
</style>