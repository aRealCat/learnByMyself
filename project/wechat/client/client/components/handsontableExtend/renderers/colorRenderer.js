import Handsontable from 'handsontable-pro'
import _ from 'lodash'

function ColorRenderer (instance, td, row, col, prop, value, cellProperties) {
  let lineStatus = Number(instance.getDataAtRowProp(row, 'lineStatus'))
  if (cellProperties.type && cellProperties.type === 'numeric') {
    // 格式化生效
    Handsontable.renderers.NumericRenderer.apply(this, arguments)
  } else if (cellProperties.prop && cellProperties.prop === 'thumbSrc') {
    (0, Handsontable.renderers.getRenderer)('img').apply(this, arguments)
  } else if (cellProperties.cus_renderer && cellProperties.cus_renderer === 'html') {
    Handsontable.renderers.HtmlRenderer.apply(this, arguments)
  } else if (cellProperties.cus_renderer && cellProperties.cus_renderer === 'htmlWithImage') {
    (0, Handsontable.renderers.getRenderer)('htmlWithImage').apply(this, arguments)
  } else if (cellProperties.cus_renderer && cellProperties.cus_renderer === 'button') {
    (0, Handsontable.renderers.getRenderer)('button').apply(this, arguments)
  } else {
    Handsontable.renderers.TextRenderer.apply(this, arguments)
  }

  if (cellProperties.style) {
    let item = _.find(cellProperties.style, item => {
      return Number(item.data) === lineStatus
    })
    td.style.background = item.background || ''
    td.style.color = item.color || '#000'
  }
  return td
}

export default ColorRenderer
