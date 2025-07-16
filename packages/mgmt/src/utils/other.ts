/**
 * 在指定DOM元素上设置CSS自定义属性（CSS变量）的值
 *
 * @param prop - 要设置的CSS变量名称（如：'--primary-color'）
 * @param val - 要设置的CSS变量值（支持CSS支持的所有值类型）
 * @param dom - 目标DOM元素（默认为文档根元素）
 */
export const setCssVar = (prop: string, val: any, dom = document.documentElement) => {
  dom.style.setProperty(prop, val)
}
