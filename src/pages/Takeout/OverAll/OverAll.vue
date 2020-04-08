<template>
  <div>
    <div class='left-column'>
      <div id='beijing-map' class='chart-container'></div>
      <hash-result :hash="hashResult"></hash-result>
    </div>
    <div class='right-column'>
      <div id='type-pie' class='chart-container has-background'></div>
      <div id='store-bar' class='chart-container has-background'></div>
      <div id='beijing-scatter' class='chart-container has-background'></div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import 'echarts/lib/chart/map'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/scatter'
import { deepCopy } from '@/assets/util'
import { createWssocket } from '@/assets/createWS'
import hashResult from '@/components/hashResult'
import beijingJson from '@/components/beijing1.json'
import beijingOptions from '@/components/beijingOptions'
import defaultData from './defaultData'
import mapOption from './mapOption'
import pieOption from './pieOption'
import barOption from './barOption'
import scatterOption from './scatterOption'

export default {
  name: 'Takeout',
  data () {
    return {
      beijingMapContainer: null,
      chartBeijingMap: null,
      typePieContainer: null,
      typePieChart: null,
      storeBarContainer: null,
      storeBarChart: null,
      beijingScatterContainer: null,
      beijingScatterChart: null,
      timer1: -1,
      timer2: -1,
      timer3: -1,
      currRegion1: 0,
      currRegion2: 0,
      currRegion3: 0,
      hashResult: ''
    }
  },
  components: {
    hashResult
  },
  methods: {
    initCharts () {
      echarts.registerMap('beijing', beijingJson)
      this.beijingMapContainer = document.getElementById('beijing-map')
      this.chartBeijingMap = echarts.init(this.beijingMapContainer)

      this.typePieContainer = document.getElementById('type-pie')
      this.typePieChart = echarts.init(this.typePieContainer)

      this.storeBarContainer = document.getElementById('store-bar')
      this.storeBarChart = echarts.init(this.storeBarContainer)

      this.beijingScatterContainer = document.getElementById('beijing-scatter')
      this.beijingScatterChart = echarts.init(this.beijingScatterContainer)

      this.resizeChart()
      this.showLoading()
      this.beijingScatterChart.showLoading()

      let that = this
      this.chartBeijingMap.on('click', function (params) {
        // console.log('chartBeijingMap click', params)
        that.getData(params.name.substring(0, params.name.length - 1))
      })
    },
    showLoading () {
      this.typePieChart.showLoading()
      this.storeBarChart.showLoading()
    },
    resizeChart () {
      let ww = window.innerWidth
      let hh = window.innerHeight
      this.resizeContainer(this.beijingMapContainer, (ww * 0.5 - 40), (hh * 0.95 - 20))
      this.chartBeijingMap.resize()
      this.resizeContainer(this.typePieContainer, (ww * 0.5 - 20), (hh * 0.38 - 12))
      this.typePieChart.resize()
      this.resizeContainer(this.storeBarContainer, (ww * 0.5 - 20), (hh * 0.32 - 12))
      this.storeBarChart.resize()
      this.resizeContainer(this.beijingScatterContainer, (ww * 0.5 - 20), (hh * 0.3 - 12))
      this.beijingScatterChart.resize()
    },
    resizeContainer (container, width, height) {
      container.style.width = width + 'px'
      container.style.height = height + 'px'
    },
    setCharts (data) {
      console.log('setCharts', data)
      this.setBeijingMapOption(data.fig1)
      this.setTypePieOption(data.fig2, data.district + '外卖标签分类')
      this.setStoreBarOption(data.fig3.nameData, data.fig3.lineData, data.district + '单门店成交额前15名')
      this.setBeijingScatterOption(data.fig1)
      this.autoTip()
    },
    setBeijingMapOption (data) {
      this.chartBeijingMap.showLoading()
      mapOption.geoOption.data = data
      mapOption.seriesOption_1.data = this.convertData(data)
      mapOption.seriesOption_2.data = data
      mapOption.seriesOption_3.data = this.convertData(data.sort(function (a, b) {
        return b[0] - a[0]
      }).slice(0, 5))
      mapOption.option.geo = mapOption.geoOption
      mapOption.option.series = [mapOption.seriesOption_1, mapOption.seriesOption_2, mapOption.seriesOption_3]
      this.chartBeijingMap.setOption(mapOption.option)
      this.chartBeijingMap.hideLoading()
    },
    convertData (data) {
      let res = []
      for (let i = 0; i < data.length; i++) {
        let geoCoord = beijingOptions.geoCoordMap[data[i].name]
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value[0])
          })
        }
      }
      return res
    },
    setTypePieOption (data, title) {
      pieOption.legendOption.data = [data[0].name]
      pieOption.legendOption.formatter = function (name) {
        let total = 0
        data.forEach(function (value, index, array) {
          total += value.value
        })
        return '{total|' + total + '}'
      }
      pieOption.seriesOption.data = data
      pieOption.seriesOption.label.emphasis.formatter = function (params, ticket, callback) {
        var total = 0
        data.forEach(function (value, index, array) {
          total += value.value
        })
        let percent = ((params.value / total) * 100).toFixed(1)
        return '{white|' + params.name + '}  {yellow|' + params.value + '} {blue|' + percent + '%}\n{hr|}\n'
      }
      pieOption.option.title.text = title
      pieOption.option.legend = pieOption.legendOption
      pieOption.option.series = [pieOption.seriesOption]
      this.typePieChart.setOption(pieOption.option)
      this.typePieChart.hideLoading()
    },
    setStoreBarOption (nameData, lineData, title) {
      barOption.yAxisOption.data = nameData
      barOption.seriesOption_1.data = lineData
      barOption.seriesOption_2.data = lineData
      barOption.option.yAxis = [barOption.yAxisOption]
      barOption.option.series = [barOption.seriesOption_1, barOption.seriesOption_2]
      barOption.option.title.text = title
      this.storeBarChart.setOption(barOption.option)
      this.storeBarChart.hideLoading()
    },
    setBeijingScatterOption (data) {
      scatterOption.legendOption.data = data.map(item => {
        return item.name
      })
      scatterOption.option.legend = scatterOption.legendOption

      scatterOption.option.series = data.map(item => {
        let option = deepCopy(scatterOption.seriesOption)
        option.name = item.name
        option.symbolSize = function (data) {
          return Math.sqrt(data[2]) / 200
        }
        option.label.normal.formatter = function (param) {
          return param.data[3]
        }
        option.label.emphasis.formatter = function (param) {
          return param.data[3]
        }
        option.data = [deepCopy(item.value)]

        option.data[0].push(item.name)
        return option
      })
      this.beijingScatterChart.setOption(scatterOption.option)
      this.beijingScatterChart.hideLoading()
    },
    autoTip () {
      if (this.timer1 !== -1) {
        clearInterval(this.timer1)
      }
      if (this.timer2 !== -1) {
        clearInterval(this.timer2)
      }
      if (this.timer3 !== -1) {
        clearInterval(this.timer3)
      }
      let that = this
      this.timer1 = setInterval(function () {
        that.typePieChart.dispatchAction({
          type: 'pieUnSelect',
          seriesIndex: 0,
          dataIndex: that.currRegion1 % defaultData.typePieData.length
        })
        that.currRegion1 += 1
        that.typePieChart.dispatchAction({
          type: 'pieSelect',
          seriesIndex: 0,
          dataIndex: that.currRegion1 % defaultData.typePieData.length
        })
        that.typePieChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: that.currRegion1 % defaultData.typePieData.length
        })
      }, 5000)

      this.timer2 = setInterval(function () {
        that.chartBeijingMap.dispatchAction({
          type: 'downplay',
          seriesIndex: 1,
          dataIndex: that.currRegion2 % defaultData.beijingData.length
        })
        that.currRegion2 += 1
        that.chartBeijingMap.dispatchAction({
          type: 'highlight',
          seriesIndex: 1,
          dataIndex: that.currRegion2 % defaultData.beijingData.length
        })
        that.chartBeijingMap.dispatchAction({
          type: 'showTip',
          seriesIndex: 1,
          dataIndex: that.currRegion2 % defaultData.beijingData.length
        })
      }, 8000)

      this.timer3 = setInterval(function () {
        that.beijingScatterChart.dispatchAction({
          type: 'downplay',
          seriesIndex: that.currRegion3 % defaultData.beijingData.length,
          dataIndex: 0
        })
        that.currRegion3 += 1
        that.beijingScatterChart.dispatchAction({
          type: 'highlight',
          seriesIndex: that.currRegion3 % defaultData.beijingData.length,
          dataIndex: 0
        })
        that.beijingScatterChart.dispatchAction({
          type: 'showTip',
          seriesIndex: that.currRegion3 % defaultData.beijingData.length,
          dataIndex: 0
        })
      }, 10000)
    },
    initWSocket () {
      let that = this
      let onopen = function () {
        console.log('open')
        that.getData('')
      }
      let onmessage = function (event) {
        console.log('onmessage', event)
        let res = JSON.parse(event.data)
        try {
          if (res.action === 'onExecuteResult') {
            let data = JSON.parse(res.data)
            let result = JSON.parse(data.result)
            that.setCharts(result)
          } else if (res.action === 'onHashResult') {
            that.hashResult = res.data
          }
        } catch (e) {
          console.log('出现错误！', e)
        }
      }
      let wssocket = createWssocket(this.$global.wsAddress, onopen, onmessage)
      this.$store.commit('SET_WSSOCKET', wssocket)
    },
    getData (district) {
      // console.log('district', district)
      this.showLoading()
      let request = {}
      request.action = 'executeContract'
      request.contractName = this.$global.contractID
      request.requestID = new Date().getTime()
      request.arg = JSON.stringify({
        action: 'connectDBAndQuery',
        arg: JSON.stringify({
          type: 'takeout',
          detail: 'overall',
          district: district
        })
      })
      request.privKey = this.$global.privKey
      this.$store.state.wsSocket.send(JSON.stringify(request))
    }
  },
  mounted () {
    this.initCharts()
    this.initWSocket()
    let that = this
    window.onresize = function () {
      // 重置容器高宽
      that.resizeChart()
    }
  }
}
</script>

<style scoped>
</style>
