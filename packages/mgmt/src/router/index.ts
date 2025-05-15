import { Plugin } from 'vue'
import { createRouter, createWebHistory, Router } from 'vue-router'
import { Layout } from '../layout'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: Layout,
      children: [
        {
          path: 'home',
          name: 'Home',
          component: () => import('@mgmt/views/home/index.vue')
        }
      ]
    }
  ]
})

export const setupRouter = (router: Router): Plugin => ({
  install: (app) => {
    app.use(router)
  }
})
