// import _ from 'lodash'
export default {
  getSource (state, object) {
  },
  getTreeData (state, data) {
    state.treeData = data
  },
  getFormData (state, data) {
    state.formData = data
  },
  updataDisable (state, data) {
    state.disabledState = data
  },
  saveFormData (state, data) {
    // state.formData = data
  }
}
