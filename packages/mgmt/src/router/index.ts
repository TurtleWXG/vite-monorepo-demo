import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { setupRouterPerm } from './permission'

export * from './util'

/**
 * ### 自动导入全部静态路由，无需再手动引入
 * #### 匹配 src/router/modules 目录（任何嵌套级别）中具有 .ts 扩展名的所有文件
 * #### 如何匹配所有文件请看：https://github.com/mrmlnc/fast-glob#basic-syntax
 * #### 如何排除文件请看：https://cn.vitejs.dev/guide/features.html#negative-patterns
 */
const modules = import.meta.glob<true, string, RouteRecordRaw[]>(['./modules/**/*.ts'], {
  eager: true,
  import: 'default'
})

/** 静态路由 */
const constantRoutes: RouteRecordRaw[] = []

/** 注入静态路由 */
Object.keys(modules).forEach((key) => {
  constantRoutes.push(...modules[key])
})

/**
 * 初始化路由
 * https://router.vuejs.org/zh/api/interfaces/RouterOptions.html
 */
export const router = createRouter({
  /** 路由模式 */
  history: createWebHistory(),

  /** 路由表 */
  routes: constantRoutes,

  /** 是否禁止尾部斜线 */
  strict: true,

  /** 当在页面之间导航时控制滚动的功能 */
  scrollBehavior: () => ({ left: 0, top: 0 })
})

setupRouterPerm(router)
