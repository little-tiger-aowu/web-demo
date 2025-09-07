<script setup>
import { useUserStore } from '@/stores/modules/user'
import WeightSelector from "@/components/WeightSelector.vue";

const userStore = useUserStore()
const { x,y } = useMouse()
const title = useTitle()
title.value = '你好'
console.log(x,y)
const handLogin = async () => {
  try {
    await userStore.login()
    console.log('登录成功')
  } catch (error) {
    console.log('登录失败', error)
  }
}

const a = ref(123)
</script>

<template>
  <main>
    <div class="text-#3ba127">你好</div>
    <div class="i-ep-arrow-right-bold text-#3ba127 hover:text-#f0d400 text-3xl" />
    <div class="i-logos-vue text-3xl" />
    <div>
      <p class="name">用户名：{{ userStore.userInfo }}</p>
      <button @click="handLogin">登录</button>
      <button @click="userStore.loginOut()">退出</button>
    </div>
    <weight-selector></weight-selector>
  </main>
</template>

<style lang="scss">
.name{
  color: red;
}
</style>
