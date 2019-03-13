import Handsontable from 'handsontable-pro'

Handsontable.hooks.register('dblClick')
Handsontable.hooks.register('dblClickCell')
Handsontable.hooks.register('dblClickColHeader')
Handsontable.hooks.register('dblClickRowHeader')
Handsontable.hooks.register('dblClickCorner')

function DoubleClick () {
  var plugin = this
  var eventManager = new Handsontable.EventManager(this)
  var instance = null

  Handsontable.hooks.add('dblClick', function (row, col) {
    if (instance.getSettings().dblClick) {
      instance.getSettings().dblClick(row, col, instance)
    }
  })

  Handsontable.hooks.add('dblClickCell', function (row, col) {
    if (instance.getSettings().dblClickCell) {
      instance.getSettings().dblClickCell(row, col, instance)
    }
  })

  Handsontable.hooks.add('dblClickColHeader', function (col) {
    if (instance.getSettings().dblClickColHeader) {
      instance.getSettings().dblClickColHeader(col, instance)
    }
  })

  Handsontable.hooks.add('dblClickRowHeader', function (row) {
    if (instance.getSettings().dblClickRowHeader) {
      instance.getSettings().dblClickRowHeader(row, instance)
    }
  })

  Handsontable.hooks.add('dblClickCorner', function (row, col) {
    if (instance.getSettings().dblClickCorner) {
      instance.getSettings().dblClickCorner(row, col, instance)
    }
  })

  var handleDblClick = function (e) {
    var target = e.target
    if (['TD', 'TH'].indexOf(target.nodeName) === -1) {
      target = Handsontable.dom.closest(target, 'TH') || Handsontable.dom.closest(target, 'TD')
    }
    if (!target) {
      return
    }
    var coords = instance.view.wt.wtTable.getCoords(target)
    var row = coords.row
    var col = coords.col
    plugin.dblClick(row, col)
    if (row >= 0 && col >= 0) {
      plugin.dblClickCell(row, col)
    }
    if (row < 0) {
      plugin.dblClickColHeader(col)
    }
    if (col < 0) {
      plugin.dblClickRowHeader(row)
    }
    if (row < 0 && col < 0) {
      plugin.dblClickCorner(row, col)
    }
  }

  this.init = function () {
    instance = this
    eventManager.addEventListener(instance.rootElement, 'dblclick', handleDblClick)
  }

  this.dblClick = function (row, col) {
    Handsontable.hooks.run(this, 'dblClick', row, col)
  }

  this.dblClickCell = function (row, col) {
    Handsontable.hooks.run(this, 'dblClickCell', row, col)
  }

  this.dblClickColHeader = function (col) {
    Handsontable.hooks.run(this, 'dblClickColHeader', col)
  }

  this.dblClickRowHeader = function (row) {
    Handsontable.hooks.run(this, 'dblClickRowHeader', row)
  }

  this.dblClickCorner = function (row, col) {
    Handsontable.hooks.run(this, 'dblClickCorner', row, col)
  }

  this.destroy = function () {
    eventManager.removeEventListener(instance.rootElement, 'dblclick', handleDblClick)
  }
}

var doubleClick = new DoubleClick()

Handsontable.hooks.add('afterInit', function () {
  if (typeof this.getSettings().dblClick !== 'function') {
    return
  }
  doubleClick.init.call(this)
})

Handsontable.hooks.add('afterUpdateSettings', function () {
  if (typeof this.getSettings().dblClick !== 'function') {
    return
  }
  doubleClick.destroy()
  doubleClick.init.call(this)
})

Handsontable.hooks.add('afterDestroy', function () {
  if (typeof this.getSettings().dblClick !== 'function') {
    return
  }
  doubleClick.destroy()
})
