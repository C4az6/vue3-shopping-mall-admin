<template>
  <!-- 搜索 -->
  <el-form :model="model" label-width="80px">
    <el-row :gutter="20">
      <slot />

      <template v-if="showSearch">
        <slot name="show" />
      </template>

      <el-col :span="8" :offset="showSearch ? 0 : 8">
        <div class="flex items-center justify-center">
          <el-button size="small" type="primary" @click="$emit('search')">搜索</el-button>
          <el-button size="small" @click="$emit('reset')">重置</el-button>
          <el-button v-if="!!$slots.show" size="small" text type="warning" @click="showSearch = !showSearch">
            {{showSearch ? '收起' : '展开'}}
            <el-icon>
              <ArrowUp v-if="showSearch"></ArrowUp>
              <ArrowDown v-else></ArrowDown>
            </el-icon>
          </el-button>
        </div>
      </el-col>
    </el-row>

  </el-form>
</template>

<script setup>
import { ref, useSlots } from 'vue';
const showSearch = ref(false);

defineProps({
  model: Object
})

defineEmits(["search", "reset"]);

const slots = useSlots();

// 直接在模版中使用 $slots.xxx 来判断插槽是否存在就OK了。
// const hasShowSearch = ref(!!slots.show);

</script>

<style lang="less" scoped>
</style>