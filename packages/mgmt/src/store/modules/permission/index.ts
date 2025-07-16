import { defineStore } from 'pinia'
import { cloneDeep } from 'lodash-es'
import type { RouteRecordRaw } from 'vue-router'
import { store } from '../../index'
import { router } from '@mgmt/router'
// import Menu from '@/api/system/menu'
// import { filterAsyncRouter, flatMultiLevelRoutes } from '@/utils/routerHelper'

export interface PermissionState {
  routers: AppRouteRecordRaw[]
  addRouters: AppRouteRecordRaw[]
  menuTabRouters: AppRouteRecordRaw[]
  // permissions: SystemPermissionType.Permission[]
  // rolePermissions: SystemPermissionType.Permission[]
}

export const usePermissionStore = defineStore({
  id: 'permission',
  state: (): PermissionState => ({
    routers: [], // 全部路由
    addRouters: [], // 异步路由
    menuTabRouters: [] // 顶部tab栏路由
    // permissions: [], // 默认当前权限
    // rolePermissions: [] // 当前角色拥有权限
  }),
  getters: {
    getRouters(state) {
      return state.routers
    },
    // getAddRouters(state) {
    //   return flatMultiLevelRoutes(cloneDeep(state.addRouters as any))
    // },
    getMenuTabRouters(state) {
      return state.menuTabRouters
    }
    // getNowPermissionKeys(state) {
    //   const nowPermissions: string[] = []
    //   const permissionKeys = state.permissions.map((item) => item.btnPerm)
    //   state.rolePermissions.forEach((item) => {
    //     if (item.btnPerm !== '' && permissionKeys.includes(item.btnPerm))
    //       nowPermissions.push(item.btnPerm)
    //   })
    //   return nowPermissions
    // }
  },
  actions: {
    // 初始化 异步获取路由
    async generateRoutes() {
      try {
        // const { data } = await Menu.loadRouter()
        // 异步获取到的组件
        // const asyncRouter = filterAsyncRouter(data)
        const asyncRouter = []
        // 后置组件, 放在最后面
        const afterRouters: Array<RouteRecordRaw> = [
          {
            path: '/:path(.*)*',
            redirect: '/404',
            name: '404Page',
            meta: {
              hidden: true,
              breadcrumb: false
            }
          }
        ]
        // 组装
        const routers = <AppRouteRecordRaw[]>[...asyncRouter, ...afterRouters]
        this.setRouters(routers)
        this.setAddRouters(asyncRouter)
        routers.forEach((route) => router.addRoute(route))
        return routers
      } catch (error) {
        ElMessage.error('初始化用户菜单失败!')
        console.error('error =>', error)
        return Promise.reject(error)
      }
    },
    setRouters(routers: AppRouteRecordRaw[]) {
      this.routers = routers
    },
    setAddRouters(routers: AppRouteRecordRaw[]) {
      this.addRouters = routers
    },
    setMenuTabRouters(routers: AppRouteRecordRaw[]) {
      this.menuTabRouters = routers
    },
    // initPermissions(
    //   permissions: SystemPermissionType.Permission[],
    //   rolePermissions: SystemPermissionType.Permission[]
    // ) {
    //   if (permissions?.length > 0) this.permissions.push(...permissions)

    //   if (rolePermissions?.length > 0) this.rolePermissions.push(...rolePermissions)
    // },
    /**
     * 用于设置菜单提示标志
     * @author wangjiahui
     * @param routerName 设置的路由路径, 以router的name为组合规则, 嵌套路由用斜杠分割 system/user
     * @param badge 数量
     *
     * @example
     * const permissionStore = usePermissionStore()
     * permissionStore.setRouterBadge('system/user', 100) // 设置system目录下的user菜单的标志数量为100
     */
    setRouterBadge(routerName: string, badge: number) {
      if (!routerName) {
        console.error('设置RouterBadge必须有routerName')
        return
      }
      const routerKeys = routerName.split('/')
      // 匹配目标路由
      const targetRouter = routerKeys.reduce((acc, cur, index) => {
        const findItem = acc.find((item) => item.name === cur)
        if (findItem) {
          if (index === routerKeys.length - 1) acc = [findItem]
          else acc = findItem?.children ?? []
        } else {
          acc = []
        }
        return acc
      }, this.routers)

      targetRouter.length && (targetRouter[0].meta.badge = badge)
    }
  }
})
