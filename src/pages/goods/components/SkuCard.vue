<template>
  <el-form-item label="规格选项">
    <el-card shadow="never" class="w-full mb-3">
      <template #header>
        <div class="flex items-center">
          <el-input placeholder="规格名称" style="width: 200px;">
            <template #append>
              <el-icon>
                <more></more>
              </el-icon>
            </template>
          </el-input>

          <!-- 小技巧: 让图标处于最右边就设置margin-left: auto; 处于最左边就设置 margin-right: auto -->
          <el-button class="ml-auto" size="small">
            <el-icon>
              <Top></Top>
            </el-icon>
          </el-button>
          <el-button size="small">
            <el-icon>
              <Bottom></Bottom>
            </el-icon>
          </el-button>
          <el-button size="small">
            <el-icon>
              <Delete></Delete>
            </el-icon>
          </el-button>

        </div>
      </template>

      <!-- 规格值相关内容 -->
      <SkuCardItem></SkuCardItem>
    </el-card>

    <el-button type="success" size="small">添加规格</el-button>

  </el-form-item>
</template>

<script setup>
import SkuCardItem from './SkuCardItem.vue'

</script>

<style lang="less" scoped>
::v-deep(.el-card__header) {
  @apply !p-2 bg-gray-50;
}
</style>


