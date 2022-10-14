<template>
  <div class="f-tag-list" :style="{ left: $store.state.asideWidth }">
    <el-tabs
      v-model="activeTab"
      type="card"
      class="flex-1"
      @tab-change="handleTabChange"
      @tab-remove="handleTabRemove"
    >
      <el-tab-pane
        v-for="item in tabList"
        :key="item.path"
        :label="item.title"
        :name="item.path"
        :closable="item.path !== '/'"
      >
      </el-tab-pane>
    </el-tabs>

    <span class="tag-btn">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-icon>
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>关闭其他</el-dropdown-item>
            <el-dropdown-item>全部关闭</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </span>
  </div>

  <!-- 占位符 -->
  <div style="height: 44px"></div>
</template>

<script setup>
// ====== import ======
import { ref, reactive, computed } from "vue";
import { useRouter, useRoute, onBeforeRouteUpdate } from "vue-router";
import { useStore } from "vuex";
import { useCookies } from "@vueuse/integrations/useCookies";

// ====== composition api init ======
const router = useRouter();
const route = useRoute();
const store = useStore();
const cookie = useCookies();

// ====== state ======
// 激活的标签卡
const activeTab = ref(route.path);
// 标签卡列表
const tabList = ref([
  {
    title: "后台首页",
    path: "/",
  },
]);

// ====== method ======
// 添加标签导航
const addTab = (t) => {
  let noTab = tabList.value.findIndex((e) => e.title === t.title) === -1;
  if (noTab) {
    // 没有找到tab标签,可以添加到tablist并且存入cookie
    tabList.value.push(t);
  }
  // 把已有的标签数量存起来方便下次初始化使用
  cookie.set("tabList", tabList.value);
};

// 标签切换事件
const handleTabChange = (e) => {
  activeTab.value = e;
  router.push(e);
};

// 标签删除事件
const handleTabRemove = (e) => {
  let tabs = tabList.value;
  let a = activeTab.value;
  if (a === e) {
    // 关闭当前激活中的标签
    tabs.forEach((item, index) => {
      if (item.path === e) {
        // 关闭当前标签后把当前激活标签换成下一个或上一个标签
        const nextTab = tabs[index + 1] || tabs[index - 1];
        if (nextTab) {
          a = nextTab.path;
        }
      }
    });
  }
  activeTab.value = a;
  // 从标签列表中移出当前关闭标签
  tabList.value = tabList.value.filter((item) => item.path != e);
  // 更新cookie
  cookie.set("tabList", tabList.value);
};

// 初始化标签导航列表
const initTabList = () => {
  let tbs = cookie.get("tabList");
  if (tbs) {
    tabList.value = tbs;
  }
};
initTabList();

// ====== computed ======

// ====== other ======
// 监听路由更新
onBeforeRouteUpdate((to, from) => {
  console.log("__________onBeforeRouteUpdate");
  activeTab.value = to.path;
  addTab({ title: to.meta.title, path: to.path });
});
</script>

<style scoped>
.f-tag-list {
  @apply fixed bg-gray-100 flex items-center;
  top: 64px;
  right: 0;
  height: 44px;
  z-index: 100;
}

.tag-btn {
  @apply bg-white rounded ml-auto flex items-center justify-center px-2;
  height: 32px;
}

:deep(.el-tabs__header) {
  height: 100%;
  @apply mb-0 border-0;
}

:deep(.el-tabs__nav) {
  border: 0 !important;
}

:deep(.el-tabs__item) {
  border: 0 !important;
  height: 32px;
  line-height: 32px;
  @apply bg-white mx-1 rounded;
}

:deep(.el-tabs__nav-next),
:deep(.el-tabs__nav-prev) {
  line-height: 32px;
  height: 32px;
}

:deep(.is-disabled) {
  cursor: not-allowed;
  @apply text-gray-300;
}
</style>
