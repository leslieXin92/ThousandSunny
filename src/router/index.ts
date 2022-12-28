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
      path: '/blogList',
      name: 'blogList',
      component: () => import('@/views/BlogList/BlogList.vue')
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
