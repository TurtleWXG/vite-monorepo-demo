import { Pinia } from 'pinia'
import { Plugin } from 'vue'

export const setupStore = (store: Pinia): Plugin => ({
  install: (app) => {
    app.use(store)
  }
})
