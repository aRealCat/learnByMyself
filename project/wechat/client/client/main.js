import createApp from './create-app'
// 创建vue实例
const {
  app,
  router,
  store
} = createApp()

// 整个项目初始化的时候 请求config参数将全局参数存入store
router.onReady(() => {
  store.dispatch('setConfig').then((data) => {
    app.$mount('#app') // 挂载到html的div
  })
})

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     // 需要判断权限的节点
//     if (store.state.config.menu.includes(to.name)) {
//       next()
//     } else {
//       next(false)
//       showWarningModal('您无权进入')
//     }
//   } else {
//     next()
//   }
// })

export function getApp () {
  return {
    app,
    router,
    store
  }
}
