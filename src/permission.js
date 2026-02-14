import router from '@/router'
import useSession from '@/store/session'
import { message } from '@/libs'
router.beforeEach((to, from, next) => {
  console.log(to, to.meta.user);
  if (!to.meta.user) {
    next()
    return
  }
  const session = useSession()
  if (session.token) {
    next()
  } else {
    message('warn', '登录失效，请重新登录')
    next('/login')
  }
  next()
})