import { defineStore } from 'pinia'
import { asyncRoutes } from '@/router'
import { ref,reactive } from 'vue'

export const usePermissionStore = defineStore('permission', () => {
    const roles = ref([])
    const permissions = ref([])
    const routes = ref([])

    // 生成可访问路由
    const generateRoutes = (userRoles, userPermissions) => {
        const filteredRoutes = filterAsyncRoutes(asyncRoutes, userRoles, userPermissions)
        console.log('生成的路由:', JSON.parse(JSON.stringify(filteredRoutes)))
        return filteredRoutes
        // const accessedRoutes = filterAsyncRoutes(asyncRoutes, userRoles, userPermissions)
        // routes.value = accessedRoutes
        // return accessedRoutes
    }
    // 路由过滤算法
    const filterAsyncRoutes = (routes, roles, permissions) => {
        return routes.filter(route => {
            if (route.meta?.roles) {
                return roles.some(role => route.meta.roles.includes(role))
            }
            if (route.meta?.permissions) {
                return permissions.some(p => route.meta.permissions.includes(p))
            }
            return true
        })
    }

    return { roles, permissions, routes, generateRoutes }
})