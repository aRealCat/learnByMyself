import Vuex from 'vuex'
import commonState from './common/state'
import commonMutation from './common/mutation'
import commonAction from './common/action'

export default () => {
  const store = new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: commonState,
    mutations: commonMutation,
    actions: commonAction,
    modules: {
    }
  })
  return store
}
