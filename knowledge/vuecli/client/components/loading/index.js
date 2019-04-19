import LoadingComponent from './loading'
const Loading = {
  install: Vue => {
    Vue.component('myLoading', LoadingComponent)
  }
}
export default Loading
