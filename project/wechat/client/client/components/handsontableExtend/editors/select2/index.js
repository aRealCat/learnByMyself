import Handsontable from 'handsontable-pro'
import Vue from 'vue'
import selectComponent from './select2.vue'
import {http} from '~utils'

var SelectEditor = Handsontable.editors.BaseEditor.prototype.extend()
var EditorState = {
  VIRGIN: 'STATE_VIRGIN', // before editing
  EDITING: 'STATE_EDITING',
  WAITING: 'STATE_WAITING', // waiting for async validation
  FINISHED: 'STATE_FINISHED'
}

var onBeforeKeyDown = function (event) {
  let instance = this
  let that = instance.getActiveEditor()
  let ctrlDown

  ctrlDown = (event.ctrlKey || event.metaKey) && !event.altKey
  if (Handsontable.dom.isImmediatePropagationStopped(event)) {
    return
  }
  if (event.keyCode === 17 || event.keyCode === 224 || event.keyCode === 91 || event.keyCode === 93) {
    Handsontable.dom.stopImmediatePropagation(event)
    return
  }

  switch (event.keyCode) {
    case Handsontable.helper.KEY_CODES.ARROW_LEFT:
    case Handsontable.helper.KEY_CODES.ARROW_RIGHT:
    case Handsontable.helper.KEY_CODES.ARROW_UP:
    case Handsontable.helper.KEY_CODES.ARROW_DOWN:
      // 如果select2已打开，则屏蔽上下左右键
      // if (that.DIV.querySelectorAll('ul')[0].style.opacity === '1') {
      Handsontable.dom.stopImmediatePropagation(event)
      // }
      break
    case Handsontable.helper.KEY_CODES.ENTER:
      var selected = that.instance.getSelected()[0]// ht升级了api
      var isOneSelect = that.instance.getSelected().length === 1
      var isMultipleSelection = !(selected[0] === selected[2] && selected[1] === selected[3])
      if ((!isMultipleSelection || event.altKey) && isOneSelect) {
        if (that.isOpened()) {
          // 如果select2已打开，则屏蔽handsontable回车键监听
          Handsontable.dom.stopImmediatePropagation(event)
        }
      }
      event.preventDefault()
      break
    case Handsontable.helper.KEY_CODES.A:
    case Handsontable.helper.KEY_CODES.X:
    case Handsontable.helper.KEY_CODES.C:
    case Handsontable.helper.KEY_CODES.V:
      if (ctrlDown) {
        Handsontable.dom.stopImmediatePropagation(event)
      }
      break
    case Handsontable.helper.KEY_CODES.BACKSPACE:
    case Handsontable.helper.KEY_CODES.DELETE:
    case Handsontable.helper.KEY_CODES.HOME:
    case Handsontable.helper.KEY_CODES.END:
      Handsontable.dom.stopImmediatePropagation(event)
      break
  }
}

SelectEditor.prototype.init = function () {
  this.DIV = document.createElement('div')
  Handsontable.dom.addClass(this.DIV, 'handsontableInputHolder')
  this.DIV.style.display = 'none'
  this.instance.rootElement.appendChild(this.DIV)
  this.registerHooks()
}

SelectEditor.prototype.prepare = function (row, col, prop, td, originalValue, cellProperties) {
  Handsontable.editors.BaseEditor.prototype.prepare.apply(this, arguments)
}

SelectEditor.prototype.getValue = function () {
  return this.DIV.value
}

SelectEditor.prototype.setValue = function (value) {
  this.instance.setDataAtCell(this.row, this.col, value)
  this.DIV.value = value
  this.instance.render()
}

SelectEditor.prototype.registerHooks = function () {
  this.instance.addHook('afterScrollHorizontally', () => this.refreshDimensions())
  this.instance.addHook('afterScrollVertically', () => this.refreshDimensions())
  this.instance.addHook('afterColumnResize', () => this.refreshDimensions())
  this.instance.addHook('afterRowResize', () => this.refreshDimensions())
}

function getSourceData (options, requestUrl, postParam, postData) {
  return new Promise((resolve, reject) => {
    if (!postParam) {
      // 无需动态过滤
      resolve(options)
      return
    }

    let sign = requestUrl.indexOf('?') === -1 ? '?' : '&'
    requestUrl += sign + postParam + '=' + postData

    http({
      url: requestUrl,
      method: 'GET'
    }).then(res => {
      resolve(res.data)
    })
  })
}

SelectEditor.prototype.open = function () {
  this.refreshDimensions()
  this._opened = false
  Handsontable.dom.empty(this.DIV)
  let handsontableSelect = document.createElement('handsontable-select')
  let currentValue = this.instance.getDataAtCell(this.row, this.col)
  handsontableSelect.setAttribute('id', 'id')
  this.DIV.appendChild(handsontableSelect)

  let storePlugin = this.instance.getPlugin('StorePlugin')
  let style = storePlugin.style
  let options = style.body.sourceData[this.prop] || []
  let requestUrl = style.source[this.cellProperties.source].dataSourceUrl
  let postParam = this.cellProperties.postParam || ''
  let postData = ''
  if (postParam) {
    postData = this.instance.getDataAtRowProp(this.row, this.cellProperties.postParam)
  }

  var _this = this
  getSourceData(options, requestUrl, postParam, postData).then(optionData => {
    new Vue({
      template: `
      <div class="height-100-percent width-100-percent">
      <div class="disaplay-relative height-100-percent width-100-percent"><select-component ref="select" :options="options" @change="change" @close="close" @tab="tab" :currentValue="currentValue"></select-component></div>
      <i class="el-icon-caret-bottom searchIcon" @click="search"></i>
      </div>`,
      components: {
        selectComponent
      },
      data () {
        return {
          currentValue,
          options: optionData
        }
      },
      methods: {
        tab () {
          this.$destroy() // 解决组件叠加问题
          _this.instance.selectCell(_this.row, _this.col + 1) // 向右移动
        },
        close (value) {
          this.$destroy() // 解决组件叠加问题
          _this.instance.selectCell(_this.row, _this.col) // 按下esc键
        },
        change (value) {
          _this.setValue(value)
        },
        search () {
          // 触发afterSelectSearchIcon 捕捉点击参照按钮事件
          // afterSelectSearchIcon 钩子名在plugins/addCusHookPlugin 中注册
          Handsontable.hooks.run(_this.instance, 'afterClickSearchIcon', [_this.row, _this.prop])
        }
      }
    }).$mount('#id')
    this.DIV.style.display = ''
    this.instance.addHook('beforeKeyDown', onBeforeKeyDown)
  })
}

