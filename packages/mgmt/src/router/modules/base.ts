import { Layout } from '@mgmt/layout'
import { RouteRecordRaw } from 'vue-router'

export default [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@mgmt/views/login/index.vue'),
    meta: {
      title: '登录',
      showLink: false,
      rank: 101
    }
  },
  {
    path: '/redirect',
    component: Layout,
    meta: {
      title: '加载中...',
      showLink: false,
      rank: 102
    },
    children: [
      {
        path: '/redirect/:path(.*)',
        name: 'Redirect',
        component: () => import('@mgmt/views/redirect/index.vue')
      }
    ]
  }
] satisfies RouteRecordRaw[]
