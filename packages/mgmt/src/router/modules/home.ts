import { Layout } from '@mgmt/layout'
import { RouteRecordRaw } from 'vue-router'

const { VITE_HIDE_HOME } = import.meta.env

export default [
  {
    path: '/',
    name: 'Home',
    component: Layout,
    redirect: '/welcome',
    meta: {
      icon: 'ep/home-filled',
      title: '首页',
      rank: 0
    },
    children: [
      {
        path: '/welcome',
        name: 'Welcome',
        component: () => import('@mgmt/views/welcome/index.vue'),
        meta: {
          title: '首页',
          showLink: VITE_HIDE_HOME === 'true' ? false : true
        }
      }
    ]
  }
] satisfies RouteRecordRaw[]
