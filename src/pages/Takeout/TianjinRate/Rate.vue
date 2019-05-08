<template>
  <div>
    <div class="left-column">
      <div id="beijing-map" class="chart-container"></div>
      <hash-result :hash="hashResult"></hash-result>
    </div>
    <div class="right-column">
      <div id='beijing-scatter' class='chart-container has-background'></div>
      <div class="chart-container has-background box-plot">
        <div id="box-plot-rate-order" style="float: left;"></div>
        <div id="box-plot-rate-money" style="float: left;"></div>
      </div>
      <div class="chart-container has-background double-pie">
        <div id="double-pie-money" style="float: left;"></div>
        <div id="double-pie-order" style="float: left;"></div>
        <div id="double-pie-shop" style="float: left;"></div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import 'echarts/lib/chart/map'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/boxplot'
import 'echarts/extension/dataTool'
import tianjinJson from '@/components/tianjin.json'
import tianjinOptions from '@/components/tianjinOptions'
import defaultData from './defaultData'
import mapOption from './mapOption'
import plotOrderOption from './plotOrder'
import plotMoneyOption from './plotMoney'
import pieOption from './pieOption'
import { createWssocket } from '@/assets/createWS'
import hashResult from '@/components/hashResult'
import scatterOption from './scatterOption'
import { deepCopy } from '@/assets/util'

