import Handsontable from 'handsontable-pro'
import { isUndefined } from 'handsontable/src/helpers/mixed'
import { arrayMap } from 'handsontable/src/helpers/array'

function getFullSortConfiguration (sortConfig) {
  if (isUndefined(sortConfig)) {
    return []
  }

  if (Array.isArray(sortConfig)) {
    return sortConfig
  }

  return [sortConfig]
}

function warnAboutNotValidatedConfig () {
  console.warn('Sort configuration failed to validate properly.')
}

Handsontable.plugins.ColumnSorting.prototype.sort = function (sortConfig) {
  const currentSortConfig = this.getSortConfig()

  // We always pass to hook configs defined as an array to `beforeColumnSort` and `afterColumnSort` hooks.
  // DIFF - MultiColumnSorting & ColumnSorting: extra `slice` method call.
  const destinationSortConfigs = getFullSortConfiguration(sortConfig).slice(0, 1)

  const sortPossible = this.areValidSortConfigs(destinationSortConfigs)
  const allowSort = this.hot.runHooks('beforeColumnSort', currentSortConfig, destinationSortConfigs, sortPossible)

  if (sortPossible === false) {
    warnAboutNotValidatedConfig()
  }

  if (allowSort === false) {
    return
  }

  if (sortPossible) {
    const translateColumnToPhysical = ({ column: visualColumn, ...restOfProperties }) =>
      ({ column: this.hot.toPhysicalColumn(visualColumn), ...restOfProperties })
    const internalSortStates = arrayMap(destinationSortConfigs, columnSortConfig => translateColumnToPhysical(columnSortConfig))

    this.columnStatesManager.setSortStates(internalSortStates)
    // this.sortByPresetSortStates() 屏蔽默认排序
    this.saveAllSortSettings()

    this.hot.render()
    this.hot.view.wt.draw(true) // TODO: Workaround? One test won't pass after removal. It should be refactored / described.
  }

  this.hot.runHooks('afterColumnSort', currentSortConfig, this.getSortConfig(), sortPossible)
}
