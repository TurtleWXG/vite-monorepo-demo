/** ### 普通 响应体 */
type Res<T> = {
  code: string
  data: T
  message: string
  ok: boolean
}

/** ### 分页 响应体 */
type ResPage<T> = Res<{
  current: number
  optimizeCountSql: boolean
  orders: any[]
  pages: number
  records: T[]
  searchCount: boolean
  size: number
  total: number
}>

/** ### Promise封装普通响应体 */
type HttpReturn<T extends object | boolean | string = any> = Promise<Res<T>>

/** ### Promise封装分页响应体 */
type HttpReturnPage<T extends object | boolean | string = any> = Promise<ResPage<T>>
