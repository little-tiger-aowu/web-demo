import { createRouter, createWebHistory } from 'vue-router'

// 权限控制路由
export const asyncRoutes = [
  {
    path: '/admin',
    component: () => import('@/views/admin/admin.vue'),
    meta: {
      layout: 'DefaultLayout',
      roles: ['admin']
    }
  },
  {
    path: '/user',
    component: () => import('@/views/user/user.vue'),
    meta: {
      layout: 'DefaultLayout',
      roles: ['user']
    }
  }
]
// 公共路由(无需登录)
const publicRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/login.vue'),
    meta: {
      layout: 'EmptyLayout',
      isPublic: true
    }
  }
]

// 基础路由
const  baseRoutes = [
  {
    path: '/',
    component: () => import('@/views/home/index.vue'),
    meta: {
      layout: 'DefaultLayout',
      isPublic: true
    }
  }
]

// 初始化路由
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...baseRoutes, ...publicRoutes],
})

// 更新路由
export function resetRouter() {
  const newRouter = createRouter({
    history: createWebHistory(),
    routes: [...baseRoutes, ...publicRoutes]
  })
  router.matcher = newRouter.matcher
}

export default router
