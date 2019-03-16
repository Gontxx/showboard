<template>
  <div>
    <div class='left-column-house'>
      <div class="beijing-container">
        <div id='beijing-map' class='chart-container'></div>
        <div class="btn-group switch-bar" role="group">
          <button type="button" class="btn btn-default" :class="{'active': mapType ==='num' }" @click="mapType = 'num'">数量</button>
          <button type="button" class="btn btn-default" :class="{'active': mapType ==='avgPrice' }" @click="mapType = 'avgPrice'">均价</button>
        </div>
      </div>
      <div class="houseprice-container">
        <div class='chart-container has-background'></div>
        <div class='chart-container has-background'></div>
      </div>
    </div>
    <div class='right-column-house'>
      <div id='line' class='chart-container has-background'></div>
      <div id='store-bar' class='chart-container has-background'></div>
      <div id='type-bar' class='chart-container has-background'></div>
      <div id='size-bar' class='chart-container has-background'></div>
      <div id='unit-price-bar' class='chart-container has-background'></div>
      <div id='total-price-bar' class='chart-container has-background'></div>
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
import beijingJson from '@/components/beijing1.json'
import beijingOptions from '@/components/beijingOptions'
import defaultData from './defaultData'
import mapOption from './mapOption'
import lineOption from './lineOption'
import pieOption from './pieOption'
import barOption from './barOption'
import typeBarOption from './typeBarOption'
import sizeBarOption from './sizeBarOption'

