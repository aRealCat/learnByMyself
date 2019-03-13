import Handsontable from 'handsontable-pro'
import { arrayEach } from 'handsontable/src/helpers/array'
import CellCoords from 'handsontable/src/3rdparty/walkontable/src/cell/coords'
import CellRange from 'handsontable/src/3rdparty/walkontable/src/cell/range'

Handsontable.plugins.MergeCells.prototype.generateFromSettings = function (settings) {
  if (Array.isArray(settings)) {
    let populationArgumentsList = []

    arrayEach(settings, (setting) => {
      if (!this.validateSetting(setting)) {
        return
      }

      const highlight = new CellCoords(setting.row, setting.col)
      const rangeEnd = new CellCoords(setting.row + setting.rowspan - 1, setting.col + setting.colspan - 1)
      const mergeRange = new CellRange(highlight, highlight, rangeEnd)

      populationArgumentsList.push(this.mergeRange(mergeRange, true, true))
    })

    // remove 'empty' setting objects, caused by improper merge range declarations
    // populationArgumentsList = populationArgumentsList.filter(value => value !== true)

    // ----屏蔽---start---屏蔽初始化合并单元格时会清空非第一个单元格值问题---
    // const bulkPopulationData = this.getBulkCollectionData(populationArgumentsList)

    // this.hot.populateFromArray(...bulkPopulationData)
    // ----屏蔽---end---
  }
}
