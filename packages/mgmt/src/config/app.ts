import { useCache } from '@mgmt/hooks'
import { isDev } from '@mgmt/utils/is'

const { wsCache } = useCache()

export type LayoutType = 'classic' | 'topLeft' | 'top' | 'cutMenu'

/** 加密方式 */
export enum EncryptType {
  RSA,
  SM2
}

export type ThemeTypes = {
  elColorPrimary?: string
  leftMenuBorderColor?: string
  leftMenuBgColor?: string
  leftMenuBgLightColor?: string
  leftMenuBgActiveColor?: string
  leftMenuCollapseBgActiveColor?: string
  leftMenuTextColor?: string
  leftMenuTextActiveColor?: string
  logoTitleTextColor?: string
  logoBorderColor?: string
  topHeaderBgColor?: string
  topHeaderTextColor?: string
  topHeaderHoverColor?: string
  topToolBorderColor?: string
}
export interface AppState {
  breadcrumb: boolean
  breadcrumbIcon: boolean
  collapse: boolean
  uniqueOpened: boolean
  hamburger: boolean
  screenfull: boolean
  tenant: boolean
  userDropdown: boolean
  size: boolean
  locale: boolean
  tagsView: boolean
  tagsViewIcon: boolean
  logo: boolean
  logoImg: string
  fixedHeader: boolean
  greyMode: boolean
  pageLoading: boolean
  layout: LayoutType
  title: string
  userInfo: string
  isDark: boolean
  currentSize: EPSize
  sizeMap: EPSize[]
  mobile: boolean
  footer: boolean
  theme: ThemeTypes
  menuBadgeMax: number
  menuBadgeShowValueMin: number
  purgeIconsServeUrl: string[]
  /** 是否自动根据屏幕尺寸切换为移动端布局 */
  isAutoMobile: boolean
  /** 是否展示侧边配置按钮 */
  showSetting: boolean
  /** AppView的最小宽度 */
  appViewMinW: string
  /** AppView的最小高度 */
  appViewMinH: string
  /** 加密类型 */
  encryptType: EncryptType
}

export const appModules: AppState = {
  userInfo: 'userInfo', // 登录信息存储字段-建议每个项目换一个字段，避免与其他项目冲突
  sizeMap: ['default', 'large', 'small'],
  mobile: false, // 是否是移动端
  isAutoMobile: false,
  logoImg: '/logo.png',
  title: import.meta.env.VITE_APP_TITLE, // 标题
  pageLoading: false, // 路由跳转loading
  breadcrumb: true, // 面包屑
  breadcrumbIcon: true, // 面包屑图标
  collapse: false, // 折叠菜单
  uniqueOpened: true, // 是否只保持一个子菜单的展开
  hamburger: true, // 折叠图标
  screenfull: true, // 全屏图标
  tenant: true, // 切换租户
  size: false, // 尺寸图标
  locale: false, // 多语言图标
  userDropdown: true, // 用户下拉选项
  tagsView: true, // 标签页
  tagsViewIcon: true, // 是否显示标签图标
  logo: true, // logo
  fixedHeader: true, // 固定toolheader
  footer: true, // 显示页脚
  greyMode: false, // 是否开始灰色模式，用于特殊悼念日

  layout: wsCache.get('layout') || 'classic', // layout布局
  isDark: wsCache.get('isDark') || false, // 是否是暗黑模式
  currentSize: wsCache.get('default') || 'default', // 组件尺寸
  theme: wsCache.get('theme') || {
    // 主题色
    elColorPrimary: '#409eff',
    // 左侧菜单边框颜色
    leftMenuBorderColor: 'inherit',
    // 左侧菜单背景颜色
    leftMenuBgColor: '#001529',
    // 左侧菜单浅色背景颜色
    leftMenuBgLightColor: '#0f2438',
    // 左侧菜单选中背景颜色
    leftMenuBgActiveColor: 'var(--el-color-primary)',
    // 左侧菜单收起选中背景颜色
    leftMenuCollapseBgActiveColor: 'var(--el-color-primary)',
    // 左侧菜单字体颜色
    leftMenuTextColor: '#bfcbd9',
    // 左侧菜单选中字体颜色
    leftMenuTextActiveColor: '#fff',
    // logo字体颜色
    logoTitleTextColor: '#fff',
    // logo边框颜色
    logoBorderColor: 'inherit',
    // 头部背景颜色
    topHeaderBgColor: '#fff',
    // 头部字体颜色
    topHeaderTextColor: 'inherit',
    // 头部悬停颜色
    topHeaderHoverColor: '#f6f6f6',
    // 头部边框颜色
    topToolBorderColor: '#eee'
  },
  /** 菜单数量标识最大值 */
  menuBadgeMax: 99,
  /** 展示菜单数量标识的阈值 */
  menuBadgeShowValueMin: 0,
  /**
   * 图标系统路径
   * https://iconify.design/docs/api
   */
  purgeIconsServeUrl: ['https://api.iconify.design'],
  showSetting: isDev(),
  appViewMinW: '1200px',
  appViewMinH: '800px',
  encryptType: EncryptType.SM2
}
