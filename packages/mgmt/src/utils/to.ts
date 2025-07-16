/**
 * @param str 需要转横线的驼峰字符串
 * @returns 字符串横线
 */
export const humpToTransverseLine = (str: string): string => {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase()
}

/**
 * @param str 需要转下划线的驼峰字符串
 * @returns 字符串下划线
 */
export const humpToUnderline = (str: string): string => {
  return str.replace(/([A-Z])/g, '_$1').toLowerCase()
}

/**
 * @param str 需要转驼峰的下划线字符串
 * @returns 字符串驼峰
 */
export const underlineToHump = (str: string): string => {
  return str.replace(/-(\w)/g, (_, letter: string) => {
    return letter.toUpperCase()
  })
}
