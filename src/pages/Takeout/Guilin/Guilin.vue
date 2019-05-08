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
      that.resizeChart()
    }
  },
  methods: {
    initCharts () {
      echarts.registerMap('beijing', beijingJson)
      this.beijingMapContainer = document.getElementById('beijing-map-mifen')
      this.chartBeijingMap = echarts.init(this.beijingMapContainer)

      this.mifenBarContainer = document.getElementById('mifen-bar')
      this.mifenBarChart = echarts.init(this.mifenBarContainer)

      this.boxPlotRateOrderContainer = document.getElementById('box-plot-mifen')
      this.boxPlotRateOrderChart = echarts.init(this.boxPlotRateOrderContainer)

      this.pieMoneyContainer = document.getElementById('pie-money')
      this.pieMoneyChart = echarts.init(this.pieMoneyContainer)

      this.pieOrderContainer = document.getElementById('pie-order')
      this.pieOrderChart = echarts.init(this.pieOrderContainer)

      this.pieShopContainer = document.getElementById('pie-shop')
      this.pieShopChart = echarts.init(this.pieShopContainer)

      this.resizeChart()
      this.setCharts(defaultData)
    },
    resizeChart () {
      let ww = window.innerWidth
      let hh = window.innerHeight
      this.resizeContainer(this.beijingMapContainer, (ww * 0.5 - 40), (hh - 20))
      this.chartBeijingMap.resize()
      this.resizeContainer(this.mifenBarContainer, (ww * 0.5 - 20), (hh * 0.35 - 12))
      this.mifenBarChart.resize()
      this.resizeContainer(this.boxPlotRateOrderContainer, (ww * 0.5 - 20), (hh * 0.32 - 12))
      this.boxPlotRateOrderChart.resize()
      this.resizeContainer(this.pieMoneyContainer, Math.floor((ww * 0.5 - 20 - 16) / 3.0), (hh * 0.3 - 12))
      this.pieMoneyChart.resize()
      this.resizeContainer(this.pieOrderContainer, Math.floor((ww * 0.5 - 20 - 16) / 3.0), (hh * 0.3 - 12))
      this.pieOrderChart.resize()
      this.resizeContainer(this.pieShopContainer, Math.floor((ww * 0.5 - 20 - 16) / 3.0), (hh * 0.3 - 12))
      this.pieShopChart.resize()
    },
    resizeContainer (container, width, height) {
      container.style.width = width + 'px'
      container.style.height = height + 'px'
    },
    setCharts (data) {
      console.log('setCharts', data)
      this.setBeijingMapOption(data.beijingData)
      this.setMifenBarOption(data.nameData, data.Data1, data.Data2, data.Data3, data.Data4)
      this.setBoxPlotRateOrderOption(data.pricelist, data.typedata)
      this.setPieOption(this.pieMoneyChart, '成交额', data.Moneynum_4)
      this.setPieOption(this.pieOrderChart, '订单数', data.Ordernum_4)
      this.setPieOption(this.pieShopChart, '商家数', data.Shopnum_4)

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
    setBoxPlotRateOrderOption (orderdata, namedata) {
      let data = echarts.dataTool.prepareBoxplotData(orderdata)
      plotOrderOption.xAxisOption.data = namedata
      plotOrderOption.seriesOption.data = data.boxData
      plotOrderOption.option.xAxis = plotOrderOption.xAxisOption
      plotOrderOption.option.series = [plotOrderOption.seriesOption]
      this.boxPlotRateOrderChart.setOption(plotOrderOption.option)
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
