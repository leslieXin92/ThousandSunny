import { createRouter, createWebHistory } from 'vue-router'
import { sessionCache } from '@/utils/cache'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
      component: () => import('@/views/Blog/Blog.vue')
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
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/Admin/Admin.vue')
    },
    {
      path: '/:pathMatch(.*)',
      name: 'NotFound',
      component: () => import('@/views/NotFound/NotFound.vue')
    }
  ]
})

router.beforeEach(to => {
  const userStore = sessionCache.getCache('userStore') || {}
  const { isLogin } = userStore
  if (to.path === '/admin' && !isLogin) {
    return '/NotFound'
  }
})

export default router
