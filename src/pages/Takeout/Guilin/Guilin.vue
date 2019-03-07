<template>
  <div>
    <div class="left-column">
      <div id="beijing-map-mifen" class="chart-container"></div>
    </div>
    <div class="right-column">
      <div id="mifen-bar" class="chart-container has-background"></div>
      <div id="box-plot-mifen" class="chart-container has-background"></div>
      <div class="chart-container has-background double-pie">
        <div id="pie-money" style="float: left;"></div>
        <div id="pie-order" style="float: left;"></div>
        <div id="pie-shop" style="float: left;"></div>
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
import plotOrderOption from './plotOption'
import barOption from './barOption'
import pieOption from './pieOption'

export default {
  name: 'TakeoutGuilin',
  data () {
    return {
      beijingMapContainer: null,
      chartBeijingMap: null,
      boxPlotRateOrderContainer: null,
      boxPlotRateOrderChart: null,
      mifenBarContainer: null,
      mifenBarChart: null,
      pieMoneyContainer: null,
      pieMoneyChart: null,
      pieOrderContainer: null,
      pieOrderChart: null,
      pieShopContainer: null,
      pieShopChart: null,
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
      that.resizeBoxPlotRateOrderContainer()
      that.boxPlotRateOrderChart.resize()
      that.resizeMifenBarContainer()
      that.mifenBarChart.resize()
      that.resizePieContainer(that.pieMoneyContainer)
      that.pieMoneyChart.resize()
      that.resizePieContainer(that.pieShopContainer)
      that.pieShopChart.resize()
      that.resizePieContainer(that.pieOrderContainer)
      that.pieOrderChart.resize()
    }
    this.autoTip()
  },
  methods: {
    initCharts () {
      echarts.registerMap('beijing', beijingJson)
      this.beijingMapContainer = document.getElementById('beijing-map-mifen')
      this.resizeBeijingMapContainer()
      this.chartBeijingMap = echarts.init(this.beijingMapContainer)
      this.setBeijingMapOption(defaultData.beijingData)

      this.mifenBarContainer = document.getElementById('mifen-bar')
      this.resizeMifenBarContainer()
      this.mifenBarChart = echarts.init(this.mifenBarContainer)
      this.setMifenBarOption(defaultData.nameData, defaultData.Data1, defaultData.Data2, defaultData.Data3, defaultData.Data4)

      this.boxPlotRateOrderContainer = document.getElementById('box-plot-mifen')
      this.resizeBoxPlotRateOrderContainer()
      this.boxPlotRateOrderChart = echarts.init(this.boxPlotRateOrderContainer)
      this.setBoxPlotRateOrderOption(defaultData.pricelist, defaultData.typedata)

      this.pieMoneyContainer = document.getElementById('pie-money')
      this.resizePieContainer(this.pieMoneyContainer)
      this.pieMoneyChart = echarts.init(this.pieMoneyContainer)
      this.setPieOption(this.pieMoneyChart, '成交额', defaultData.Moneynum_4)

      this.pieOrderContainer = document.getElementById('pie-order')
      this.resizePieContainer(this.pieOrderContainer)
      this.pieOrderChart = echarts.init(this.pieOrderContainer)
      this.setPieOption(this.pieOrderChart, '订单数', defaultData.Ordernum_4)

      this.pieShopContainer = document.getElementById('pie-shop')
      this.resizePieContainer(this.pieShopContainer)
      this.pieShopChart = echarts.init(this.pieShopContainer)
      this.setPieOption(this.pieShopChart, '商家数', defaultData.Shopnum_4)
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
    resizeBoxPlotRateOrderContainer () {
      this.boxPlotRateOrderContainer.style.width = (window.innerWidth * 0.5 - 20) + 'px'
      this.boxPlotRateOrderContainer.style.height = (window.innerHeight * 0.35 - 12) + 'px'
    },
    setBoxPlotRateOrderOption (orderdata, namedata) {
      let data = echarts.dataTool.prepareBoxplotData(orderdata)
      plotOrderOption.xAxisOption.data = namedata
      plotOrderOption.seriesOption.data = data.boxData
      plotOrderOption.option.xAxis = plotOrderOption.xAxisOption
      plotOrderOption.option.series = [plotOrderOption.seriesOption]
      this.boxPlotRateOrderChart.setOption(plotOrderOption.option)
    },
    resizeMifenBarContainer () {
      this.mifenBarContainer.style.width = (window.innerWidth * 0.5 - 20) + 'px'
      this.mifenBarContainer.style.height = (window.innerHeight * 0.32 - 12) + 'px'
    },
    setMifenBarOption (nameData, Data1, Data2, Data3, Data4) {
      barOption.xAxisOption.data = nameData
      barOption.seriesOption_1.data = Data1
      barOption.seriesOption_2.data = Data2
      barOption.seriesOption_3.data = Data3
      barOption.seriesOption_4.data = Data4
      barOption.option.xAxis = [barOption.xAxisOption]
      barOption.option.series = [barOption.seriesOption_1, barOption.seriesOption_2, barOption.seriesOption_3, barOption.seriesOption_4]
      this.mifenBarChart.setOption(barOption.option)
    },
    resizePieContainer (container) {
      container.style.width = Math.floor((window.innerWidth * 0.5 - 20 - 16) / 3.0) + 'px'
      container.style.height = (window.innerHeight * 0.3 - 12) + 'px'
    },
    setPieOption (chart, title, data) {
      pieOption.seriesOption.name = title
      pieOption.seriesOption.data = data
      pieOption.option.title.text = title
      pieOption.option.series = [pieOption.seriesOption]
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
