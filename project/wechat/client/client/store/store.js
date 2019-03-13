import Vuex from 'vuex'
import commonState from './common/state'
import commonMutation from './common/mutation'
import commonAction from './common/action'

import cusbaseagent from './modules/cusbaseagent/store'

export default () => {
  const store = new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: commonState,
    mutations: commonMutation,
    actions: commonAction,
    modules: {
      cusbaseagent
    }
  })
  return store
}
