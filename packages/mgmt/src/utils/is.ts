/** 类型守卫 */

/** 断言 地址URL */
export const isUrl = (path: string): boolean => {
  const reg = /^https?:\/\/.*$/
  return reg.test(path)
}

/**
 * 断言 黑暗模式
 */
export const isDark = (): boolean => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

/**
 * 断言 开发环境
 */
export const isDev = () => {
  return import.meta.env.DEV
}
