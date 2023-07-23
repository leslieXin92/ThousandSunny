import { RouteRecordRaw } from 'vue-router'

export const normalRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/Home/Home.vue')
  },
  {
    path: '/blog',
    name: 'blog',
    component: () => import('@/views/Blog/Blog.vue'),
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/blog/:id',
    name: 'blogItem',
    component: () => import('@/components/BlogItem/BlogItem.vue')
  },
  {
    path: '/project',
    name: 'project',
    component: () => import('@/views/Project/Project.vue')
  },
  {
    path: '/mirror',
    name: 'mirror',
    component: () => import('@/views/Mirror/Mirror.vue')
  },
  {
    path: '/:pathMatch(.*)',
    name: 'NotFound',
    component: () => import('@/views/NotFound/NotFound.vue')
  }
]

export const authRoutes: RouteRecordRaw[] = [
  {
    path: '/blog/create',
    name: 'createBlog',
    component: () => import('@/views/Blog/Create.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/Admin/Admin.vue')
  }
]
