// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './app'
import Router from 'vue-router'
import Vuex from 'vuex'
import createStore from '@/store/store'
import createRouter from '@/router/router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import './assets/styles/global.css'

import 'font-awesome/css/font-awesome.min.css'

Vue.use(Vuex)
Vue.use(Router)
Vue.use(ElementUI, { size: 'mini' })

export default () => {
  const router = createRouter()
  const store = createStore()

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  return { app, router, store }
}
