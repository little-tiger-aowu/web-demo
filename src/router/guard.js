import router, { resetRouter } from '@/router'
import { useUserStore } from '@/stores/modules/user.js'
import { usePermissionStore } from '@/stores/modules/permission.js'

export function setupRouterGuard() {
    router.beforeEach(async (to, from, next) => {
        const userStore = useUserStore()
        const permissionStore = usePermissionStore()

        // 白名单直接放行
        if (to.meta.isPublic) return next()

        // 检查登录状态
        // if (!userStore.token) {
        //     return next(`/login?redirect=${encodeURIComponent(to.fullPath)}`)
        // }

        // 已登录但未获取用户信息
        if (userStore.token) {
            // 无论是否已有角色，都验证路由是否已生成
            if (!permissionStore.routesGenerated) {
                try {
                    // 如果未获取用户信息，先获取
                    if (!userStore.roles.length) {
                        await userStore.getUserInfo()
                    }

                    // 生成并添加路由
                    permissionStore.generateRoutes(
                        userStore.roles,
                        userStore.permissions
                    )

                    // 标记路由已生成
                    permissionStore.setRoutesGenerated(true)

                    // 重定向到目标页面
                    return next({ ...to, replace: true })
                } catch (error) {
                    await userStore.logout()
                    return next(`/login?redirect=${to.path}`)
                }
            }
        }

        // 检查权限
        if (to.meta.roles && !userStore.roles.some(r => to.meta.roles.includes(r))) {
            console.log(123403)
            return next('/403')
        }

        if (to.meta.permissions && !userStore.permissions.some(p => to.meta.permissions.includes(p))) {
            console.log(123403)
            return next('/403')
        }
        console.log('789',to)
        next()
    })
}