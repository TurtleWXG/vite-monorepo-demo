import { Plugin } from 'vue'
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
    {
      path: '/arc-arrangement',
      component: () => import('../views/arc-arrangement/index.vue'),
    },
    {
      path: '/full-view',
      component: () => import('../views/full-view/index.vue'),
    },
  ],
})

export const setupRouter = (router: Router): Plugin => ({
  install: (app) => {
    app.use(router)
  },
})
