import { Plugin } from 'vue'
import { Router } from 'vue-router'

/**
 * 配置路由器插件安装器
 *
 * 该函数创建一个Vue插件对象，用于将路由实例注册到Vue应用
 *
 * @param router - Router实例，需要进行全局注册的路由对象
 * @returns Plugin - Vue插件对象，包含标准的install安装方法
 */
export const setupRouter = (router: Router): Plugin => ({
  /**
   * Vue插件标准安装接口
   * 将路由实例注册到Vue应用，使其在整个应用中可用
   */
  install: (app) => {
    // 核心注册逻辑：将路由实例挂载到Vue根实例
    app.use(router)
  }
})
