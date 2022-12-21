import { createRouter, createWebHistory } from 'vue-router'

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
      name: '404',
      component: () => import('@/views/NotFound/NotFound.vue')
    }
  ]
})

export default router
