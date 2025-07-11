import { createApp } from 'vue'
import './styles/index.scss'
import App from './App.vue'
import { router, setupRouter } from './router'
import { setupStore, store } from './store'
import 'uno.css'
import 'animate.css'

createApp(App).use(setupRouter(router)).use(setupStore(store)).mount('#app')
