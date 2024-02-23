import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useTokenStore } from '@/stores/token'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/lungrads/:studyDate/:patientId/:accessionNumber',
      name: 'lungrads',
      component: () => import('../views/LungRadsView.vue')
    }
  ]
})

router.beforeEach(async (to) => {
  const { token } = useTokenStore()
  if (!token && to.name !== 'login') {
    return { name: 'login', replace: true, query: { redirect: to.fullPath } }
  }
  if (token && to.name === 'login') {
    return { name: 'home', replace: true }
  }
})

export default router
