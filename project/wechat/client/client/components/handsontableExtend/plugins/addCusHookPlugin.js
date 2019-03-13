/**
 * 增加自定义钩子函数
 * 例如：
 * 点击下拉控件弹出层
 */
import Handsontable from 'handsontable-pro'

// 触发：Handsontable.hooks.run(instance, hookName, param) 参数一：当前实例 参数二：钩子名 参数三：返回给回调函数的参数
// 接受：hookName (param) {}

// 注册
Handsontable.hooks.register('afterClickSearchIcon') // 下拉控件的参照按钮
Handsontable.hooks.register('afterClickImage') // 点击图片

Handsontable.hooks.register('afterSelectAll') // 点击全选按钮
Handsontable.hooks.register('afterSelectOne') // 勾选checkbox
Handsontable.hooks.register('clearSelectAll') // 通过数据取消全选

Handsontable.hooks.register('afterClickButton') // 点击核销单操作按钮
