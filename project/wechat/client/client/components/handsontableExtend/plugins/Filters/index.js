import Handsontable from 'handsontable-pro'
import { rangeEach } from 'handsontable/src/helpers/number'
import { arrayMap } from 'handsontable/src/helpers/array'
// import _ from 'lodash'

const SUPPORT_SET_CONSTRUCTOR = new Set([1]).has(1)
const CONDITION_NONE = 'none'

function createArrayAssertion (initialData) {
  let dataset = initialData

  if (SUPPORT_SET_CONSTRUCTOR) {
    dataset = new Set(dataset)
  }

  return function (value) {
    let result

    if (SUPPORT_SET_CONSTRUCTOR) {
      result = dataset.has(value)
    } else {
      /* eslint-disable no-bitwise */
      result = !!~dataset.indexOf(value)
    }

    return result
  }
}

function clone (data) {
  return JSON.parse(JSON.stringify(data))
}
/**
 * 非原生过滤 不调用原生过滤方法
 */
Handsontable.proPlugins.Filters.prototype.onActionBarSubmit = function (submitType) {
  if (submitType === 'accept') {
    // ---add---start---
    this.action = 'filter'
    // 当前操作为filter
    // ---add---end---

    const selectedColumn = this.getSelectedColumn()
    const physicalIndex = selectedColumn && selectedColumn.physicalIndex
    const byConditionState1 = this.components.get('filter_by_condition').getState()
    const byConditionState2 = this.components.get('filter_by_condition2').getState()
    const byValueState = this.components.get('filter_by_value').getState()

    // ---add---start---
    if (!byValueState.args[0].length) {
      // 清除所有后确认 视为取消操作
      this.dropdownMenuPlugin.close()
      return
    }

    if (this.byValueState) {
      this.lastValueState = this.byValueState // 记录上次过滤项
    }
    this.byValueState = byValueState.args[0]
    // ---add---end---

    const operation = this.getOperationBasedOnArguments(this.components.get('filter_operators').getActiveOperationId(),
      byConditionState1, byConditionState2, byValueState)

    this.conditionUpdateObserver.groupChanges()
    this.conditionCollection.clearConditions(physicalIndex)

    if (byConditionState1.command.key === CONDITION_NONE && byConditionState2.command.key === CONDITION_NONE && byValueState.command.key === CONDITION_NONE) {
      this.conditionCollection.removeConditions(physicalIndex)
    } else {
      if (byConditionState1.command.key !== CONDITION_NONE) {
        this.conditionCollection.addCondition(physicalIndex, byConditionState1, operation)

        if (byConditionState2.command.key !== CONDITION_NONE) {
          this.conditionCollection.addCondition(physicalIndex, byConditionState2, operation)
        }
      }

      if (byValueState.command.key !== CONDITION_NONE) {
        this.conditionCollection.addCondition(physicalIndex, byValueState, operation)
      }
    }

    this.conditionUpdateObserver.flush()

    this.components.get('filter_operators').saveState(physicalIndex)
    this.components.get('filter_by_value').saveState(physicalIndex)
    this.saveHiddenRowsCache(physicalIndex)

    this.trimRowsPlugin.trimmedRows.length = 0

    // ---add---start---
    this.lastFilterCol = selectedColumn
    // 记录当次过滤列

    if (this.hot.getSettings().dynamicFilter !== true) {
      // 原生过滤
      this.filter()
    }
    // ---add---end---

    // ---origin---start---
    // this.filter();
    // ---origin---end---
  } else {
    this.action = 'cancel'
  }
  this.dropdownMenuPlugin.close()
}

/**
 * 改写原生过滤中 合并单元格未动态更新
 */
Handsontable.proPlugins.Filters.prototype.filter = function () {
  const dataFilter = this._createDataFilter()
  const needToFilter = !this.conditionCollection.isEmpty()
  let visibleVisualRows = []

  // ---add---start---
  let storePlugin = this.hot.getPlugin('StorePlugin')
  let originMergeCells = clone(storePlugin.originMergeCells || []) // 记录一份未过滤前的合并单元格信息
  let copyMergeCells = clone(originMergeCells) // 复制一份出来
  // ---add---end---

  const conditions = this.conditionCollection.exportAllConditions()
  const allowFiltering = this.hot.runHooks('beforeFilter', conditions)

  if (allowFiltering !== false) {
    if (needToFilter) {
      const trimmedRows = []

      this.trimRowsPlugin.trimmedRows.length = 0

      visibleVisualRows = arrayMap(dataFilter.filter(), rowData => rowData.meta.visualRow)

      const visibleVisualRowsAssertion = createArrayAssertion(visibleVisualRows)

      rangeEach(this.hot.countSourceRows() - 1, (row) => {
        if (!visibleVisualRowsAssertion(row)) {
          trimmedRows.push(row)
        }
      })

      // ---动态处理合并单元格数据---start---
      if (copyMergeCells && copyMergeCells.length > 0) {
        for (let i = 0; i < trimmedRows.length; i++) {
          let row = trimmedRows[i]
          for (let j = 0; j < copyMergeCells.length; j++) {
            let cellsTemp = copyMergeCells[j]
            let cells = originMergeCells[j]

            if (row >= cells.row && row <= (cells.row + cells.rowspan - 1)) {
              // 在合并单元格内
              if (cells.rowspan > 1) {
                cellsTemp.rowspan--
              }
            }

            if (row < cells.row) {
              // 在合并单元格前
              cellsTemp.row--
            }
          }
        }

        this.hot.updateSettings({
          mergeCells: copyMergeCells
        })
      }
      // ---动态处理合并单元格数据---end---

      this.trimRowsPlugin.trimRows(trimmedRows)

      if (!visibleVisualRows.length) {
        this.hot.deselectCell()
      }
    } else {
      this.trimRowsPlugin.untrimAll()

      // --- 还原合并单元格---start---
      if (originMergeCells.length) {
        this.hot.updateSettings({mergeCells: originMergeCells})
      }
      // ---还原合并单元格---end
    }
  }

  this.hot.view.wt.wtOverlays.adjustElementsSize(true)
  this.hot.render()
  this.clearColumnSelection()

  this.hot.runHooks('afterFilter', conditions)
}
