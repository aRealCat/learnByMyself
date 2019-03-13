import Error from '@/views/error'
import Layout from '@/layout/layout'
import goldhistory from '@/views/goldhistory/goldhistory'
import login from '@/views/login'
import register from '@/views/register'
import chat from '@/views/chat'
export default [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/error',
    component: Error
  },
  {
    path: '/login',
    component: login,
    name: 'login'
  },
  {
    path: '/regist',
    component: register,
    name: 'regist'
  },
  {
    path: '/chat',
    component: chat,
    name: 'chat'
  },
  {
    path: '/app',
    component: Layout,
    children: [
      {
        path: '/goldhistory',
        name: 'goldhistory',
        component: goldhistory
      }
    ]
  }
]
