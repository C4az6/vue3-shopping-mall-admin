<template>
  <el-card shadow="never" class=" border-0">
    <ListHeader @refresh="getData"></ListHeader>
    <el-tree :data="dataList" :props="{label: 'name', children: 'child'}" v-loading="loading" node-key="id" :default-expanded-keys="defaultExpandedKeys">
      <template #default="{node, data}">
        <div class="custom-tree-node">
          <el-tag size="small" :type="data.menu ? '' : 'info'">{{data.menu ? '菜单' : '权限'}}
          </el-tag>
          <el-icon v-if="data.icon" :size="16" class="ml-2">
            <component :is="data.icon"></component>
          </el-icon>
          <span>{{data.name}}</span>

          <div class="ml-auto">
            <el-switch :modelValue="status" :active-value="1" :inactive-value="0"></el-switch>

            <el-button text type="primary" size="small">修改</el-button>
            <el-button text type="primary" size="small">增加</el-button>
            <el-button text type="primary" size="small">删除</el-button>

          </div>
        </div>
      </template>
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
.custom-tree-node {
  display: flex;
  flex: 1;
  align-items: center;
  font-size: 14px;
  padding-right: 8px;
}

:deep(.el-tree-node__label) {
  display: flex;
  flex: 1;
}

:deep(.el-tree-node__content) {
  padding: 20px 0;
}
</style>