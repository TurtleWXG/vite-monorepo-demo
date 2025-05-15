import { createRouter, createWebHistory } from 'vue-router'
import { Layout } from '@mgmt/layout'

export * from './util'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: Layout,
      children: [
        {
          name: 'Home',
          path: 'home',
          component: () => import('@mgmt/views/home/index.vue')
        }
      ]
    }
  ]
})
