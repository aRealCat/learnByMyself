import Handsontable from 'handsontable-pro'
import moment from 'moment'
import { isMetaKey } from 'handsontable/src/helpers/unicode'
import { outerHeight } from 'handsontable/src/helpers/dom/element'

Handsontable.editors.DateEditor.prototype.showDatepicker = function (event) {
  this.$datePicker.config(this.getDatePickerConfig())

  const offset = this.TD.getBoundingClientRect()
  const dateFormat = this.cellProperties.dateFormat || this.defaultDateFormat
  const datePickerConfig = this.$datePicker.config()
  let dateStr
  const isMouseDown = this.instance.view.isMouseDown()
  const isMeta = event ? isMetaKey(event.keyCode) : false

  this.datePickerStyle.top = `${window.pageYOffset + offset.top + outerHeight(this.TD)}px`
  // this.datePickerStyle.left = `${window.pageXOffset + offset.left}px`
  this.datePickerStyle.left = `${window.pageXOffset + offset.right - 256}px` // 右对齐

  this.$datePicker._onInputFocus = function () {}
  datePickerConfig.format = dateFormat

  if (this.originalValue) {
    dateStr = this.originalValue

    if (moment(dateStr, dateFormat, true).isValid()) {
      this.$datePicker.setMoment(moment(dateStr, dateFormat), true)
    }

    // workaround for date/time cells - pikaday resets the cell value to 12:00 AM by default, this will overwrite the value.
    if (this.getValue() !== this.originalValue) {
      this.setValue(this.originalValue)
    }

    if (!isMeta && !isMouseDown) {
      this.setValue('')
    }
  } else if (this.cellProperties.defaultDate) {
    dateStr = this.cellProperties.defaultDate

    datePickerConfig.defaultDate = dateStr

    if (moment(dateStr, dateFormat, true).isValid()) {
      this.$datePicker.setMoment(moment(dateStr, dateFormat), true)
    }

    if (!isMeta && !isMouseDown) {
      this.setValue('')
    }
  } else {
    // if a default date is not defined, set a soft-default-date: display the current day and month in the
    // datepicker, but don't fill the editor input
    this.$datePicker.gotoToday()
  }

  this.datePickerStyle.display = 'block'
  this.$datePicker.show()
}
