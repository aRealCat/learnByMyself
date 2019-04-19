import utils from '~utils'
import axios from 'axios'

export default {
  setConfig ({ commit }, data) {
    return new Promise((resolve, reject) => {
      utils.http({
        url: process.env.NODE_ENV === 'production' ? 'config.php' : '../static/config.json',
        noErrorDialog: true
      }).then(data => {
        commit('setConfig', data)
        axios.defaults.headers.post['x-csrf-token'] = data._csrf
        axios.defaults.baseURL = data.baseUrl
        resolve()
      }, (err) => {
        reject(err)
      })
    })
  }
}
