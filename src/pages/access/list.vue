<template>
  <el-card shadow="never" class=" border-0">
    <ListHeader @refresh="getData"></ListHeader>
    <el-tree :data="dataList" :props="{label: 'name', children: 'child'}" v-loading="loading" node-key="id" :default-expanded-keys="defaultExpandedKeys">

    </el-tree>
  </el-card>
</template>

<script setup>
import ListHeader from '~/components/ListHeader.vue';
import { getRoleList } from '~/api/rule.js'
import { ref, reactive, onMounted, computed } from 'vue'
import { useInitTable } from '~/composables/useCommon.js';

const { loading, dataList, getData } = useInitTable({
  getList: getRoleList,
  onGetListSuccess: (res) => {
    dataList.value = res.list;
    defaultExpandedKeys.value = res.list.map(e => e.id);
  }
});

const defaultExpandedKeys = ref([]);

</script>

<style lang="less" scoped>
</style>