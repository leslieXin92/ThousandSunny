import { createRouter, createWebHistory } from 'vue-router'
import usePermission from '@/hooks/usePermission'
import { normalRoutes, authRoutes } from './config'
import type { RouterScrollBehavior } from 'vue-router'

const scrollBehavior: RouterScrollBehavior = (to, _, savedPosition) => {
  if (savedPosition && to.meta.keepAlive) return savedPosition
  return { left: 0, top: 0 }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior,
  routes: [...normalRoutes, ...authRoutes]
})

router.beforeEach(to => {
  const auth = usePermission('normal')
  if (!auth && authRoutes.some(route => route.path === to.path)) return '/NotFound'
})

export default router
