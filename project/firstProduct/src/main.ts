import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/styles/reglobal.css'
import './assets/styles/global.css'
import './assets/styles/reset.css'
import 'font-awesome/css/font-awesome.min.css'
Vue.config.productionTip = false
Vue.use(ElementUI, { size: 'mini' })
if (process.env.NODE_ENV !== 'production') {
  require('./mock')
}
let app
store.dispatch('setConfig').then((data) => {
  app = new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount('#app')
})
export function getApp() {
  return {app, router, store}
}
