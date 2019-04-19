import Error from '@/views/error'
import Layout from '@/layout/layout'
import home from '@/views/home/home'
import detail from '@/views/detail'
export default [
  // {
  //   path: '/',
  //   redirect: '/app'
  // },
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/error',
    component: Error
  },
  {
    path: '/home',
    name: 'home',
    component: home,
    meta: { keepAlive: true }
  },
  {
    path: '/detail/:id?',
    name: 'detail',
    component: detail,
    meta: { keepAlive: false }
  }
]
