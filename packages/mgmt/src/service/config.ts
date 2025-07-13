import type { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import { ElNotification } from 'element-plus'

export type ResponseBody = Res<any>

/** 响应类型 */
export type AxiosHeaders =
  | 'application/json'
  | 'application/x-www-form-urlencoded'
  | 'multipart/form-data'
  | 'application/octet-stream'

/** 服务请求前缀 */
export const baseURL = import.meta.env.VITE_API_BASE_URL

/** 服务响应正常code */
export const resultSuccessCode = '200'

/** 服务响应超时时间 */
export const timeout = 60000

/** 服务默认响应类型 */
export const reqDefaultHeader: AxiosHeaders = 'application/json'

/** 请求错误处理 */
export const reqErrorHandler = (error: any) => {
  console.error('interceptors.request =>', error)
}

/** 响应错误处理 */
export const resErrorHandler = async (error: AxiosError<ResponseBody>) => {
  // cancelRepeatRequest.del(error.config)

  // const userStore = useUserStore()

  // if (error.code === 'ECONNABORTED') {
  //   ElNotification({
  //     title: '请求超时',
  //     message: '请稍后重试!',
  //     type: 'error'
  //   })
  // }
  // else if (error.response?.status === 400) {
  //   ElNotification({
  //     title: '参数错误',
  //     message: error.response?.data?.message ?? '请求出错',
  //     type: 'error'
  //   })
  // }
  // else if (error.response?.status === 401) {
  //   if (error.config?.url === '/auth/oauth/login')
  //     return Promise.reject(error)

  //   return userStore
  //     .reLogin()
  //     .then(() => Service.request(error.config))
  //     .catch(() => router.replace('/login'))
  // }
  // else if (error.response?.status === 500) {
  //   ElNotification({
  //     title: '服务出错',
  //     message: error.response?.data?.message ?? '请稍后重试!',
  //     type: 'error'
  //   })
  // }
  // else if (error.response?.status === 503) {
  //   ElNotification({
  //     title: '服务离线',
  //     message: error.response?.data?.message ?? '请稍后重试!',
  //     type: 'error'
  //   })
  // }
  // else {
  //   ElMessage.error(error.response?.data?.message ?? '请求出错')
  // }
  return Promise.reject(error)
}

/** 请求拦截器 */
export const interceptorsReqHandler = (config: InternalAxiosRequestConfig) => {
  // const userStore = useUserStore()

  // cancelRepeatRequest.set(config)

  // if (userStore.getToken && config.headers)
  //   config.headers.Authorization = `Bearer ${userStore.getToken}`

  // 查询参数为空串改为undefine, 达到不传递到后端的要求
  // if (config.params) {
  //   Object.entries(config.params).reduce((acc, [key, value]) => {
  //     if (value === '') acc[key] = undefined
  //     return acc
  //   }, config.params)
  // }

  return config
}

/** 响应拦截器 */
export const interceptorsResHandler = (response: AxiosResponse<ResponseBody>) => {
  const { config, data, headers } = response || {}
  const { code = '', message = '' } = data || {}
  // cancelRepeatRequest.del(config)

  /** 特殊响应类型拦截 */
  // if (interceptFileType(headers?.['content-type'], option.fileResHeaders))
  //   return response

  if (code === resultSuccessCode) {
    return response
  } else {
    ElNotification({
      title: code ? `业务状态码: ${String(code)}` : '未知业务状态码',
      message: message || '接口异常',
      type: 'error'
    })
    return Promise.reject(response)
  }
}
