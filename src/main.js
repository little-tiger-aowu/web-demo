// import './assets/main.css'

import { createApp } from 'vue'
// import { createPinia } from 'pinia'
import pinia from './stores'
import 'virtual:uno.css'
import App from './App.vue'
import router from './router'
import { setupRouterGuard } from './router/guard'
import { useUserStore } from './stores/modules/user.js'
import 'uno.css'
import 'virtual:unocss-devtools'
const app = createApp(App)



app.use(pinia)
app.use(router)


// 初始化路由守卫
setupRouterGuard()

// 初始化用户状态
const userStore = useUserStore()
console.log(123,userStore.token)
if (userStore.token) {
    console.log(123)
    userStore.getUserInfo()
}

app.mount('#app')
