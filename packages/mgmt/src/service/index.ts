import axios from 'axios'
import { baseURL, interceptorsResHandler, resErrorHandler, timeout } from './config'
import { createSingleRequest } from '@gx-web/tool'

const service = axios.create({
  baseURL,
  timeout
})

/*
  request interceptor
  请求拦截
*/
service.interceptors.request.use(
  (config) => config,
  (error) => error
)

/*
  response interceptor
  响应拦截
*/
service.interceptors.response.use(interceptorsResHandler, resErrorHandler)

const { request } = createSingleRequest(service)

export default request
