import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router, setupRouter } from './router'

createApp(App).use(setupRouter(router)).mount('#app')
