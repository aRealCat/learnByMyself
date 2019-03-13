import Handsontable from 'handsontable-pro'

import * as editors from './editors'
import * as plugins from './plugins'
import * as validators from './validators'
import * as renderers from './renderers'
import './language'

Object.keys(editors).forEach(editor => {
  // 注册edtor
  Handsontable.editors.registerEditor(editor, editors[editor])
})

Object.keys(plugins).forEach(plugin => {
  // 注册plugin
  Handsontable.plugins.registerPlugin(plugin, plugins[plugin])
})

Object.keys(validators).forEach(validator => {
  // 注册validator
  Handsontable.validators.registerValidator(validator, validators[validator])
})

Object.keys(renderers).forEach(renderer => {
  // 注册renderer
  Handsontable.renderers.registerRenderer(renderer, renderers[renderer])
})
