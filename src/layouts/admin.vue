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
          <keep-alive :max="10">
            <component :is="Component"></component>
          </keep-alive>
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
</style>
