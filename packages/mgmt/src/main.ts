import { createApp } from 'vue'
import './styles/index.scss'
import App from './App.vue'
import { router, setupRouter } from './router'
import 'uno.css'

createApp(App).use(setupRouter(router)).mount('#app')
