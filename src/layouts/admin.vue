<template>
  <el-container>
    <el-header>
      <FHeader></FHeader>
    </el-header>
    <el-container>
      <el-asider>
        <FMenu></FMenu>
      </el-asider>
      <el-main>
        <FTagList></FTagList>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import FHeader from "./components/FHeader.vue";
import FMenu from "./components/FMenu.vue";
import FTagList from "./components/FTagList.vue";
</script>
