import utils from '~utils'

export default {
  updataDisable ({ commit }, {data}) {
    commit('updataDisable', data)
  },
  getSource ({ commit }, {postData}) {
    return new Promise((resolve, reject) => {
      console.log(postData)
      console.log(typeof postData.url.dataSourceUrl)
      if (typeof postData.url.dataSourceUrl === 'object') {
        commit('getSource', {data: postData.url.dataSourceUrl, type: postData.type})
        resolve(postData.url.dataSourceUrl)
      } else {
        utils.http({
          url: postData.url.dataSourceUrl,
          data: postData.data
        }).then(data => {
          commit('getSource', {data: data.data, type: postData.type})
          resolve(data)
        }, (err) => {
          reject(err)
        })
      }
    })
  },
  saveFormData ({ commit }, {data}) {
    return new Promise((resolve, reject) => {
      utils.http({
        url: this.state.config.cusbaseagent.saveUrl,
        data: data
      }).then(data => {
        commit('saveFormData', data)
        resolve(data)
      }, (err) => {
        reject(err)
      })
    })
  },
  getTreeData ({ commit }, {data}) {
    return new Promise((resolve, reject) => {
      utils.http({
        url: this.state.config.cusbaseagent.treeUrl,
        data: data
      }).then(data => {
        commit('getTreeData', data)
        resolve()
      }, (err) => {
        reject(err)
      })
    })
  },
  getFormData ({ commit }, {data}) {
    return new Promise((resolve, reject) => {
      utils.http({
        url: this.state.config.cusbaseagent.dataUrl,
        data: data
      }).then(data => {
        commit('getFormData', data)
        resolve()
      }, (err) => {
        reject(err)
      })
    })
  }
}
