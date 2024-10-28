import { App, Plugin } from 'vue'
import { createRouter, createWebHistory, Router } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../views/index.vue'),
    },
    {
      path: '/map',
      component: () => import('../views/map/index.vue'),
    },
  ],
})

export const setupRouter = (router: Router): Plugin => ({
  install: (app) => {
    app.use(router)
  },
})
