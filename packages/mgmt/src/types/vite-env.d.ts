/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** 项目名称 */
  readonly VITE_APP_NAME: string

  /** 请求地址 */
  readonly VITE_APP_BASE_API: string

  /** 接口前缀 */
  readonly VITE_API_BASE_URL: string

  /** 打包路径 */
  readonly VITE_BASE_PATH: string

  /** 是否删除debugger */
  readonly VITE_DROP_DEBUGGER: string

  /** 是否删除console.log */
  readonly VITE_DROP_CONSOLE: string

  /** 是否sourcemap */
  readonly VITE_SOURCEMAP: string

  /** 是否输出打包分析 */
  readonly VITE_BUILD_ANALYSIS: string

  /** 输出路径 */
  readonly VITE_OUT_DIR: string

  /** 客户端信息 */
  readonly VITE_APP_CLIENT: string
}
