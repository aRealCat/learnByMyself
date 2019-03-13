<template>
  <div>
    <el-container>
      <el-main>
        <div style="display: inline-block;">
           <el-date-picker
            v-model="daterange"
            type="daterange"
            unlink-panels
            @change="dateRangeChange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
        <div class="button-group">
          <!-- <el-button size="mini" @click="search"><i class="fa fa-search themeprimary"></i>&nbsp;查询</el-button> -->
          <el-button size="mini" @click="refresh"><i class="fa fa-refresh themeprimary"></i>&nbsp;刷新</el-button>
        </div>
        <div ref="echarts" style="height: 40vh;"></div>
        <div style="height: 40vh;overflow-y: auto;margin-top: 10PX;">
        <div ref="hot"></div>
        </div>
      </el-main>
    </el-container>
    <!-- <el-dialog
      title="查询"
      :visible.sync="searchDialog"
      width="30%"
    >
      <div class="search-content">
        <div>
          开始日期: <el-date-picker
            v-model="paginationOptions.filter.datetime.start"
            @change="dateChange('start')"
            placeholder="开始日期"
          ></el-date-picker>
        </div>
        <div>
            结束日期: <el-date-picker
            v-model="paginationOptions.filter.datetime.end"
            @change="dateChange('end')"
            placeholder="结束日期"
          ></el-date-picker>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="searchDialog = false">取 消</el-button>
          <el-button type="primary" @click="searSure">确 定</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>

<script>
import Handsontable from 'handsontable-pro'
import 'handsontable/dist/handsontable.full.css'
import { http, parseTime, getCurrentMonthFirst } from '~utils'
import { initTable, initCharts, defaultSettings } from '~utils/ht'
import _ from 'lodash'
import { getStyle } from '~utils/customConfig'
import { mapState } from 'vuex'
import echarts from 'echarts'
let $echarts = echarts
export default {
  components: {
  },
  data () {
    return {
      echarts: null,
      htTable: null,
      searchDialog: false,
      daterange: [parseTime(getCurrentMonthFirst(), '{y}-{m}-{d}'), parseTime(new Date(), '{y}-{m}-{d}')],
      dataSource: {
        data: [],
        style: {
          tableHeader: [],
          buttonGroup: []
        },
        temp: {
          body: {
            data: [],
            colHeaders: [],
            colData: [],
            visibleCol: [],
            visible: [],
            colWidths: [],
            field: [],
            allCol: [],
            allColData: []
          }
        }
      },
      paginationOptions: {
        filter: {
          datetime: {
            start: parseTime(getCurrentMonthFirst(), '{y}-{m}-{d}'),
            end: parseTime(new Date(), '{y}-{m}-{d}')
          }
        },
        pageNumber: 1,
        pageSize: 5000,
        switch: false,
        sort: null,
        sortCol: null,
        searchOptions : [],
        isPagination: false,
        isIncludeSub: false
      },
      settings: {
        licenseKey: '14005-739E3-66751-EB728-AE038',
        stretchH: 'all',
        currentRowClassName: 'currentRow',
        rowHeaders: true,
        rowHeaderWidth: 30,
        minRows: 10,
        readOnly: true,
        fillHandle: false,
        columns: [],
        colHeaders: [],
        colWidths: [],
        data: []
      }
    }
  },
  computed: {
    ...mapState(['config'])
  },
  mounted () {
    this.echarts = $echarts.init(this.$refs.echarts)
    // http({
    //   data: {
    //     menuId: this.config.goldhistory.menuId
    //   },
    //   url: this.config.goldhistory.styleUrl
    // }).then(res => {
    initTable({dataSource: this.dataSource, style: _.cloneDeep(getStyle())})
    this.loadData()
    // })
  },
  methods: {
    search () {
      this.searchDialog = true
    },
    refresh () {
      this.update()
    },
    searSure () {
      this.searchDialog = false
      this.update()
    },
    // dateChange (key) {
    //   this.paginationOptions.filter.datetime[key] = parseTime(this.paginationOptions.filter.datetime[key], '{y}-{m}-{d}')
    // },
    dateRangeChange (date) {
      this.paginationOptions.filter.datetime['start'] = parseTime(date[0], '{y}-{m}-{d}')
      this.paginationOptions.filter.datetime['end'] = parseTime(date[1], '{y}-{m}-{d}')
      this.update()
    },
    update () {
      http({
        data: {
          menuId: this.config.goldhistory.menuId,
          paginationOptions: this.paginationOptions
        },
        url: this.config.goldhistory.dataUrl
      }).then(res => {
        res.rows = res.rows.reverse()
        this.dataSource.data = _.cloneDeep(res.rows)
        this.dataSource.temp.body.data = _.cloneDeep(res.rows)
        this.htTable.updateSettings({
          data: _.cloneDeep(this.dataSource.temp.body.data)
        })
        initCharts({dataSource: this.dataSource, echarts: this.echarts})
      })
    },
    loadData () {
      http({
        data: {
          menuId: this.config.goldhistory.menuId,
          paginationOptions: this.paginationOptions
        },
        url: this.config.goldhistory.dataUrl
      }).then(res => {
        res.rows = res.rows.reverse()
        this.dataSource.data = _.cloneDeep(res.rows)
        this.dataSource.temp.body.data = _.cloneDeep(res.rows)
        this.settings.data = _.cloneDeep(this.dataSource.temp.body.data)
        this.settings.columns = _.cloneDeep(this.dataSource.temp.body.visible)
        this.settings.colWidths = _.cloneDeep(this.dataSource.temp.body.colWidths)
        this.settings.colHeaders = _.cloneDeep(this.dataSource.temp.body.colHeaders)
        this.htTable = new Handsontable(this.$refs.hot, _.assign(defaultSettings, this.settings))
        initCharts({dataSource: this.dataSource, echarts: this.echarts})
      })
    }
  },
  watch: {
  }
}
</script>

<style scoped>
.el-container {
  box-sizing: border-box;
    position: absolute;
    top: 10px;
    bottom: 0;
    left: 12px;
    right: 12px;
    text-align: left;
}
.pointer{
  cursor: pointer;
}
/* .el-footer{
  position: fixed;
  bottom: 0;
} */
.button-group {
  margin-bottom: 6px;
  display: inline-block;
}
.el-main{
  overflow: auto;
  padding: 0 15px
}
.search-content>div{
  margin-top: 10px;
}
</style>
