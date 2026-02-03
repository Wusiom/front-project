import { createRouter, createWebHistory } from 'vue-router'
import { isMobileTerminal } from '@/utils/flexible'
import pcRoute from './module/pc-route'
import mobileRoute from './module/mobile-route'
const router = createRouter({
  history: createWebHistory(),
  routes: isMobileTerminal.value ? mobileRoute : pcRoute,
})
export default router