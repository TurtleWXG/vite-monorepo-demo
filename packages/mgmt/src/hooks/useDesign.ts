import variables from '@mgmt/styles/global.module.scss'

export const useDesign = () => {
  /**
   * @param scope 类名
   * @returns 返回空间名-类名
   */
  const getPrefixCls = (scope: string) => {
    return `${variables['g-namespace']}-${scope}`
  }

  return {
    variables: variables,
    getPrefixCls
  }
}
