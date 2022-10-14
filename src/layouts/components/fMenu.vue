<template>
  <div class="f-menu" :style="{ width: $store.state.asideWidth }">
    <el-menu
      unique-opened
      :collapse="isCollapse"
      :default-active="defaultActive"
      class="border-0"
      @select="handleSelect"
      :collapse-transition="false"
    >
      <template v-for="(item, index) in asideMenus" :key="index">
        <el-sub-menu
          v-if="item.child && item.child.length > 0"
          :index="item.name"
        >
          <template #title>
            <el-icon>
              <!-- 动态组件,生成动态图标 -->
              <component :is="item.icon"></component>
            </el-icon>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item
            v-for="(item2, index2) in item.child"
            :key="index2"
            :index="item2.frontpath"
          >
            <el-icon>
              <!-- 动态组件,生成动态图标 -->
              <component :is="item2.icon"></component>
            </el-icon>
            <span>{{ item2.name }}</span>
          </el-menu-item>
        </el-sub-menu>

        <el-menu-item v-else :index="item.frontpath">
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          <span>{{ item.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script setup>
// ====== import & init ======

import { ref, reactive, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const route = useRoute();
const store = useStore();

// ====== state ======
// 当前路由路径
const defaultActive = ref(route.path);

// ====== method ======
// 监听左侧菜单选择事件
const handleSelect = (e) => {
  console.log(e);
  router.push(e);
};

// ====== computed ======
// 折叠/展开状态
const isCollapse = computed(() => store.state.asideWidth === "64px");
// 菜单数据
const asideMenus = computed(() => store.state.menus);
// ====== other ======
</script>

<style scoped>
.f-menu {
  transition: all 0.2s;
  top: 64px;
  bottom: 0;
  left: 0;
  overflow-y: auto;
  overflow-x: hidden;
  @apply shadow-md fixed bg-light-50;
}

.el-menu {
  border: 0;
  height: 100%;
}

/* 隐藏滚动条 */
.f-menu::-webkit-scrollbar {
  width: 0px;
}
</style>
