import Handsontable from 'handsontable-pro'

function getClassName (readOnly) {
  if (readOnly) {
    return 'el-button el-button--default el-button--mini is-disabled'
  } else {
    return 'el-button el-button--default el-button--mini'
  }
}

function getButtonDisabled (action, readOnly, lineStatus) {
  let result = true
  switch (action) {
    case 'delivery':
      result = readOnly || !(lineStatus === 0 || lineStatus === 1)
      break
    case 'finish':
      result = readOnly || !(lineStatus === 0 || lineStatus === 1)
      break
    case 'cancel':
      result = readOnly || (lineStatus === 0 || lineStatus === 1)
      break
    case 'abolish':
      result = readOnly || !(lineStatus === 0 || lineStatus === 1)
      break
    case 'overrange':
      result = readOnly || lineStatus === 5
      break
    case 'detail':
      result = lineStatus === 0
      break
  }
  return result
}
// 0:未收货,1收货中,2完成,3废除,4分单,5超单
function ButtonRender (instance, td, row, col, prop, value, cellProperties) {
  let lineStatus = instance.getDataAtRowProp(row, 'lineStatus')
  if (lineStatus == null) {
    // console.log('无 lineStatus 数据')
    return td
  }
  Handsontable.dom.empty(td)

  let eventManager = new Handsontable.EventManager(this)
  let buttons = [{
    action: 'delivery',
    text: '收货'
  }, {
    action: 'finish',
    text: '完成'
  }, {
    action: 'cancel',
    text: '取消'
  }, {
    action: 'abolish',
    text: '废行'
  }, {
    action: 'overrange',
    text: '超单'
  }, {
    action: 'detail',
    text: '详情'
  }]

  let readOnly = false // 需要取自dataSource.isReadOnly

  let div = document.createElement('div')
  div.setAttribute('class', 'el-button-group')

  buttons.forEach(button => {
    let actionButton = document.createElement('button')
    let buttonDisabled = getButtonDisabled(button.action, readOnly, lineStatus)
    actionButton.disabled = buttonDisabled
    actionButton.className = getClassName(buttonDisabled)
    actionButton.innerHTML = button.text
    eventManager.addEventListener(actionButton, 'click', () => {
      Handsontable.hooks.run(instance, 'afterClickButton', [row, button.action])
    })
    div.appendChild(actionButton)
  })
  td.style.textAlign = 'left'
  td.style.padding = '5px'
  td.appendChild(div)

  return td
}

export default ButtonRender
