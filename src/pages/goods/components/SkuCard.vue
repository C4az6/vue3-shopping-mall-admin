<template>
  <el-form-item label="规格选项">
    <el-card shadow="never" class="w-full mb-3" v-for="(item,index) in sku_card_list" :key="item.id" v-loading="item.loading">
      <template #header>
        <div class="flex items-center">
          <el-input v-model="item.text" placeholder="规格名称" style="width: 200px;" @change="handleUpdate(item)">
            <template #append>
              <el-icon>
                <more></more>
              </el-icon>
            </template>
          </el-input>

          <!-- 小技巧: 让图标处于最右边就设置margin-left: auto; 处于最左边就设置 margin-right: auto -->
          <!-- 上移 -->
          <el-button class="ml-auto" size="small" @click="sortCard('up', index)" :disabled="index == 0">
            <el-icon>
              <Top></Top>
            </el-icon>
          </el-button>
          <!-- 下移 -->
          <el-button size="small" @click="sortCard('down', index)" :disabled="index == (sku_card_list.length-1)">
            <el-icon>
              <Bottom></Bottom>
            </el-icon>
          </el-button>

          <el-popconfirm width="200" title="是否要删除该规格选项?" confirmButtonText="确认" cancelButtonText="取消" @confirm="handleDelete(item)">
            <template #reference>
              <el-button size="small">
                <el-icon>
                  <Delete></Delete>
                </el-icon>
              </el-button>
            </template>
          </el-popconfirm>

        </div>
      </template>

      <!-- 规格值相关内容 -->
      <SkuCardItem :skuCardId="item.id"></SkuCardItem>
    </el-card>

    <el-button :loading="loading" type="success" size="small" @click="addSkuCardEvent">添加规格选项</el-button>
  </el-form-item>
</template>

<script setup>
import SkuCardItem from './SkuCardItem.vue'
import { sku_card_list, loading, addSkuCardEvent, handleUpdate, handleDelete, sortCard } from '~/composables/useSkus.js'

</script>

<style lang="less" scoped>
::v-deep(.el-card__header) {
  @apply !p-2 bg-gray-50;
}
</style>


