<template>
  <div v-for="(item,index) in item.goodsSkusCardValue" :key="index">
    {{item.text}}
  </div>
</template>

<script setup>
import { initSkusCardItem } from '~/composables/useSkus.js'

const props = defineProps({
  skuCardId: [Number, String]
})

const { item } = initSkusCardItem(props.skuCardId);
</script>

<style lang="less" scoped>
</style>