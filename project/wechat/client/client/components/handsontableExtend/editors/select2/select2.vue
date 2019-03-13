<template>
  <el-select ref="select" v-model="value" size="mini" filterable :default-first-option="true" @visible-change="visibleChange" @keydown.tab.native="tab" @keydown.enter.native="enter" placeholder="请选择" @change="change">
    <el-option v-for="item in options" :key="item.value" :label="item.value + '  ' + item.text" :value="item.text">
    </el-option>
  </el-select>
</template>

<script>
import Vue from 'vue'
export default {
  data () {
    return {
      value: ''
    }
  },
  props: ['currentValue','options'],
  methods: {
    visibleChange (visible) {
      if (visible === false) {
        // 收起了下拉列表 例如按下esc
        this.$refs.select.blur()
        this.$emit('close')
      }
    },
    tab () {
      this.$refs.select.blur()
      this.$emit('close')
    },
    change () {
      this.$emit('change', this.value)
    },
    enter () {
      this.$refs.select.blur()
      this.$emit('change', this.value)
    }
  },
  mounted () {
    setTimeout(() => {
      this.$refs.select.focus()
      if (this.currentValue) {
        this.value = this.currentValue
      }
    })
  }
}
</script>

<style>
.handsontableInputHolder .el-select--mini {
  height: 100%;
  width: 100%;
}
.handsontableInputHolder .el-select .el-input.is-focus .el-input__inner {
  padding: 0 20px 0 0 ;
  margin: 2px;
  height: calc(100% - 4px);
  width: calc(100% - 24px);
  border: none;
  font-size: 14px;
  cursor: auto;
}

.handsontableInputHolder .el-select > .el-input {
  height: 100%;
  width: 100%;
}

.handsontableInputHolder .el-input__suffix{
  display: none;
}
</style>
