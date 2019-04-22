
import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
import { http } from './utils/index'
import actions from './store/common/actions'
import mutations from './store/common/mutations'
import state from './store/common/state'
import home from './store/home/store'
Vue.use(Vuex)
export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
    home
  }
})
