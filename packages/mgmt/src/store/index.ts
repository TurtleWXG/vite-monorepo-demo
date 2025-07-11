import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persistedstate'
export * from './util'
export * from './modules'

const store = createPinia()

/**
 * pinia 持久化插件
 */
store.use(piniaPluginPersist)

export { store }
