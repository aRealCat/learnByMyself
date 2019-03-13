import Handsontable from 'handsontable-pro'
import { getDragDirectionAndRange, getDeltas } from 'handsontable/src/plugins/autofill/utils'

Handsontable.plugins.AutoFill.prototype.fillIn = function () {
  if (this.hot.selection.highlight.getFill().isEmpty()) {
    return false
  }

  let cornersOfSelectionAndDragAreas = this.hot.selection.highlight.getFill().getCorners()

  this.resetSelectionOfDraggedArea()

  const cornersOfSelectedCells = this.getCornersOfSelectedCells()
  cornersOfSelectionAndDragAreas = this.hot.runHooks('modifyAutofillRange', cornersOfSelectionAndDragAreas, cornersOfSelectedCells)

  const {
    directionOfDrag,
    startOfDragCoords,
    endOfDragCoords
  } = getDragDirectionAndRange(cornersOfSelectedCells, cornersOfSelectionAndDragAreas)

  if (startOfDragCoords && startOfDragCoords.row > -1 && startOfDragCoords.col > -1) {
    const selectionData = this.getSelectionData()

    this.hot.runHooks('beforeAutofill', startOfDragCoords, endOfDragCoords, selectionData)

    const deltas = getDeltas(startOfDragCoords, endOfDragCoords, selectionData, directionOfDrag)
    let fillData = selectionData

    if (['up', 'left'].indexOf(directionOfDrag) > -1) {
      fillData = []

      let dragLength = null
      let fillOffset = null

      if (directionOfDrag === 'up') {
        dragLength = endOfDragCoords.row - startOfDragCoords.row + 1
        fillOffset = dragLength % selectionData.length

        for (let i = 0; i < dragLength; i++) {
          fillData.push(selectionData[(i + (selectionData.length - fillOffset)) % selectionData.length])
        }
      } else {
        dragLength = endOfDragCoords.col - startOfDragCoords.col + 1
        fillOffset = dragLength % selectionData[0].length

        for (let i = 0; i < selectionData.length; i++) {
          fillData.push([])
          for (let j = 0; j < dragLength; j++) {
            fillData[i].push(selectionData[i][(j + (selectionData[i].length - fillOffset)) % selectionData[i].length])
          }
        }
      }
    }

    if (startOfDragCoords.col === endOfDragCoords.col && deltas[0][0] !== 0) {
      let last = Number(selectionData[selectionData.length - 1][0])
      let delta = Number(deltas[0][0])

      let data = []
      let temp
      for (var i = 1; i < endOfDragCoords.row - startOfDragCoords.row + 2; i++) {
        temp = []
        temp.push(Number(last + delta * i) + '')
        data.push(temp)
      }
      fillData = data
    }

    this.hot.populateFromArray(
      startOfDragCoords.row,
      startOfDragCoords.col,
      fillData,
      endOfDragCoords.row,
      endOfDragCoords.col,
      `${this.pluginName}.fill`,
      null,
      directionOfDrag,
      deltas
    )

    this.setSelection(cornersOfSelectionAndDragAreas)
  } else {
    // reset to avoid some range bug
    this.hot._refreshBorders()
  }

  return true
}
