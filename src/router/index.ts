import { createRouter, createWebHistory, RouterScrollBehavior } from 'vue-router'
import { sessionCache } from '@/utils/cache'
import { normalRoutes, authRoutes } from './config'

const scrollBehavior: RouterScrollBehavior = (to, from, savedPosition) => {
  if (savedPosition && to.meta.keepAlive) return savedPosition
  return { left: 0, top: 0 }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior,
  routes: [...normalRoutes, ...authRoutes]
})

router.beforeEach(to => {
  const userStore = sessionCache.getCache('userStore') || {}
  const { isLogin } = userStore
  if (!isLogin && authRoutes.some(route => route.path === to.path)) return '/NotFound'
})

export default router