export default {
  name: 'TakeoutRate',
  data () {
    return {
      beijingMapContainer: null,
      chartBeijingMap: null,
      beijingScatterContainer: null,
      beijingScatterChart: null,
      boxPlotRateOrderContainer: null,
      boxPlotRateOrderChart: null,
      boxPlotRateMoneyContainer: null,
      boxPlotRateMoneyChart: null,
      doublePieMoneyContainer: null,
      doublePieMoneyChart: null,
      doublePieOrderContainer: null,
      doublePieOrderChart: null,
      doublePieShopContainer: null,
      doublePieShopChart: null,
      timer: -1,
      currRegion: 0,
      hashResult: ''
    }
  },
  components: {
    hashResult
  },
  methods: {
    initCharts () {
      echarts.registerMap('tianjin', tianjinJson)
      this.beijingMapContainer = document.getElementById('beijing-map')
      this.chartBeijingMap = echarts.init(this.beijingMapContainer)

      this.beijingScatterContainer = document.getElementById('beijing-scatter')
      this.beijingScatterChart = echarts.init(this.beijingScatterContainer)

      this.boxPlotRateOrderContainer = document.getElementById('box-plot-rate-order')
      this.boxPlotRateOrderChart = echarts.init(this.boxPlotRateOrderContainer)

      this.boxPlotRateMoneyContainer = document.getElementById('box-plot-rate-money')
      this.boxPlotRateMoneyChart = echarts.init(this.boxPlotRateMoneyContainer)

      this.doublePieMoneyContainer = document.getElementById('double-pie-money')
      this.doublePieMoneyChart = echarts.init(this.doublePieMoneyContainer)

      this.doublePieOrderContainer = document.getElementById('double-pie-order')
      this.doublePieOrderChart = echarts.init(this.doublePieOrderContainer)

      this.doublePieShopContainer = document.getElementById('double-pie-shop')
      this.doublePieShopChart = echarts.init(this.doublePieShopContainer)

      this.resizeChart()
      this.showLoading()

      let that = this
      this.chartBeijingMap.on('click', function (params) {
        // console.log('chartBeijingMap click', params)
        that.getData(params.name.substring(0, params.name.length - 1))
      })
    },
    showLoading () {
      this.boxPlotRateOrderChart.showLoading()
      this.boxPlotRateMoneyChart.showLoading()
      this.doublePieMoneyChart.showLoading()
      this.doublePieOrderChart.showLoading()
      this.doublePieShopChart.showLoading()
    },
    resizeChart () {
      let ww = window.innerWidth
      let hh = window.innerHeight
      this.resizeContainer(this.beijingMapContainer, (ww * 0.5 - 40), (hh - 20))
      this.chartBeijingMap.resize()
      this.resizeContainer(this.beijingScatterContainer, (ww * 0.5 - 20), (hh * 0.35 - 12))
      this.beijingScatterChart.resize()
      this.resizeContainer(this.boxPlotRateOrderContainer, Math.floor((ww * 0.5 - 20 - 16) / 2.0), (hh * 0.32 - 12))
      this.boxPlotRateOrderChart.resize()
      this.resizeContainer(this.boxPlotRateMoneyContainer, Math.floor((ww * 0.5 - 20 - 16) / 2.0), (hh * 0.32 - 12))
      this.boxPlotRateMoneyChart.resize()
      this.resizeContainer(this.doublePieMoneyContainer, Math.floor((ww * 0.5 - 20 - 16) / 3.0), (hh * 0.3 - 12))
      this.doublePieMoneyChart.resize()
      this.resizeContainer(this.doublePieOrderContainer, Math.floor((ww * 0.5 - 20 - 16) / 3.0), (hh * 0.3 - 12))
      this.doublePieOrderChart.resize()
      this.resizeContainer(this.doublePieShopContainer, Math.floor((ww * 0.5 - 20 - 16) / 3.0), (hh * 0.3 - 12))
      this.doublePieShopChart.resize()
    },
    resizeContainer (container, width, height) {
      container.style.width = width + 'px'
      container.style.height = height + 'px'
    },
    setCharts (data) {
      console.log('setCharts', data)
      this.setBeijingMapOption(data.fig1)
      this.setBeijingScatterOption(data.fig5)
      this.setboxPlotRateOrderOption(data.fig2.map(item => item.value), data.fig2.map(item => item.name), data.district + '商家订单数分布')
      this.setboxPlotRateMoneyOption(data.fig3.map(item => item.value), data.fig3.map(item => item.name), data.district + '商家成交额分布')
      this.setDoublePieOption(this.doublePieMoneyChart, data.district + '成交额', data.fig4.saleNum)
      this.setDoublePieOption(this.doublePieOrderChart, data.district + '订单数', data.fig4.orderNum)
      this.setDoublePieOption(this.doublePieShopChart, data.district + '店铺数', data.fig4.shopNum)
      this.autoTip()
    },
    setBeijingMapOption (data) {
      this.chartBeijingMap.showLoading()
      mapOption.geoOption.data = data
      mapOption.seriesOption_1.data = this.convertData1(data)
      mapOption.seriesOption_2.data = this.convertData1(data) // data
      mapOption.seriesOption_3.data = this.convertData1(data.sort(function (a, b) {
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
        let geoCoord = tianjinOptions.geoCoordMap[data[i].name]
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value['all'])
          })
        }
      }
      return res
    },
    convertData1 (data) {
      let res = []
      for (let i = 0; i < data.length; i++) {
        let geoCoord = tianjinOptions.geoCoordMap[data[i].name]
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value['优秀'], data[i].value['良好'], data[i].value['一般'], data[i].value['不合格'], data[i].value['all'])
          })
        }
      }
      return res
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
          return Math.sqrt(data[2]) / 90
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
    setboxPlotRateOrderOption (orderdata, namedata, title) {
      let data = echarts.dataTool.prepareBoxplotData(orderdata)
      plotOrderOption.xAxisOption.data = namedata
      plotOrderOption.seriesOption.data = data.boxData
      plotOrderOption.option.xAxis = plotOrderOption.xAxisOption
      plotOrderOption.option.series = [plotOrderOption.seriesOption]
      plotOrderOption.option.title.text = title
      this.boxPlotRateOrderChart.setOption(plotOrderOption.option)
      this.boxPlotRateOrderChart.hideLoading()
    },
    setboxPlotRateMoneyOption (saledata, namedata, title) {
      let data = echarts.dataTool.prepareBoxplotData(saledata)
      plotMoneyOption.xAxisOption.data = namedata
      plotMoneyOption.seriesOption.data = data.boxData
      plotMoneyOption.option.xAxis = plotMoneyOption.xAxisOption
      plotMoneyOption.option.series = [plotMoneyOption.seriesOption]
      plotMoneyOption.option.title.text = title
      this.boxPlotRateMoneyChart.setOption(plotMoneyOption.option)
      this.boxPlotRateMoneyChart.hideLoading()
    },
    setDoublePieOption (chart, title, data3) {
      pieOption.seriesOption_1.name = title
      pieOption.seriesOption_1.data = data3
      pieOption.seriesOption_2.name = title
      // pieOption.seriesOption_2.data = data9
      pieOption.option.title.text = title
      pieOption.option.series = [pieOption.seriesOption_1]
      chart.setOption(pieOption.option)
      chart.hideLoading()
    },
    autoTip () {
      if (this.timer !== -1) {
        clearInterval(this.timer)
      }
      let that = this
      this.timer = setInterval(function () {
        that.chartBeijingMap.dispatchAction({
          type: 'downplay',
          seriesIndex: 1,
          dataIndex: that.currRegion % defaultData.beijingData.length
        })
        that.currRegion += 1
        that.chartBeijingMap.dispatchAction({
          type: 'highlight',
          seriesIndex: 1,
          dataIndex: that.currRegion % defaultData.beijingData.length
        })
        that.chartBeijingMap.dispatchAction({
          type: 'showTip',
          seriesIndex: 1,
          dataIndex: that.currRegion % defaultData.beijingData.length
        })
      }, 8000)
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
      request.contractID = this.$global.contractID
      request.requestID = new Date().getTime()
      request.arg = JSON.stringify({
        action: 'connectDBAndQueryTianjin',
        arg: JSON.stringify({
          type: 'takeout',
          detail: 'rating',
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
  .box-plot {
    width: calc(100% - 20px);
    height: calc(35% - 12px);
  }
</style>
