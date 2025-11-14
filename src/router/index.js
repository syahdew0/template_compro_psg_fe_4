import { createRouter, createWebHashHistory } from 'vue-router'
import PageManagement from '@/views/PageManagement.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: PageManagement,
  },
  {
    path: '/careers',
    name: 'careers',
    component: () => import('@/components/careers/CareersPage.vue'),
  },
  {
    path: '/post',
    name: 'post',
    component: () => import('@/components/post/PostManager.vue'),
  },
  {
    path: '/post/:slug',
    name: 'post-detail',
    component: () => import('@/components/post/PostDetail.vue')
  },
  {
    path: '/careers/:slug',
    name: 'careers-detail',
    component: () => import('@/components/careers/CareersDetail.vue')
  }
]


const router = createRouter({
  history: createWebHashHistory('/compro8/'),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }
    if (to.query.scrollTo) {
      return {
        el: `#${to.query.scrollTo}`,
        behavior: 'smooth'
      }
    }
    return { top: 0 }
  }
})

export default router