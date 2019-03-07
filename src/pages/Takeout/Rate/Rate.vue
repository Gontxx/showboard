<template>
  <div>
    <div class="left-column">
      <div id="beijing-map" class="chart-container"></div>
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
      timer: null,
      currRegion: 0
    }
  },
  mounted () {
    this.initCharts()
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
    this.autoTip()
  },
  methods: {
    initCharts () {
      echarts.registerMap('beijing', beijingJson)
      this.beijingMapContainer = document.getElementById('beijing-map')
      this.resizeBeijingMapContainer()
      this.chartBeijingMap = echarts.init(this.beijingMapContainer)
      this.setBeijingMapOption(defaultData.beijingData)

      this.boxPlotRateOrderContainer = document.getElementById('box-plot-rate-order')
      this.resizeboxPlotRateOrderContainer()
      this.boxPlotRateOrderChart = echarts.init(this.boxPlotRateOrderContainer)
      this.setboxPlotRateOrderOption(defaultData.orderdata, defaultData.namedata)

      this.boxPlotRateMoneyContainer = document.getElementById('box-plot-rate-money')
      this.resizeboxPlotRateMoneyContainer()
      this.boxPlotRateMoneyChart = echarts.init(this.boxPlotRateMoneyContainer)
      this.setboxPlotRateMoneyOption(defaultData.saledata, defaultData.namedata)

      this.doublePieMoneyContainer = document.getElementById('double-pie-money')
      this.resizeDoublePieContainer(this.doublePieMoneyContainer)
      this.doublePieMoneyChart = echarts.init(this.doublePieMoneyContainer)
      this.setDoublePieOption(this.doublePieMoneyChart, '成交额', defaultData.Moneynum_3, defaultData.Moneynum_9)

      this.doublePieOrderContainer = document.getElementById('double-pie-order')
      this.resizeDoublePieContainer(this.doublePieOrderContainer)
      this.doublePieOrderChart = echarts.init(this.doublePieOrderContainer)
      this.setDoublePieOption(this.doublePieOrderChart, '订单数', defaultData.Ordernum_3, defaultData.Ordernum_9)

      this.doublePieShopContainer = document.getElementById('double-pie-shop')
      this.resizeDoublePieContainer(this.doublePieShopContainer)
      this.doublePieShopChart = echarts.init(this.doublePieShopContainer)
      this.setDoublePieOption(this.doublePieShopChart, '店铺数', defaultData.shopnum_3, defaultData.shopnum_9)
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
    setboxPlotRateOrderOption (orderdata, namedata) {
      let data = echarts.dataTool.prepareBoxplotData(orderdata)
      plotOrderOption.xAxisOption.data = namedata
      plotOrderOption.seriesOption.data = data.boxData
      plotOrderOption.option.xAxis = plotOrderOption.xAxisOption
      plotOrderOption.option.series = [plotOrderOption.seriesOption]
      this.boxPlotRateOrderChart.setOption(plotOrderOption.option)
    },
    resizeboxPlotRateMoneyContainer () {
      this.boxPlotRateMoneyContainer.style.width = (window.innerWidth * 0.5 - 20) + 'px'
      this.boxPlotRateMoneyContainer.style.height = (window.innerHeight * 0.35 - 12) + 'px'
    },
    setboxPlotRateMoneyOption (saledata, namedata) {
      let data = echarts.dataTool.prepareBoxplotData(saledata)
      plotMoneyOption.xAxisOption.data = namedata
      plotMoneyOption.seriesOption.data = data.boxData
      plotMoneyOption.option.xAxis = plotMoneyOption.xAxisOption
      plotMoneyOption.option.series = [plotMoneyOption.seriesOption]
      this.boxPlotRateMoneyChart.setOption(plotMoneyOption.option)
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
    },
    autoTip () {
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
    }
  }
}
</script>

<style scoped>
</style>
