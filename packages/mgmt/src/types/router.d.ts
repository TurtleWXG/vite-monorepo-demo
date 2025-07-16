import { defineComponent } from 'vue'
import type { RouteMeta, RouteRecordRaw } from 'vue-router'

type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>)

/**
 * 自定义路由元信息
 */
interface RouteMetaCustom extends Record<string | number | symbol, unknown> {
  /**
   * 当设置 true 的时候该路由不会再侧边栏出现 如404，login等页面(默认 false)
   */
  hidden?: boolean

  /**
   * 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式
   *
   * 只有一个时，会将那个子路由当做根路由显示在侧边栏
   *
   * 若你想不管路由下面的 children 声明的个数都显示你的根路由
   *
   * 你可以设置 alwaysShow: true
   *
   * 这样它就会忽略之前定义的规则，一直显示根路由(默认 false)
   */
  alwaysShow?: boolean

  /**
   * 设置该路由在侧边栏和面包屑中展示的名字
   */
  title?: string

  /**
   * 设置该路由的图标
   */
  icon?: string

  /**
   * 如果设置为false，则不会被 <keep-alive> 缓存(默认 false)
   */
  noCache?: boolean

  /**
   * 如果设置为true，则会一直固定在tag项中(默认 false)
   */
  affix?: boolean

  /**
   * 显示高亮的路由路径
   */
  activeMenu?: string

  /**
   * 如果设置为true，则不会出现在tag中(默认 false)
   */
  noTagsView?: boolean

  /**
   * 跟随哪个路由进行权限过滤
   */
  followAuth?: string

  /**
   * 显示的badge数字
   */
  badge?: number
}

declare module 'vue-router' {
  /**
   * @description: 扩展 RouteMeta
   */
  interface RouteMeta extends RouteMetaCustom {}
}

declare global {
  /**
   * 业务路由配置
   */
  type AppRouteRecordRaw = RouteRecordRaw & {
    name: string
    meta: RouteMeta
    component?: Component
    children?: AppRouteRecordRaw[]
    props?: Recordable
    fullPath?: string
  }
}
