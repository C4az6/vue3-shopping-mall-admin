<template>
  <div class="f-tag-list" :style="{ left: $store.state.asideWidth }">
    <el-tabs
      v-model="editableTabsValue"
      type="card"
      closable
      class="flex-1"
      @edit="handleTabsEdit"
      style="min-width: 100px"
    >
      <el-tab-pane
        v-for="item in editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
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
            <el-dropdown-item>Action 1</el-dropdown-item>
            <el-dropdown-item>Action 2</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </span>
  </div>
</template>

<script setup>
// ====== import ======
import { ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

// ====== composition api init ======
const router = useRouter();
const store = useStore();

// ====== state ======
let tabIndex = 2;
const editableTabsValue = ref("2");
const editableTabs = ref([
  {
    title: "Tab 1",
    name: "1",
    content: "Tab 1 content",
  },
  {
    title: "Tab 2",
    name: "2",
    content: "Tab 2 content",
  },
  {
    title: "Tab 1",
    name: "3",
    content: "Tab 1 content",
  },
  {
    title: "Tab 2",
    name: "4",
    content: "Tab 2 content",
  },
  {
    title: "Tab 1",
    name: "5",
    content: "Tab 1 content",
  },
  {
    title: "Tab 2",
    name: "6",
    content: "Tab 2 content",
  },
  {
    title: "Tab 1",
    name: "7",
    content: "Tab 1 content",
  },
  {
    title: "Tab 2",
    name: "8",
    content: "Tab 2 content",
  },
  {
    title: "Tab 2",
    name: "8",
    content: "Tab 2 content",
  },
  {
    title: "Tab 2",
    name: "8",
    content: "Tab 2 content",
  },
]);

// ====== method ======
const handleTabsEdit = (targetName, action) => {
  if (action === "add") {
    const newTabName = `${++tabIndex}`;
    editableTabs.value.push({
      title: "New Tab",
      name: newTabName,
      content: "New Tab content",
    });
    editableTabsValue.value = newTabName;
  } else if (action === "remove") {
    const tabs = editableTabs.value;
    let activeName = editableTabsValue.value;
    if (activeName === targetName) {
      tabs.forEach((tab, index) => {
        if (tab.name === targetName) {
          const nextTab = tabs[index + 1] || tabs[index - 1];
          if (nextTab) {
            activeName = nextTab.name;
          }
        }
      });
    }

    editableTabsValue.value = activeName;
    editableTabs.value = tabs.filter((tab) => tab.name !== targetName);
  }
};

// ====== computed ======

// ====== other ======
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