SelectEditor.prototype.focus = function () {
  this.DIV.focus()
}

SelectEditor.prototype.close = function () {
  this._opened = false
  this.DIV.style.display = 'none'
  this.instance.removeHook('beforeKeyDown', onBeforeKeyDown)
}

// SelectEditor.prototype.refreshValue = function () {
//   let sourceData = this.instance.getSourceDataAtCell(this.row, this.prop)
//   this.originalValue = sourceData
//   this.refreshDimensions()
// }

SelectEditor.prototype.refreshDimensions = function () {
  if (this.state !== EditorState.EDITING) {
    return
  }
  this.TD = this.getEditedCell()
  if (!this.TD) {
    console.log('close')
    this.close()
    return
  }
  let width = Handsontable.dom.outerWidth(this.TD) + 1
  let height = Handsontable.dom.outerHeight(this.TD) + 1
  let currentOffset = Handsontable.dom.offset(this.TD)
  let containerOffset = Handsontable.dom.offset(this.instance.rootElement)
  let scrollableContainer = Handsontable.dom.getScrollableElement(this.TD)
  let editTop = currentOffset.top - containerOffset.top - 1 - (scrollableContainer.scrollTop || 0)
  let editLeft = currentOffset.left - containerOffset.left - 1 - (scrollableContainer.scrollLeft || 0)
  let editorSection = this.checkEditorSection()
  let cssTransformOffset
  // var settings = this.instance.getSettings()
  // var rowHeadersCount = settings.rowHeaders ? 1 : 0
  // var colHeadersCount = settings.colHeaders ? 1 : 0
  switch (editorSection) {
    case 'top':
      cssTransformOffset = Handsontable.dom.getCssTransform(this.instance.view.wt.wtOverlays.topOverlay.clone.wtTable.holder.parentNode)
      break
    case 'left':
      cssTransformOffset = Handsontable.dom.getCssTransform(this.instance.view.wt.wtOverlays.leftOverlay.clone.wtTable.holder.parentNode)
      break
    case 'top-left-corner':
      cssTransformOffset = Handsontable.dom.getCssTransform(this.instance.view.wt.wtOverlays.topLeftCornerOverlay.clone.wtTable.holder.parentNode)
      break
    case 'bottom-left-corner':
      cssTransformOffset = Handsontable.dom.getCssTransform(this.instance.view.wt.wtOverlays.bottomLeftCornerOverlay.clone.wtTable.holder.parentNode)
      break
    case 'bottom':
      cssTransformOffset = Handsontable.dom.getCssTransform(this.instance.view.wt.wtOverlays.bottomOverlay.clone.wtTable.holder.parentNode)
      break
  }
  if (this.instance.getSelected()[0] === 0) {
    editTop += 1
  }
  if (this.instance.getSelected()[1] === 0) {
    editLeft += 1
  }
  var selectStyle = this.DIV.style
  if (cssTransformOffset && cssTransformOffset !== -1) {
    selectStyle[cssTransformOffset[0]] = cssTransformOffset[1]
  } else {
    Handsontable.dom.resetCssTransform(this.DIV)
  }
  var cellComputedStyle = window.getComputedStyle(this.TD)
  if (parseInt(cellComputedStyle.borderTopWidth, 10) > 0) {
    height -= 1
  }
  if (parseInt(cellComputedStyle.borderLeftWidth, 10) > 0) {
    width -= 1
  }

  selectStyle.height = height + 'px'
  selectStyle.width = width + 'px'
  selectStyle.top = editTop + 'px'
  selectStyle.left = editLeft + 'px'
  selectStyle.margin = '0px'
}

SelectEditor.prototype.getEditedCell = function () {
  var editorSection = this.checkEditorSection()
  var editedCell
  switch (editorSection) {
    case 'top':
      editedCell = this.instance.view.wt.wtOverlays.topOverlay.clone.wtTable.getCell({
        row: this.row,
        col: this.col
      })
      this.DIV.style.zIndex = 101
      break
    case 'corner':
      editedCell = this.instance.view.wt.wtOverlays.topLeftCornerOverlay.clone.wtTable.getCell({
        row: this.row,
        col: this.col
      })
      this.DIV.style.zIndex = 103
      break
    case 'left':
      editedCell = this.instance.view.wt.wtOverlays.leftOverlay.clone.wtTable.getCell({
        row: this.row,
        col: this.col
      })
      this.DIV.style.zIndex = 102
      break
    default:
      editedCell = this.instance.getCell(this.row, this.col)
      this.DIV.style.zIndex = ''
      break
  }
  return editedCell !== -1 && editedCell !== -2 ? editedCell : void 0
}

export default SelectEditor
