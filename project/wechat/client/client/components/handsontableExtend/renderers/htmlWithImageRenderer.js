import _ from 'lodash'
import Handsontable from 'handsontable-pro'
import {toImg} from '~utils'

var isJson = function (str) {
  if (typeof str === 'string') {
    return str.indexOf('{') > -1
  }
  return false
}

var updateRemark = function (data) {
  if (!data) {
    return ''
  }

  if (!isJson(data)) {
    return data
  }

  if (isJson(data)) {
    data = JSON.parse(_.clone(data))
  }
  var result = data.text
  var reg

  if (data.image && data.text.indexOf('#') !== -1) {
    _.forEach(data.image, function (value, key) {
      reg = '#' + key + '#'
      result = result.replace(new RegExp(reg, 'g'), '<img src=' + toImg({
        md5: key,
        h: 200
      }) + ' height="200">')
    })
  }

  return result
}

function HtmlWithImageRenderer (instance, td, row, col, prop, value, cellProperties) {
  Handsontable.renderers.getRenderer('html').apply(this, arguments)
  Handsontable.dom.empty(td)
  let currentTd
  if (value && isJson(value)) {
    currentTd = updateRemark(value, instance)
  }

  if (typeof currentTd !== 'undefined') {
    td.innerHTML = currentTd
    return td
  }
}

export default HtmlWithImageRenderer
