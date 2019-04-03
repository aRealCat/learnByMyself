
import Vuex from 'vuex';
import Vue from 'vue';
import axios from 'axios';

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    config: {},
    user: {}
  },
  mutations: {
    setConfig(state, data) {
      state.config = data
    },
    setUser(state, data) {
      state.user = data
    }
  },
  actions: {
    setConfig({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get(process.env.NODE_ENV === 'production' ? 'config.php' : '../static/config.json').then((response) => {
          commit('setConfig', response.data)
          axios.defaults.headers.post['x-csrf-token'] = response.data._csrf
          axios.defaults.baseURL = response.data.baseUrl
          resolve()
        }).catch( (error) => {
          reject(error)
        });
      });
    },
    setUser({ commit }, { user }) {
      commit('setUser', {user: user})
    }
  },
});
