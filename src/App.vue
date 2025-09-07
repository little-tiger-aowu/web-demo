<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import EmptyLayout from '@/layouts/EmptyLayout.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const route = useRoute()

const layoutComponent = computed(() => {
  // 默认使用LayoutA，如果未设置meta.layout
  console.log(route)
  return route.meta.layout === EmptyLayout ? EmptyLayout : DefaultLayout
})

document.title = import.meta.env.VITE_APP_TITLE
</script>

<template>
  <component :is="layoutComponent">
    <router-view />
  </component>
</template>

<style scoped>
</style>
