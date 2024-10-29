import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { ElNotification } from 'element-plus'
import type { EventEmitterV2 } from '@gx-web/tool'
import { merge } from 'lodash-es'

export type ResponseBody = Res<any>

/** 响应类型 */
export type AxiosHeaders =
  | 'application/json'
  | 'application/x-www-form-urlencoded'
  | 'multipart/form-data'
  | 'application/octet-stream'

/** 服务请求前缀 */
export const baseURL = import.meta.env.VITE_API_BASE_URL

/** 服务响应状态码 */
export const serviceResultCode = ['200', '401', '400', '500'] as const

/** 服务响应正常code */
export const resultCode = '200'

/** 服务响应超时时间 */
export const timeout = 60000

/** 服务默认响应类型 */
export const reqDefaultHeader: AxiosHeaders = 'application/json'

/** 文件响应类型(一般情况下响应为数据流, 不存在响应码, 所以不进行拦截) */
export const fileResHeaders: string[] = [
  'application/octet-stream',
  'application/pdf',
  'text/html;charset=UTF-8',
  'text/plain;charset=UTF-8',
]

/**
 * 用于响应拦截文件类型
 * @param fileType 文件类型
 * @param interceptType 拦截类型
 */
export const interceptFileType = (fileType: string, interceptType: string[]) =>
  interceptType.some((header) => fileType?.indexOf(header) > -1)

export type ResErrorHandlerConfig = {
  eventEmitter: EventEmitterV2<any, any>
}

/** 响应错误处理 */
export const resErrorHandler = async (
  error: AxiosError<ResponseBody>,
  config: ResErrorHandlerConfig,
) => {
  if (error.code === 'ECONNABORTED')
    return await config.eventEmitter.emit('service-error-ECONNABORTED', error)
  else if (error.response?.status === 400)
    return await config.eventEmitter.emit('service-error-400', error)
  else if (error.response?.status === 401)
    return await config.eventEmitter.emit('service-error-401', error)
  else if (error.response?.status === 500)
    return await config.eventEmitter.emit('service-error-500', error)
  else if (error.response?.status === 503)
    return await config.eventEmitter.emit('service-error-503', error)
  else return await config.eventEmitter.emit('service-error-other', error)
}

type InterceptorsReqHandlerConfig = {
  formatter?: (request: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
}

/** 请求拦截器 */
export const interceptorsReqHandler = (
  request: InternalAxiosRequestConfig,
  config?: InterceptorsReqHandlerConfig,
) => {
  // const userStore = useUserStore()

  // if (userStore.getToken && config.headers)
  //   config.headers.Authorization = `Bearer ${userStore.getToken}`

  // 查询参数为空串改为undefine, 达到不传递到后端的要求
  // if (config.params) {
  //   Object.entries(config.params).reduce((acc, [key, value]) => {
  //     if (value === '') acc[key] = undefined
  //     return acc
  //   }, config.params)
  // }

  return config?.formatter?.(request) || request
}

export type InterceptorsResHandlerConfig = {
  fileResHeaders?: string[]
}

export const interceptorsResHandlerConfig: InterceptorsResHandlerConfig = {
  fileResHeaders,
}

/** 响应拦截器 */
export const interceptorsResHandler = (
  response: AxiosResponse<ResponseBody>,
  config: InterceptorsResHandlerConfig = interceptorsResHandlerConfig,
) => {
  config = merge({}, interceptorsResHandlerConfig, config)

  const { data, headers } = response || {}
  const { code = '', message = '' } = data || {}

  /** 特殊响应类型拦截 */
  if (interceptFileType(headers?.['content-type'], config.fileResHeaders || [])) return response

  if (code === resultCode) {
    return response
  } else {
    ElNotification({
      title: code ? `业务状态码: ${String(code)}` : '未知业务状态码',
      message: message || '接口异常',
      type: 'error',
    })
    return Promise.reject(response)
  }
}
