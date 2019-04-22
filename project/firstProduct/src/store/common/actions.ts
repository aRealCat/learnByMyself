
import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
import { http } from '../../utils/index'
export default {
    setConfig({ commit }) {
      return new Promise((resolve, reject) => {
         http({
          method: 'get',
          url:
            (process.env.NODE_ENV === 'production'
              ? 'config.php'
              : '../static/config.json'),
          noErrorDialog: true
        }).then((response: any) => {
          commit('setConfig', response)
          axios.defaults.headers.post['x-csrf-token'] = response._csrf
          axios.defaults.baseURL = response.baseUrl
          resolve()
        }).catch( (error) => {
          reject(error)
        })
      })
    },
    updateConfig({commit}, data) {
      commit('setConfig', data)
    }
}
