import { useAuthStore } from '@mgmt/store'
import { matchPattern } from '@gx-web/tool'
import { Router } from 'vue-router'

/** 无鉴权白名单路由（支持通配符`*`） */
const noAuthWhiteList = ['/login'] // 不重定向白名单

export const setupRouterPerm = (router: Router) => {
  router.beforeEach((to, _from, next) => {
    const AuthStore = useAuthStore()

    if (AuthStore.getToken) {
      if (to.path === '/login') {
        // 已登录且要跳转的页面是登录页
        next({ path: '/' })
      } else {
        next()
      }
    } else {
      matchPattern(to.path, noAuthWhiteList) ? next() : next(`/login`)
    }
  })

  // router.afterEach((to) => {

  // })
}
