export {}

declare module 'vue-router' {
  /**
   * 路由元数据扩展接口
   * 用于在路由配置中定义业务相关元信息
   */
  interface RouteMeta extends Record<string | number | symbol, unknown> {
    /**
     * 是否在侧边菜单隐藏该路由
     * @default false
     */
    hidden?: boolean

    /**
     * 当子路由数量为1时，是否始终展示父级菜单
     * @default false
     */
    alwaysShow?: boolean

    /**
     * 路由标题（页面标题/菜单显示名称）
     * @example "仪表盘"
     */
    title?: string

    /**
     * 菜单项图标（图标组件名/图片地址）
     * @example "el-icon-monitor"
     */
    icon?: string

    /**
     * 是否缓存该路由页面（需配合组件name使用）
     * @default false
     */
    isCache?: boolean

    /**
     * 是否显示面包屑导航
     * @default true
     */
    breadcrumb?: boolean

    /**
     * 是否固定显示在标签页（不可关闭）
     * @default false
     */
    affix?: boolean

    /**
     * 指定激活菜单的path（用于隐藏路由时高亮对应菜单）
     * @example "/dashboard"
     */
    activeMenu?: string

    /**
     * 是否不在标签栏显示
     * @default false
     */
    noTagsView?: boolean

    /**
     * 权限校验标识键（需配合权限系统使用）
     * @example "system:user:view"
     */
    followAuth?: string
  }
}
