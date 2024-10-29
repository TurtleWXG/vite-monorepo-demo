import type { AxiosInstance, CreateAxiosDefaults } from 'axios'
import axios from 'axios'
import { merge } from 'lodash-es'
import { baseURL, interceptorsReqHandler, interceptorsResHandler, timeout } from './config'

// @/service
// import { addServiceInterceptors, createServiceEntity } from '@base-lib/service'
// import { createServiceEventEmitter } from '@base-lib/events/service'
// import router from '@/router'

// export const service = createServiceEntity()

// export const serviceEventEmitter = createServiceEventEmitter(service, router)

// addServiceInterceptors(service, { eventEmitter: serviceEventEmitter })

export class Service {
  // 默认配置
  defaultConfig: CreateAxiosDefaults = {
    baseURL,
    timeout,
  }

  // 实例
  service: AxiosInstance

  constructor(config: CreateAxiosDefaults = {}) {
    this.service = axios.create(merge(this.defaultConfig, config))
  }

  initInterceptors() {
    this.service.interceptors.request.use(interceptorsReqHandler)
    this.service.interceptors.response.use(interceptorsResHandler)
  }
}
