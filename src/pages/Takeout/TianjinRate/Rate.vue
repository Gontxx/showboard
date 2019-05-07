<template>
  <div>
    <div class="left-column">
      <div id="beijing-map" class="chart-container"></div>
      <hash-result :hash="hashResult"></hash-result>
    </div>
    <div class="right-column">
      <div id="box-plot-rate-order" class="chart-container has-background"></div>
      <div id="box-plot-rate-money" class="chart-container has-background"></div>
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
import beijingJson from '@/components/beijing1.json'
import beijingOptions from '@/components/beijingOptions'
import defaultData from './defaultData'
import mapOption from './mapOption'
import plotOrderOption from './plotOrder'
import plotMoneyOption from './plotMoney'
import pieOption from './pieOption'
import { createWssocket } from '@/assets/createWS'
import hashResult from '@/components/hashResult'

export default {
  name: 'TakeoutRate',
  data () {
    return {
      beijingMapContainer: null,
      chartBeijingMap: null,
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
      echarts.registerMap('beijing', beijingJson)
      this.beijingMapContainer = document.getElementById('beijing-map')
      this.resizeBeijingMapContainer()
      this.chartBeijingMap = echarts.init(this.beijingMapContainer)

      this.boxPlotRateOrderContainer = document.getElementById('box-plot-rate-order')
      this.resizeboxPlotRateOrderContainer()
      this.boxPlotRateOrderChart = echarts.init(this.boxPlotRateOrderContainer)

      this.boxPlotRateMoneyContainer = document.getElementById('box-plot-rate-money')
      this.resizeboxPlotRateMoneyContainer()
      this.boxPlotRateMoneyChart = echarts.init(this.boxPlotRateMoneyContainer)

      this.doublePieMoneyContainer = document.getElementById('double-pie-money')
      this.resizeDoublePieContainer(this.doublePieMoneyContainer)
      this.doublePieMoneyChart = echarts.init(this.doublePieMoneyContainer)

      this.doublePieOrderContainer = document.getElementById('double-pie-order')
      this.resizeDoublePieContainer(this.doublePieOrderContainer)
      this.doublePieOrderChart = echarts.init(this.doublePieOrderContainer)

      this.doublePieShopContainer = document.getElementById('double-pie-shop')
      this.resizeDoublePieContainer(this.doublePieShopContainer)
      this.doublePieShopChart = echarts.init(this.doublePieShopContainer)

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
    setCharts (data) {
      console.log('setCharts', data)
      this.setBeijingMapOption(data.fig1)
      this.setboxPlotRateOrderOption(data.fig2.map(item => item.value), data.fig2.map(item => item.name), data.district + '商家订单数分布')
      this.setboxPlotRateMoneyOption(data.fig3.map(item => item.value), data.fig3.map(item => item.name), data.district + '商家成交额分布')
      this.setDoublePieOption(this.doublePieMoneyChart, data.district + '成交额', data.fig4.saleNum_3, data.fig4.saleNum_9)
      this.setDoublePieOption(this.doublePieOrderChart, data.district + '订单数', data.fig4.orderNum_3, data.fig4.orderNum_9)
      this.setDoublePieOption(this.doublePieShopChart, data.district + '店铺数', data.fig4.shopNum_3, data.fig4.shopNum_9)
      this.autoTip()
    },
    resizeBeijingMapContainer () {
      this.beijingMapContainer.style.width = (window.innerWidth * 0.5 - 40) + 'px'
      this.beijingMapContainer.style.height = (window.innerHeight - 20) + 'px'
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
    resizeboxPlotRateOrderContainer () {
      this.boxPlotRateOrderContainer.style.width = (window.innerWidth * 0.5 - 20) + 'px'
      this.boxPlotRateOrderContainer.style.height = (window.innerHeight * 0.35 - 12) + 'px'
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
    resizeboxPlotRateMoneyContainer () {
      this.boxPlotRateMoneyContainer.style.width = (window.innerWidth * 0.5 - 20) + 'px'
      this.boxPlotRateMoneyContainer.style.height = (window.innerHeight * 0.35 - 12) + 'px'
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
    resizeDoublePieContainer (container) {
      container.style.width = Math.floor((window.innerWidth * 0.5 - 20 - 16) / 3.0) + 'px'
      container.style.height = (window.innerHeight * 0.3 - 12) + 'px'
    },
    setDoublePieOption (chart, title, data3, data9) {
      pieOption.seriesOption_1.name = title
      pieOption.seriesOption_1.data = data3
      pieOption.seriesOption_2.name = title
      pieOption.seriesOption_2.data = data9
      pieOption.option.title.text = title
      pieOption.option.series = [pieOption.seriesOption_1, pieOption.seriesOption_2]
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
        action: 'connectDBAndQuery',
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
      that.resizeBeijingMapContainer()
      that.chartBeijingMap.resize()
      that.resizeboxPlotRateOrderContainer()
      that.boxPlotRateOrderChart.resize()
      that.resizeboxPlotRateMoneyContainer()
      that.boxPlotRateMoneyChart.resize()
      that.resizeDoublePieContainer(that.doublePieMoneyContainer)
      that.doublePieMoneyChart.resize()
      that.resizeDoublePieContainer(that.doublePieShopContainer)
      that.doublePieShopChart.resize()
      that.resizeDoublePieContainer(that.doublePieOrderContainer)
      that.doublePieOrderChart.resize()
    }
  }
}
</script>

<style scoped>
</style>
