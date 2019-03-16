import Error from '@/views/error'
import Layout from '@/layout/layout'
import goldhistory from '@/views/goldhistory/goldhistory'
import userlogin from '@/views/userlogin'
import register from '@/views/register'
import chat from '@/views/chat'
export default [
  {
    path: '/',
    redirect: '/userlogin'
  },
  {
    path: '/error',
    component: Error
  },
  {
    path: '/userlogin',
    component: userlogin,
    name: 'userlogin'
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
