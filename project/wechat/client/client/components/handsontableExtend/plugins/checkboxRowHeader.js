import Handsontable from 'handsontable-pro'

function CheckboxRowHeader () {
  var eventManager = new Handsontable.EventManager(this)

  this.beforeInitWalkontable = function (walkontableConfig) {
    var instance = this
    var baseRowHeaders = walkontableConfig.rowHeaders
    // var baseColHeaders = walkontableConfig.columnHeaders
    var pluginEnabled = !!(instance.getSettings().checkboxPlugin)
    var headerCheckbox
    let totalRowsNumber = instance.countRows() // 有效数据总行数
    let checkedNumber = 0 // 已勾选行数
    // var selectedArry = instance.getSettings().checkboxPlugin

    walkontableConfig.columnHeaders = function (col, TH) {
      var headerRenderers = []
      if (instance.hasColHeaders()) {
        headerRenderers.push(function (col, elem) {
          (0, Handsontable.dom.empty)(elem)
          if (pluginEnabled && col === -2) {
            headerCheckbox = document.createElement('input')
            headerCheckbox.type = 'checkbox'

            if (totalRowsNumber === 0) {
              headerCheckbox.disabled = true
            }

            headerCheckbox.checked = totalRowsNumber !== 0 && checkedNumber === totalRowsNumber // 表头checkbox状态
            headerCheckbox.indeterminate = checkedNumber > 0 && (checkedNumber < totalRowsNumber); // 表头checkbox半选效果
            (0, Handsontable.dom.addClass)(elem, 'htCenter htMiddle')

            elem.appendChild(headerCheckbox)
            eventManager.addEventListener(headerCheckbox, 'click', function (event) {
              checkedNumber = event.target.checked ? totalRowsNumber : 0
              Handsontable.hooks.run(instance, 'afterSelectAll', event.target.checked)
            })
          } else {
            instance.view.appendColHeader(col, elem)
          }
        })
      }
      instance.runHooks('afterGetColumnHeaderRenderers', headerRenderers)
      return headerRenderers
    }

    walkontableConfig.rowHeaders = function () {
      var newRowHeader = function (row, elem) {
        let checkbox

        Handsontable.dom.empty(elem)

        elem.className = 'htCenter htMiddle htDimmed current area highlight'

        if (row > -1) {
          // countSelect = 0
          checkbox = document.createElement('input')
          checkbox.setAttribute('type', 'checkbox')
          checkbox.setAttribute('data-row', row)
          checkbox.setAttribute('data-col', '-2')

          checkbox.checked = instance.getDataAtRowProp(row, 'check')

          // if (instance.getSettings().scope.viewName === 'app.orderverify' && instance.getSettings().scope.dataSource && instance.getSettings().scope.dataSource.isReadOnly) {
          //   checkbox.disabled = instance.getSettings().scope.dataSource.isReadOnly
          // }

          // if (instance.getSettings().scope && instance.getSettings().scope.dataSource && instance.getSettings().scope.dataSource.temp && instance.getSettings().scope.dataSource.temp.body && instance.getSettings().scope.dataSource.temp.body && instance.getSettings().scope.dataSource.temp.body.data && instance.getSettings().scope.dataSource.temp.body.data[row]) {
          //   if (typeof instance.getSettings().scope.dataSource.temp.body.data[row].check === 'undefined') {
          //     checkbox.disabled = true
          //   }
          // }

          if (totalRowsNumber && row > totalRowsNumber - 1) {
            checkbox.disabled = true
          }

          // if (instance.isEmptyRow(row)) {
          //   checkbox.disabled = true
          // }

          elem.appendChild(checkbox)

          // if (instance.getSettings().scope && instance.getSettings().scope.dataSource && instance.getSettings().scope.dataSource.data) {
          //   countRows = instance.getSettings().scope.dataSource.data.length
          // }

          // if (instance.getSettings().scope && instance.getSettings().scope.dataSource && instance.getSettings().scope.dataSource.temp && instance.getSettings().scope.dataSource.temp.body && instance.getSettings().scope.dataSource.temp.body) {
          //   tempData = instance.getSettings().scope.dataSource.temp.body || {}
          // }

          eventManager.addEventListener(checkbox, 'change', function (event) {
            if (totalRowsNumber && row > totalRowsNumber - 1) {
              return
            }

            Handsontable.hooks.run(instance, 'afterSelectOne', [row, event.target.checked])

            if (event.target.checked) {
              checkedNumber++
            } else {
              checkedNumber--
            }
            // row = instance.toPhysicalRow(row);
            // 原生过滤后 勾选的行号对应问题
            // instance.getSettings().scope.dataSource.temp.body.data[instance.toPhysicalRow(row)].check = event.target.checked
            // Handsontable.hooks.run(instance, 'afterChange', [
            //   [-1, 'check', event.target.checked, null]
            // ], 'select')

            // for (var i = 0; i < countRows; i++) {
            //   if (tempData.data[i].check === true) {
            //     countSelect++
            //   }
            // }

            // tempData.colCheck = countSelect
          })
        }
      }

      return pluginEnabled ? Array.prototype.concat.call([], newRowHeader, baseRowHeaders()) : baseRowHeaders()
    }

    instance.addHook('clearSelectAll', function () {
      let data = instance.getSourceData()
      data.forEach(row => {
        row.check = false
      })
      checkedNumber = 0
      instance.render()
    })
  }
}

let header = new CheckboxRowHeader()
Handsontable.hooks.add('beforeInitWalkontable', function (walkontableConfig) {
  header.beforeInitWalkontable.call(this, walkontableConfig)
})
