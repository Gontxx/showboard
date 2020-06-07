<template>
  <div class="main-column">
    <div class='left-column-house'>
      <div class="beijing-container">
        <div id='beijing-map' class='chart-container'></div>
        <div class="btn-group switch-bar" role="group">
          <button type="button" class="btn btn-default" :class="{'active': mapType ==='num' }" @click="mapType = 'num'">数量</button>
          <button type="button" class="btn btn-default" :class="{'active': mapType ==='avgPrice' }" @click="mapType = 'avgPrice'">均价</button>
        </div>
        <hash-result :hash="hashResult" :top="true"></hash-result>
      </div>
      <div id='unit-price-bar' class='chart-container has-background'></div>
      <div id='total-price-bar' class='chart-container has-background'></div>
    </div>
    <div class='right-column-house'>
      <div id='line' class='chart-container has-background'></div>
      <div id='store-bar' class='chart-container has-background'></div>
      <div id='type-bar' class='chart-container has-background'></div>
      <div id='size-bar' class='chart-container has-background'></div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import 'echarts/lib/chart/map'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/scatter'
import { createWssocket } from '@/assets/createWS'
import beijingJson from '@/components/beijing1.json'
import beijingOptions from '@/components/beijingOptions'
import defaultData from './defaultData'
import mapOption from './mapOption'
import lineOption from './lineOption'
import barOption from './barOption'
import typeBarOption from './typeBarOption'
import sizeBarOption from './sizeBarOption'
import unitPriceBarOption from './unitPriceBarOption'
import totalPriceBarOption from './totalPriceBarOption'
import hashResult from '@/components/hashResult'

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
      tmpData: defaultData,
      district: '北京市',
      hashResult: ''
    }
  },
  components: {
    hashResult
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
      this.chartBeijingMap = echarts.init(this.beijingMapContainer)

      this.lineContainer = document.getElementById('line')
      this.lineChart = echarts.init(this.lineContainer)

      this.storeBarContainer = document.getElementById('store-bar')
      this.storeBarChart = echarts.init(this.storeBarContainer)

      this.typeBarContainer = document.getElementById('type-bar')
      this.typeBarChart = echarts.init(this.typeBarContainer)

      this.sizeBarContainer = document.getElementById('size-bar')
      this.sizeBarChart = echarts.init(this.sizeBarContainer)

      this.unitPriceBarContainer = document.getElementById('unit-price-bar')
      this.unitPriceBarChart = echarts.init(this.unitPriceBarContainer)

      this.totalPriceBarContainer = document.getElementById('total-price-bar')
      this.totalPriceBarChart = echarts.init(this.totalPriceBarContainer)

      this.resizeChart()
      this.showLoading()
      this.typeBarChart.showLoading()
      this.sizeBarChart.showLoading()
      this.unitPriceBarChart.showLoading()
      this.totalPriceBarChart.showLoading()

      let that = this
      this.chartBeijingMap.on('click', function (params) {
        // console.log('chartBeijingMap click', params)
        that.district = params.name
        that.getData(params.name.substring(0, params.name.length - 1))
      })
    },
    showLoading () {
      this.lineChart.showLoading()
      this.storeBarChart.showLoading()
      // this.typeBarChart.showLoading()
      // this.sizeBarChart.showLoading()
      // this.unitPriceBarChart.showLoading()
      // this.totalPriceBarChart.showLoading()
    },
    resizeChart () {
      let ww = window.innerWidth
      let hh = window.innerHeight
      this.resizeContainer(this.beijingMapContainer, (ww * 0.5 - 40 - 20), (hh * 0.48 - 16))
      this.chartBeijingMap.resize()
      this.resizeContainer(this.lineContainer, (ww * 0.5 - 40 - 20), (hh * 0.24 - 12))
      this.lineChart.resize()
      this.resizeContainer(this.storeBarContainer, (ww * 0.5 - 40 - 20), (hh * 0.24 - 12))
      this.storeBarChart.resize()
      this.resizeContainer(this.typeBarContainer, (ww * 0.5 - 40 - 20), (hh * 0.26 - 12))
      this.typeBarChart.resize()
      this.resizeContainer(this.sizeBarContainer, (ww * 0.5 - 40 - 20), (hh * 0.26 - 12))
      this.sizeBarChart.resize()
      this.resizeContainer(this.unitPriceBarContainer, (ww * 0.5 - 40 - 20), (hh * 0.26 - 12))
      this.unitPriceBarChart.resize()
      this.resizeContainer(this.totalPriceBarContainer, (ww * 0.5 - 40 - 20), (hh * 0.26 - 12))
      this.totalPriceBarChart.resize()
    },
    resizeContainer (container, width, height) {
      container.style.width = width + 'px'
      container.style.height = height + 'px'
    },
    switchChart () {
      this.current = 1 - this.current
    },
    // 动态设置图标内容总函数
    setCharts (data) {
      console.log('setCharts', data)
      this.setBeijingMapOption(data.fig1.map(item => {
        return {name: item.name, value: item.value[this.mapType], mapType: this.mapType}
      }))
      this.setlineOption(data.fig2, this.district + '房价分布图')
      var namedata = []
      var linedata = []
      data.fig3.forEach(function (value, index, array) {
        namedata.push(value.name)
        linedata.push(value.value)
      })
      this.setStoreBarOption(namedata, linedata, this.district + '商圈房屋数量柱状图')
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
    setlineOption (data, title) {
      var newdata = []
      var total = 0
      var t = 0
      data.forEach(function (value, index, array) {
        total += value.value
      })

      data.forEach(function (value, index, array) {
        t += value.value
        newdata.push(t / total)
      })
      lineOption.option.title.text = title
      lineOption.option.series.data = newdata // [90, 105, 84, 125, 110, 92]
      lineOption.option.series.areaStyle.normal.color = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        {offset: 0, color: 'rgba(61,234,255, 0.9)'},
        {offset: 0.95, color: 'rgba(61,234,255, 0)'}
      ], false)
      this.lineChart.setOption(lineOption.option)
      this.lineChart.hideLoading()
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
      // console.log(xdata)

      sizeBarOption.option.title.text = '各区房屋面积分布'
      sizeBarOption.option.legend.data = ['50m2以下', '50-80m2', '80-110m2', '110-150m2', '150m2以上']
      sizeBarOption.xAxisOption.data = xdata
      sizeBarOption.option.xAxis = sizeBarOption.xAxisOption
      sizeBarOption.option.series[0].data = data1
      sizeBarOption.option.series[1].data = data2
      sizeBarOption.option.series[2].data = data3
      sizeBarOption.option.series[3].data = data4
      sizeBarOption.option.series[4].data = data5
      this.sizeBarChart.setOption(sizeBarOption.option)
      this.sizeBarChart.hideLoading()
    },

    setUnitPriceBarOption (data) {
      var data1 = []
      var data2 = []
      var data3 = []
      var data4 = []
      var data5 = []
      var data6 = []
      var data7 = []
      var data8 = []
      var data9 = []
      var data10 = []
      var data11 = []
      var xdata = []

      data.forEach(function (value, index, array) {
        data1.push(value.value[0].value)
        data2.push(value.value[1].value)
        data3.push(value.value[2].value)
        data4.push(value.value[3].value)
        data5.push(value.value[4].value)
        data6.push(value.value[5].value)
        data7.push(value.value[6].value)
        data8.push(value.value[7].value)
        data9.push(value.value[8].value)
        data10.push(value.value[9].value)
        data11.push(value.value[10].value)
        xdata.push(value.name)
      })
      // console.log(xdata)

      unitPriceBarOption.option.title.text = '各区房屋单价分布'
      unitPriceBarOption.option.legend.data = ['<1w', '1-2w', '2-3w', '3-4w', '4-5w', '5-6w', '6-7w', '7-8w', '8-9w', '9-10w', '>10w']
      unitPriceBarOption.xAxisOption.data = xdata
      unitPriceBarOption.option.xAxis = unitPriceBarOption.xAxisOption
      unitPriceBarOption.option.series[0].data = data1
      unitPriceBarOption.option.series[1].data = data2
      unitPriceBarOption.option.series[2].data = data3
      unitPriceBarOption.option.series[3].data = data4
      unitPriceBarOption.option.series[4].data = data5
      unitPriceBarOption.option.series[5].data = data6
      unitPriceBarOption.option.series[6].data = data7
      unitPriceBarOption.option.series[7].data = data8
      unitPriceBarOption.option.series[8].data = data9
      unitPriceBarOption.option.series[9].data = data10
      unitPriceBarOption.option.series[10].data = data11
      this.unitPriceBarChart.setOption(unitPriceBarOption.option)
      this.unitPriceBarChart.hideLoading()
    },
    setTotalPriceBarOption (data) {
      var data1 = []
      var data2 = []
      var data3 = []
      var data4 = []
      var data5 = []
      var data6 = []
      var xdata = []

      data.forEach(function (value, index, array) {
        data1.push(value.value[0].value)
        data2.push(value.value[1].value)
        data3.push(value.value[2].value)
        data4.push(value.value[3].value)
        data5.push(value.value[4].value)
        data6.push(value.value[5].value)
        xdata.push(value.name)
      })

      totalPriceBarOption.option.title.text = '各区房屋总价分布'
      totalPriceBarOption.option.legend.data = ['200万以下', '200-300万', '300-500万', '500-700万', '700-1000万', '1000万以上']
      totalPriceBarOption.xAxisOption.data = xdata
      totalPriceBarOption.option.xAxis = totalPriceBarOption.xAxisOption
      totalPriceBarOption.option.series[0].data = data1
      totalPriceBarOption.option.series[1].data = data2
      totalPriceBarOption.option.series[2].data = data3
      totalPriceBarOption.option.series[3].data = data4
      totalPriceBarOption.option.series[4].data = data5
      totalPriceBarOption.option.series[5].data = data6
      this.totalPriceBarChart.setOption(totalPriceBarOption.option)
      this.totalPriceBarChart.hideLoading()
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
            that.tmpData = result
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
      that.resizeChart()
    }
  }
}
</script>

<style scoped>
  .main-column {
    width: calc(100% - 80px);
    height: 100vh;
    overflow: scroll;
  }
  .switch-bar {
    position: absolute;
    left: calc(50% - 60px);
    bottom: 0;
  }
  .left-column-house {
    width: 50%;
    height: 100vh;
    float: left;
  }
  .right-column-house {
    width: 50%;
    height: 100vh;
    float: left;
  }
  .beijing-container {
    position: relative;
  }
</style>
