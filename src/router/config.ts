import type { RouteRecordRaw } from 'vue-router'

export const normalRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/view/Home/index.vue')
  },
  {
    path: '/blog',
    name: 'blog',
    component: () => import('@/view/Blog/List/index.vue'),
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/blog/:id',
    name: 'blogItem',
    component: () => import('@/view/Blog/Item/index.vue')
  },
  {
    path: '/project',
    name: 'project',
    component: () => import('@/view/Project/index.vue')
  },
  {
    path: '/mirror',
    name: 'mirror',
    component: () => import('@/view/Mirror/index.vue')
  },
  {
    path: '/:pathMatch(.*)',
    name: 'NotFound',
    component: () => import('@/view/NotFound/index.vue')
  }
]

export const authRoutes: RouteRecordRaw[] = [
  {
    path: '/blog/create',
    name: 'createBlog',
    component: () => import('@/view/Blog/Create/index.vue')
  },
  {
    path: '/blog/update/:id',
    name: 'updateBlog',
    component: () => import('@/view/Blog/Update/index.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/view/Admin/index.vue')
  }
]