export default {
  name: 'House',
  data () {
    return {
      beijingMapContainer: null,
      chartBeijingMap: null,
      lineContainer: null,
      lineChart: null,
      storeBarContainer: null,
      storeBarChart: null,
      typeBarContainer: null,
      typeBarChart: null,
      sizeBarContainer: null,
      sizeBarChart: null,
      unitPriceBarContainer: null,
      unitPriceBarChart: null,
      totalPriceBarContainer: null,
      totalPriceBarChart: null,
      mapType: 'num',
      current: 0,
      tmpData: defaultData
    }
  },
  watch: {
    mapType () {
      console.log('type change')
      this.setCharts(this.tmpData)
    }
  },
  methods: {
    // 图表初始化
    initCharts () {
      echarts.registerMap('beijing', beijingJson)
      this.beijingMapContainer = document.getElementById('beijing-map')
      this.resizeBeijingMapContainer()
      this.chartBeijingMap = echarts.init(this.beijingMapContainer)


      this.lineContainer = document.getElementById('line')
      this.resizeLineContainer()
      this.lineChart = echarts.init(this.lineContainer)

      this.storeBarContainer = document.getElementById('store-bar')
      this.resizeStoreBarContainer()
      this.storeBarChart = echarts.init(this.storeBarContainer)

      this.typeBarContainer = document.getElementById('type-bar')
      this.resizeTypeBarContainer()
      this.typeBarChart = echarts.init(this.typeBarContainer)
      this.typeBarChart.showLoading()

      this.sizeBarContainer = document.getElementById('size-bar')
      this.resizeSizeBarContainer()
      this.sizeBarChart = echarts.init(this.sizeBarContainer)
      this.sizeBarChart.showLoading()

      this.unitPriceBarContainer = document.getElementById('unit-price-bar')
      this.resizeUnitPriceBarContainer()
      this.unitPriceBarChart = echarts.init(this.unitPriceBarContainer)
      this.unitPriceBarChart.showLoading()

      this.totalPriceBarContainer = document.getElementById('total-price-bar')
      this.resizeTotalPriceBarContainer()
      this.totalPriceBarChart = echarts.init(this.totalPriceBarContainer)
      this.totalPriceBarChart.showLoading()

      this.showLoading()

      let that = this
      this.chartBeijingMap.on('click', function (params) {
        console.log('chartBeijingMap click', params)
        that.getData(params.name.substring(0, params.name.length - 1))
      })
    },
    showLoading () {
      this.storeBarChart.showLoading()
    },
    // 动态设置图标内容总函数
    setCharts (data) {
      console.log('setCharts', data)
      this.setBeijingMapOption(data.fig1.map(item => {
        return {name: item.name, value: item.value[this.mapType]}
      }))
      this.setlineOption(data.fig2)
      var namedata = []
      var linedata = []
      data.fig3.forEach(function (value, index, array) {
        namedata.push(value.name)
        linedata.push(value.value.toFixed(2))
      })
      // this.setStoreBarOption(data.fig3.nameData, data.fig3.lineData, data.district + '单门店成交额前15名')
      this.setStoreBarOption(namedata, linedata, '商圈房价柱状图')
      this.setTypeBarOption(data.fig4.map(item => {
        return {name: item.name, value: item.value['roomType']}
      }))
      this.setSizeBarOption(data.fig4.map(item => {
        return {name: item.name, value: item.value['areaSize']}
      }))
      this.setUnitPriceBarOption(data.fig4.map(item => {
        return {name: item.name, value: item.value['unitPrice']}
      }))
      this.setTotalPriceBarOption(data.fig4.map(item => {
        return {name: item.name, value: item.value['totalPrice']}
      }))
    },
    // 调整图表大小，同种类型的图表可共用一个
    resizeBeijingMapContainer () {
      this.beijingMapContainer.style.width = (window.innerWidth * 0.5 - 80 - 20) + 'px'
      this.beijingMapContainer.style.height = (window.innerHeight * 0.6 - 20) + 'px'
    },
    // 同类图表共用一个尺寸调整函数示例，参考外卖的Rate
    // 使用方法:this.resizeDoublePieContainer(this.doublePieMoneyContainer)
    resizeDoublePieContainer (container) {
      container.style.width = Math.floor((window.innerWidth * 0.5 - 20 - 16) / 3.0) + 'px'
      container.style.height = (window.innerHeight * 0.3 - 12) + 'px'
    },
    // 根据配置设置图表内容
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
      if (this.mapType === 'num') {
        this.chartBeijingMap.setOption({visualMap: {min: 0, max: 10000}})
      } else {
        this.chartBeijingMap.setOption({visualMap: {min: 0, max: 100000}})
      }
      this.chartBeijingMap.hideLoading()
    },
    // 同类图表共用一个设置函数示例，参考外卖的Rate
    // 使用方法this.setDoublePieOption(this.doublePieShopChart, data.district + '店铺数', data.fig4.shopNum_3, data.fig4.shopNum_9)
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
    resizeLineContainer () {
      this.lineContainer.style.width = (window.innerWidth * 0.5 - 20) + 'px'
      this.lineContainer.style.height = (window.innerHeight * 0.38 - 12) + 'px'
    },
    setlineOption (data) {
      var newdata = []
      // var total = 0
      // data.forEach(function (value, index, array) {
      //   total += value.value
      // })

      var t = 0
      data.forEach(function (value, index, array) {
        t += value.value

        newdata.push(value.value)
      })

      lineOption.option.series.data = newdata // [90, 105, 84, 125, 110, 92]
      lineOption.option.series.areaStyle.normal.color = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        {offset: 0, color: 'rgba(61,234,255, 0.9)'},
        {offset: 0.95, color: 'rgba(61,234,255, 0)'}
      ], false),
      this.lineChart.setOption(lineOption.option)
      this.lineChart.hideLoading()
    },
    resizeStoreBarContainer () {
      this.storeBarContainer.style.width = (window.innerWidth * 0.5 - 20) + 'px'
      this.storeBarContainer.style.height = (window.innerHeight * 0.32 - 12) + 'px'
    },
    setStoreBarOption (nameData, lineData, title) {
      barOption.option.title.text = title
      barOption.xAxisOption.data = nameData
      barOption.seriesOption.data = lineData
      barOption.option.xAxis = barOption.xAxisOption
      barOption.option.series = [barOption.seriesOption]
      this.storeBarChart.setOption(barOption.option)
      this.storeBarChart.hideLoading()
    },

    resizeTypeBarContainer () {
      this.typeBarContainer.style.width = (window.innerWidth * 0.5 - 20) + 'px'
      this.typeBarContainer.style.height = (window.innerHeight * 0.4 - 12) + 'px'
    },
    setTypeBarOption (data) {
      var data1 = []
      var data2 = []
      var data3 = []
      var data4 = []
      var xdata = []


      data.forEach(function (value, index, array) {
        data1.push(value.value[0].value)
        data2.push(value.value[1].value)
        data3.push(value.value[2].value)
        data4.push(value.value[3].value)
        xdata.push(value.name)
      })

      typeBarOption.option.title.text = '各区房型分布'
      typeBarOption.option.legend.data = ['一居', '二居', '三居', '四居及以上']
      typeBarOption.xAxisOption.data = xdata
      typeBarOption.option.xAxis = typeBarOption.xAxisOption
      typeBarOption.option.series[0].data = data1
      typeBarOption.option.series[1].data = data2
      typeBarOption.option.series[2].data = data3
      typeBarOption.option.series[3].data = data4
      this.typeBarChart.setOption(typeBarOption.option)
      this.typeBarChart.hideLoading()
    },

    resizeSizeBarContainer () {
      this.typeBarContainer.style.width = (window.innerWidth * 0.5 - 20) + 'px'
      this.typeBarContainer.style.height = (window.innerHeight * 0.4 - 12) + 'px'
    },
    setSizeBarOption (data) {
      var data1 = []
      var data2 = []
      var data3 = []
      var data4 = []
      var data5 = []
      var xdata = []


      data.forEach(function (value, index, array) {
        data1.push(value.value[0].value)
        data2.push(value.value[1].value)
        data3.push(value.value[2].value)
        data4.push(value.value[3].value)
        data5.push(value.value[4].value)
        xdata.push(value.name)
      })
      console.log(xdata)

      sizeBarOption.option.title.text = '各区房屋面积分布'
      sizeBarOption.option.legend.data = ['50m2以下', '50-80m2', '80-110m2', '110-150m2', '150m2以上']
      sizeBarOption.xAxisOption.data = xdata
      sizeBarOption.option.xAxis = sizeBarOption.xAxisOption
      sizeBarOption.option.series[0].data = data1
      sizeBarOption.option.series[1].data = data2
      sizeBarOption.option.series[2].data = data3
      sizeBarOption.option.series[3].data = data4
      sizeBarOption.option.series[3].data = data5
      this.sizeBarChart.setOption(sizeBarOption.option)
      this.sizeBarChart.hideLoading()
    },

    resizeUnitPriceBarContainer () {
      this.typeBarContainer.style.width = (window.innerWidth * 0.5 - 20) + 'px'
      this.typeBarContainer.style.height = (window.innerHeight * 0.4 - 12) + 'px'
    },
    setUnitPriceBarOption (data) {
      // var data1 = new Array()
      // var data2 = new Array()
      // var data3 = new Array()
      // var data4 = new Array()
      // var xdata = new Array()
      //
      //
      // data.forEach(function (value, index, array) {
      //   data1.push(value.value[0].value)
      //   data2.push(value.value[1].value)
      //   data3.push(value.value[2].value)
      //   data4.push(value.value[3].value)
      //   xdata.push(value.name)
      // })
      // console.log(xdata)
      //
      // unitPriceBarOption.option.title.text = '各区房型分布'
      // unitPriceBarOption.option.legend.data = ['一居', '二居', '三居', '四居及以上']
      // unitPriceBarOption.xAxisOption.data = xdata
      // unitPriceBarOption.option.xAxis = unitPriceBarOption.xAxisOption
      // unitPriceBarOption.option.series[0].data = data1
      // unitPriceBarOption.option.series[1].data = data2
      // unitPriceBarOption.option.series[2].data = data3
      // unitPriceBarOption.option.series[3].data = data4
      // this.typeBarChart.setOption(typeBarOption.option)
      // this.typeBarChart.hideLoading()
    },

    resizeTotalPriceBarContainer () {
      this.typeBarContainer.style.width = (window.innerWidth * 0.5 - 20) + 'px'
      this.typeBarContainer.style.height = (window.innerHeight * 0.4 - 12) + 'px'
    },
    setTotalPriceBarOption (data) {
      // var data1 = new Array()
      // var data2 = new Array()
      // var data3 = new Array()
      // var data4 = new Array()
      // var xdata = new Array()
      //
      //
      // data.forEach(function (value, index, array) {
      //   data1.push(value.value[0].value)
      //   data2.push(value.value[1].value)
      //   data3.push(value.value[2].value)
      //   data4.push(value.value[3].value)
      //   xdata.push(value.name)
      // })
      // console.log(xdata)
      //
      // typeBarOption.option.title.text = '各区房型分布'
      // typeBarOption.option.legend.data = ['一居', '二居', '三居', '四居及以上']
      // typeBarOption.xAxisOption.data = xdata
      // typeBarOption.option.xAxis = typeBarOption.xAxisOption
      // typeBarOption.option.series[0].data = data1
      // typeBarOption.option.series[1].data = data2
      // typeBarOption.option.series[2].data = data3
      // typeBarOption.option.series[3].data = data4
      // this.typeBarChart.setOption(typeBarOption.option)
      // this.typeBarChart.hideLoading()
    },
    initWSocket () {
      let that = this
      let onopen = function () {
        console.log('open')
        that.getData('')
      }
      let onmessage = function (event) {
        // console.log('onmessage', event)
        let res = JSON.parse(event.data)
        try {
          let data = JSON.parse(res.data)
          let result = JSON.parse(data.result)
          that.tmpData = result
          if (res.action === 'onExecuteResult') {
            that.setCharts(result)
          }
        } catch (e) {
          console.log('出现错误！可能原因：合约号不存在')
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
      request.arg = JSON.stringify({
        action: 'connectDBAndQueryHouse',
        arg: JSON.stringify({
          type: 'house',
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
    // 建立webSocket连接
    // this.initWSocket()
    // 暂时使用默认数据
    this.setCharts(this.tmpData)
    let that = this
    window.onresize = function () {
      // 重置容器高宽
      that.resizeBeijingMapContainer()
      that.chartBeijingMap.resize()
      that.resizeLineContainer()
      that.lineChart.resize()
      that.resizeStoreBarContainer()
      that.storeBarChart.resize()
      that.resizeTypeBarContainer()
      that.typeBarChart.resize()
      that.resizeSizeBarContainer()
      that.sizeBarChart.resize()
      that.resizeUnitPriceBarContainer()
      that.unitPriceBarChart.resize()
      that.resizeTotalPriceBarContainer()
      that.totalPriceBarChart.resize()
    }
  }
}
</script>

<style scoped>
  .switch-bar {
    position: absolute;
    left: calc(50% - 60px);
    bottom: 0;
  }
  .left-column-house {
    width: calc(50% - 80px);
    height: 100vh;
    float: left;
  }
  .right-column-house {
    width: 50%;
    height: 100vh;
    position: relative;
    float: left;
    overflow: scroll;
  }
  .beijing-container {
    position: relative;
  }
  .houseprice-container {
    height: 40vh;
    overflow: scroll;
  }
</style>
