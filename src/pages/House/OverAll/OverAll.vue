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
      <div id='type-pie' class='chart-container has-background'></div>
      <div id='store-bar' class='chart-container has-background'></div>
      <div id='beijing-scatter' class='chart-container has-background'></div>
      <div class='chart-container has-background'></div>
      <div class='chart-container has-background'></div>
      <div class='chart-container has-background'></div>
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
import pieOption from './pieOption'
import barOption from './barOption'
import scatterOption from './scatterOption'

export default {
  name: 'House',
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

      this.typePieContainer = document.getElementById('type-pie')
      this.resizeTypePieContainer()
      this.typePieChart = echarts.init(this.typePieContainer)

      this.storeBarContainer = document.getElementById('store-bar')
      this.resizeStoreBarContainer()
      this.storeBarChart = echarts.init(this.storeBarContainer)

      this.beijingScatterContainer = document.getElementById('beijing-scatter')
      this.resizeBeijingScatterContainer()
      this.beijingScatterChart = echarts.init(this.beijingScatterContainer)
      this.beijingScatterChart.showLoading()

      this.showLoading()

      let that = this
      this.chartBeijingMap.on('click', function (params) {
        console.log('chartBeijingMap click', params)
        that.getData(params.name.substring(0, params.name.length - 1))
      })
    },
    showLoading () {
      this.typePieChart.showLoading()
      this.storeBarChart.showLoading()
    },
    // 动态设置图标内容
    setCharts (data) {
      console.log('setCharts', data)
      this.setBeijingMapOption(data.fig1.map(item => {
        return {name: item.name, value: item.value[this.mapType]}
      }))
      this.setTypePieOption(data.fig2, data.district + '外卖标签分类')
      this.setStoreBarOption(data.fig3.nameData, data.fig3.lineData, data.district + '单门店成交额前15名')
      this.setBeijingScatterOption(data.fig1)
      this.autoTip()
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
    resizeTypePieContainer () {
      this.typePieContainer.style.width = (window.innerWidth * 0.5 - 20) + 'px'
      this.typePieContainer.style.height = (window.innerHeight * 0.38 - 12) + 'px'
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
    resizeStoreBarContainer () {
      this.storeBarContainer.style.width = (window.innerWidth * 0.5 - 20) + 'px'
      this.storeBarContainer.style.height = (window.innerHeight * 0.32 - 12) + 'px'
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
    resizeBeijingScatterContainer () {
      this.beijingScatterContainer.style.width = (window.innerWidth * 0.5 - 20) + 'px'
      this.beijingScatterContainer.style.height = (window.innerHeight * 0.3 - 12) + 'px'
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
      that.resizeTypePieContainer()
      that.typePieChart.resize()
      that.resizeStoreBarContainer()
      that.storeBarChart.resize()
      that.resizeBeijingScatterContainer()
      that.beijingScatterChart.resize()
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
