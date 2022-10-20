<template>
  <el-card shadow="never" class=" border-0">
    <ListHeader @create="create" @refresh="getData"></ListHeader>
    <el-tree :data="dataList" :props="{label: 'name', children: 'child'}" v-loading="loading" node-key="id" :default-expanded-keys="defaultExpandedKeys">
      <template #default="{data}">
        <div class="custom-tree-node">
          <el-tag size="small" :type="data.menu ? '' : 'info'">{{data.menu ? '菜单' : '权限'}}
          </el-tag>
          <el-icon v-if="data.icon" :size="16" class="ml-2">
            <component :is="data.icon"></component>
          </el-icon>
          <span>{{data.name}}</span>

          <div class="ml-auto">
            <el-switch :modelValue="data.status" :active-value="1" :inactive-value="0"></el-switch>

            <el-button text type="primary" size="small">修改</el-button>
            <el-button text type="primary" size="small">增加</el-button>
            <el-button text type="primary" size="small">删除</el-button>
          </div>
        </div>
      </template>
    </el-tree>
    <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
      <el-form :model="form" ref="formRef" :rules="rules" label-width="80px">
        <el-form-item label="上级菜单" prop="rule_id">
          <el-cascader :options="options" v-model="form.rule_id" :props="{ value: 'id', label: 'name', children: 'child', checkStrictly: true, emitPath: false }" placeholder="请选择上级菜单">
          </el-cascader>
        </el-form-item>
        <el-form-item label="菜单/规则" prop="menu">
          <el-radio-group v-model="form.menu">
            <el-radio :label="1" border>菜单</el-radio>
            <el-radio :label="0" border>规则</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="名称" style="width: 30%"></el-input>
        </el-form-item>

        <el-form-item label="菜单图标" prop="icon" v-if="form.menu == 1">
          <IconSelect v-model="form.icon"></IconSelect>
        </el-form-item>

        <el-form-item label="前端路由" prop="frontpath" v-if="form.menu == 1 && form.rule_id > 0">
          <el-input v-model="form.frontpath"></el-input>
        </el-form-item>

        <el-form-item label="后端规则" prop="condition" v-if="form.menu == 0">
          <el-input v-model="form.condition"></el-input>
        </el-form-item>

        <el-form-item label="请求方式" prop="method" v-if="form.menu == 0">
          <el-select v-model="form.method" placeholder="请选择请求方式" class="m-2">
            <el-option v-for="item in ['GET','POST','PUT','DELETE']" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>

        </el-form-item>

        <el-form-item label="排序" prop="order">
          <el-input-number v-model="form.order" :min="0" :max="1000"></el-input-number>
        </el-form-item>

        <el-form-item label="上级菜单" prop="rule_id">
          <el-input v-model="form.rule_id"></el-input>
        </el-form-item>
      </el-form>
    </FormDrawer>

  </el-card>
</template>

<script setup>
import ListHeader from '~/components/ListHeader.vue';
import IconSelect from '~/components/IconSelect.vue';
import { ref } from 'vue';
import { useInitTable, useInitForm } from '~/composables/useCommon.js';
import { getRoleList, addRule, updateRule, removeRule } from '~/api/rule.js';
import FormDrawer from '~/components/FormDrawer.vue';

const options = ref([]);
const defaultExpandedKeys = ref([]);

const { loading, dataList, getData } = useInitTable({
  getList: getRoleList,
  onGetListSuccess: (res) => {
    options.value = res.rules;
    dataList.value = res.list;
    defaultExpandedKeys.value = res.list.map(e => e.id);
  }
});

const { formDrawerRef, fromRef, form, rules, drawerTitle, handleSubmit, create, handleEdit } = useInitForm({
  form: {
    rule_id: 0,
    menu: 0,
    name: "",
    condition: "",
    method: 'GET',
    status: 1,
    order: 50,
    icon: "",
    frontpath: ""
  },
  rules: {},
  getData,
  update: updateRule,
  create: addRule
});


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