import _ from 'lodash'
export let defaultSettings = {
  licenseKey: '14005-739E3-66751-EB728-AE038'
}
export function initTable ({dataSource, style}) {
  dataSource.style.buttonGroup = style.buttonGroup
  _.forEach(style.tableHeader, header => {
    dataSource.temp.body.allCol.push(header)
    dataSource.temp.body.allColData.push(header.data)
    if (_.isUndefined(header.visible) || header.visible === true) {
      dataSource.temp.body.visible.push(header)
      dataSource.temp.body.colWidths.push(header.width)
    }
    if (!_.isUndefined(header.field)) {
      dataSource.temp.body.field.push(header.field)
    }
    if (!_.isUndefined(header.displayName)) {
      dataSource.temp.body.colHeaders.push(header.displayName)
    }
  })
}
export function initCharts ({dataSource, echarts}) {
  let line = function () {
    let _xAxis = [
      {
        type: 'category',
        data: [],
        axisPointer: {
          type: 'shadow'
        }
      }
    ]
    let _yAxis = []
    let _legend = []
    let _series = []
    let data_displayName = {}
    _.forEach(dataSource.style.tableHeader, (data) => {
      if (data.field === 'close') {
        _legend.push(data.displayName)
      }
      data_displayName[data.data] = data.displayName
      for (var i = 0; i < _legend.length; i++) {
        _series[i] = {
          name: _legend[i],
          type: 'line',
          data: []
        }
      }
    })
    let max_close = dataSource.temp.body.data[0][dataSource.temp.body.field.close]
    let min_close = dataSource.temp.body.data[0][dataSource.temp.body.field.close] // 收盘价最大最小值
    _.forEach(dataSource.temp.body.data, (data, index) => {
      if (data[dataSource.temp.body.field.updateAt]) {
        _xAxis[0].data.push(data[dataSource.temp.body.field.updateAt])
      }
      max_close = data.close >= max_close ? data.close : max_close
      min_close = data.close <= min_close ? data.close : min_close
      if (data[dataSource.temp.body.field.close] || data[dataSource.temp.body.field.percent]) {
        _.forEach(_series, (ser, index) => {
          if (ser.name === data_displayName[dataSource.temp.body.field.close]) {
            ser.data.push(parseFloat(data[dataSource.temp.body.field.close]))
          }
        })
      }
    })
    _yAxis[0] = {
      type: 'value',
      name: '价格',
      min: min_close,
      max: max_close,
      interval: 1,
      position: 'left',
      axisLabel: {
        formatter: '{value}'
      }
    }
    let option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        }
      },
      toolbox: {
        feature: {
          dataView: {show: true, readOnly: false},
          restore: {show: true},
          saveAsImage: {show: true}
        }
      },
      legend: {
        data: _legend
      },
      xAxis: _xAxis,
      yAxis: _yAxis,
      series: _series
    }
    echarts.setOption(option, true)
  }
  let candlestick = function () {
    let _xAxis = [
      {
        type: 'category',
        boundaryGap: true,
        axisTick: {onGap: false},
        splitLine: {show: false},
        data: []
      }
    ]
    let _yAxis = []
    let _legend = []
    let _series = []
    let _seriesObject = {}
    _seriesObject.k = {
      name: 'K线图',
      type: 'k',
      data: [],
      itemStyle: {
        normal: {
          color: '#fff',
          color0: '#00cc44',
          lineStyle: {
            width: 2,
            color: 'red',
            color0: '#00cc44'
          }
        },
        emphasis: {
          color: 'black',
          color0: 'white'
        }
      }
    }
    _seriesObject.goldCloseLine = {
      name: '走势图',
      type: 'line',
      symbol: 'none',
      data: [],
      itemStyle: {
        normal: {
          color: '#eee',
          lineStyle: {
            color: '#666',
            type: 'solid',
            width: 1
          }
        }
      }
    }
    _.forEach(dataSource.temp.body.data, function (data, index) {
      if (!data[dataSource.temp.body.field.updateAt] && !data.updateAt) {
        return
      }
      _xAxis[0].data.unshift(data[dataSource.temp.body.field.updateAt] || data.updateAt)
      _seriesObject.k.data.unshift([
        data[dataSource.temp.body.field.open] || data.open,
        data[dataSource.temp.body.field.close] || data.close,
        data[dataSource.temp.body.field.low] || data.low,
        data[dataSource.temp.body.field.hight] || data.hight
      ])
      _seriesObject.goldCloseLine.data.unshift(data[dataSource.temp.body.field.close] || data.close)
    })
    _.forEach(_seriesObject, function (serie) {
      _series.push(serie)
    })
    let option = {
      title: {
        text: '历史金价指数'
      },
      backgroundColor: '#fff',
      tooltip: {
        trigger: 'axis',
        formatter: function (params) {
          let res = params[0].seriesName + ' ' + params[0].name
          res += '<br/>  开盘 : ' + params[0].value[1] + '  收盘 : ' + params[0].value[2]
          res += '<br/>  最低 : ' + params[0].value[3] + '  最高 : ' + params[0].value[4]
          return res
        }
      },
      legend: {
        data: ['K线图', '走势图']
      },
      toolbox: {
        show: true,
        feature: {
          dataZoom: {show: true},
          restore: {show: true},
          saveAsImage: {show: true}
        }
      },
      dataZoom: {
        show: true,
        realtime: true,
        start: 0,
        end: 100
      },
      xAxis: _xAxis,
      yAxis: [
        {
          type: 'value',
          scale: true,
          boundaryGap: [0.01, 0.01]
        },
        {
          type: 'value',
          name: '收盘走势'
        }
      ],
      series: _series
    }
    echarts.setOption(option, true)
  }
  candlestick()
}
export default {
}
