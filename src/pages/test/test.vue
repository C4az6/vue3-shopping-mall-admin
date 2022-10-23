<template>
  <div>
    <small>test page</small>
    <br />
    <small>{{publishedBooksMessage}}</small>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'

const author = reactive({
  name: 'alexander',
  books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery'
  ]
});


// 计算属性值会基于其响应式依赖被缓存。一个计算属性仅会在其响应式依赖更新时才重新计算。
const publishedBooksMessage = computed(() => {
  return author.books.length > 0 ? 'yes' : 'no'
})
</script>
