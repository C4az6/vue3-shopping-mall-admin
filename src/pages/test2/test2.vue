<template>
  <div>
    <el-button type="primary" size="default" @click="handleTest">test</el-button>

  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { getOrderList, deleteOrder } from '~/api/order.js';
import ListHeader from '~/components/ListHeader.vue';
import Search from '~/components/Search.vue';
import SearchItem from '~/components/SearchItem.vue';
import FormDrawer from '~/components/FormDrawer.vue';
import { useInitTable } from '~/composables/useCommon.js';

// const { } = useInitTable({});

const handleTest = () => {
  window.open("http://zhinksrm.zhink.cc:11018/cloud-srm/api-file/files-anon/download?fileuploadId=382835040409728/6efbe2f1cdea49bf4277216cbd5cbb6a");
}
</script>

<style lang="less" scoped>
</style>
