<template>
  <el-container>
    <el-header>
      <FHeader></FHeader>
    </el-header>
    <el-container>
      <el-aside :width="$store.state.asideWidth">
        <FMenu></FMenu>
      </el-aside>
      <el-main>
        <FTagList></FTagList>
        <router-view v-slot="{ Component }">
          <transition name="fade">
            <keep-alive :max="10">
              <component :is="Component"></component>
            </keep-alive>
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import FHeader from "./components/FHeader.vue";
import FMenu from "./components/FMenu.vue";
import FTagList from "./components/FTagList.vue";
</script>

<style>
.el-aside {
  transition: all 0.2s;
}

/* 元素进入之前 */
.fade-enter-from {
  opacity: 0;
}

/* 元素进入之后 */
.fade-enter-to {
  opacity: 1;
}

/* 元素离开之前 */
.fade-leave-from {
  opacity: 1;
}

/* 元素离开之后 */
.fade-leave-to {
  opacity: 0;
}

/* 元素进入和元素离开时的过渡效果 */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}

/*  */
.fade-enter-active {
  transition-delay: 0.3s;
}
</style>
