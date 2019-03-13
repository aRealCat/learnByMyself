import Handsontable from 'handsontable-pro'

function renderer (instance, TD, row, col, prop, value, cellProperties) {
  if (cellProperties.className) {
    Handsontable.dom.addClass(TD, cellProperties.className)
  }
  if (cellProperties.readOnly) {
    Handsontable.dom.addClass(TD, 'htDimmed')
  }
  TD.innerHTML = value
}
export default renderer
