<template>
  <el-card shadow="never" class="border-0">
    <!-- 新增&刷新 -->
    <ListHeader @create="create" @refresh="getData"></ListHeader>

    <el-table :data="dataList" stripe v-loading="loading" style="width: 100%;">
      <el-table-column prop="name" label="角色名称" />

      <el-table-column prop="desc" label="角色描述" width="380" />

      <el-table-column label="状态" width="120">
        <template #default="{ row }">
          <el-switch v-model="row.status" :active-value="1" :inactive-value="0" :loading="row.statusLoading" :disabled="row.super == 1" @change="statusChange($event, row)">
          </el-switch>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="250px">
        <template #default="{ row }">
          <el-button type="primary" size="small" text @click="openSetRule(row)">权限配置</el-button>
          <el-button type="primary" size="small" text @click="handleEdit(row)">修改</el-button>
          <el-popconfirm title="是否要删除该公告" confirmButtonText="确认" cancelButtonText="取消" @confirm="handleDelete(row.id)">
            <template #reference>
              <el-button type="primary" size="small" text>删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <div class="flex items-center justify-center mt-5">
      <el-pagination background layout="prev, pager, next" :total="totalCount" :current-page="currentPage" :page-size="limit" @current-change="getData"></el-pagination>
    </div>

    <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
      <el-form :model="form" ref="formRef" :rules="rules" label-width="80px">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="form.name" placeholder="角色名称"></el-input>
        </el-form-item>

        <el-form-item label="角色描述" prop="desc">
          <el-input v-model="form.desc" placeholder="角色描述"></el-input>
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="0">
          </el-switch>
        </el-form-item>
      </el-form>
    </FormDrawer>

    <!-- 配置权限表单 -->
    <FormDrawer ref="setRuleFormDrawerRef" title="权限配置" @submit="handleSetRuleSubmit">
      <el-tree-v2 ref="elTreeRef" :check-strictly="checkStrictly" :default-expanded-keys="defaultExpandeKeys" :data="ruleList" :props="{label: 'name', children: 'child'}" show-checkbox :height="treeHeight" @check="handleTreeCheck">
        <template #default="{data}">
          <div class="flex items-center">
            <el-tag :type="data.menu ? '' : 'info'" size="small">
              {{data.menu ? '菜单' : '权限'}}
            </el-tag>
            <span class="ml-2 text-sm">{{data.name}}</span>
          </div>
        </template>
      </el-tree-v2>
    </FormDrawer>

  </el-card>

</template>

<script setup>
import { ref } from 'vue';
import ListHeader from '~/components/ListHeader.vue';
import { getRoleList, addRole, updateRole, deleteRole, updateRoleStatus, setRoleRules } from '~/api/role.js';
import { getRoleList as getRuleList } from '~/api/rule.js';
import { useInitTable, useInitForm } from '~/composables/useCommon.js';
import FormDrawer from '~/components/FormDrawer.vue';
import { toast } from '~/composables/utils.js'

const {
  dataList,
  loading,
  currentPage,
  totalCount,
  limit,
  getData,
  handleDelete,
  statusChange
} = useInitTable({
  getList: getRoleList,
  delete: deleteRole,
  updateStatus: updateRoleStatus
});

const {
  formDrawerRef,
  formRef,
  form,
  rules,
  drawerTitle,
  handleSubmit,
  create,
  handleEdit
} = useInitForm({
  form: {
    name: "",
    desc: "",
    status: 1
  },
  rule: {
    name: [
      {
        required: true,
        message: '角色名称不能为空',
        trigger: 'blue'
      }
    ]
  },
  getData,
  update: updateRole,
  create: addRole
});

// 配置权限表单的状态
const setRuleFormDrawerRef = ref(null);
const ruleList = ref([]);
const treeHeight = ref(0);
const roleId = ref(0);

const defaultExpandeKeys = ref([]);
const ruleIds = ref([]);
// 当前角色拥有的权限ID
const elTreeRef = ref(null);
const checkStrictly = ref(false)

const openSetRule = row => {
  console.log("row: ", row);
  roleId.value = row.id;
  treeHeight.value = window.innerHeight - 180;
  // 设置父子不互相关联
  checkStrictly.value = true;
  getRuleList().then(res => {
    ruleList.value = res.list;
    defaultExpandeKeys.value = res.list.map(e => e.id);
    setRuleFormDrawerRef.value.open();

    // 当前角色拥有的权限ID
    ruleIds.value = row.rules.map(e => e.id);
    setTimeout(() => {
      elTreeRef.value.setCheckedKeys(ruleIds.value);
      // 拿到数据之后设置父子互相关联,方面用户修改权限,但是不影响渲染
      checkStrictly.value = false;
    }, 150)

  })
};

const handleSetRuleSubmit = () => {
  setRuleFormDrawerRef.value.showLoading();
  setRoleRules(roleId.value, ruleIds.value).then(res => {
    toast('配置成功');
    getData();
    setRuleFormDrawerRef.value.close();
  }).finally(() => {
    setRuleFormDrawerRef.value.hideLoading();
  })
};

// rest剩余参数写法,把所有的参数都放在e变量中
const handleTreeCheck = (...e) => {
  console.log("e: ", e);
  /* 
    checkedKeys: 已经选中的值
    halfCheckedKeys: 半选中的值,也就是已选中值的父级的值
  */
  const { checkedKeys, halfCheckedKeys } = e[1];
  ruleIds.value = [...checkedKeys, ...halfCheckedKeys];
}

</script>

<style lang="less" scoped>
</style>