<template>
  <router-view></router-view>
</template>

<script setup>
console.log(import.meta.env);
</script>

<style>
body {
  @apply bg-gray-100;
}

.btn {
  @apply bg-purple-500 text-indigo-50 px-4 py-2 rounded-full transition-all duration-500 hover:( bg-purple-900) focus:(ring-8 ring-purple-900);
}

#nprogress .bar {
  background-color: #f4f4f4 !important;
  height: 3px !important;
}

/* 修改滚动条样式 */
::-webkit-scrollbar {
  width: 4px;
  height: 6px;
}

::-webkit-scrollbar-corner {
  display: block;
}

::-webkit-scrollbar-thumb {
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.2);
}
::-webkit-scrollbar-thumb,
::-webkit-scrollbar-track {
  border-right-color: transparent;
  border-left-color: transparent;
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
