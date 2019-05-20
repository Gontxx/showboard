<template>
  <div>
    <div class='left-column-hotel'>
      <div id='type-pie' class='chart-container has-background'></div>
      <div id='store-bar' class='chart-container has-background'></div>
    </div>
    <div class='right-column-hotel'>
      <div id='scatter' class='chart-container has-background'></div>
      <div id='rating-bar' class='chart-container has-background'></div>
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
import defaultData from './defaultData'
import pieOption from './pieOption'
import barOption from './barOption'
import scatterOption from './scatterOption'

export default {
  name: 'Meituan',
  data () {
    return {
      typePieContainer: null,
      typePieChart: null,
      storeBarContainer: null,
      storeBarChart: null,
      beijingScatterContainer: null,
      beijingScatterChart: null,
      ratingBarContainer: null,
      ratingBarChart: null,
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
      this.typePieContainer = document.getElementById('type-pie')
      this.typePieChart = echarts.init(this.typePieContainer)

      this.storeBarContainer = document.getElementById('store-bar')
      this.storeBarChart = echarts.init(this.storeBarContainer)

      this.beijingScatterContainer = document.getElementById('scatter')
      this.beijingScatterChart = echarts.init(this.beijingScatterContainer)

      this.ratingBarContainer = document.getElementById('rating-bar')
      this.ratingBarChart = echarts.init(this.ratingBarContainer)

      this.resizeChart()
      this.showLoading()
    },
    showLoading () {
      this.typePieChart.showLoading()
      this.storeBarChart.showLoading()
      this.beijingScatterChart.showLoading()
      this.ratingBarChart.showLoading()
    },
    resizeChart () {
      let ww = window.innerWidth
      let hh = window.innerHeight
      this.resizeContainer(this.typePieContainer, (ww * 0.5 - 40 - 12), (hh * 0.5 - 12))
      this.typePieChart.resize()
      this.resizeContainer(this.storeBarContainer, (ww * 0.5 - 40 - 12), (hh * 0.5 - 12))
      this.storeBarChart.resize()
      this.resizeContainer(this.beijingScatterContainer, (ww * 0.5 - 40 - 12), (hh * 0.5 - 12))
      this.beijingScatterChart.resize()
      this.resizeContainer(this.ratingBarContainer, (ww * 0.5 - 40 - 12), (hh * 0.5 - 12))
      this.ratingBarChart.resize()
    },
    resizeContainer (container, width, height) {
      container.style.width = width + 'px'
      container.style.height = height + 'px'
    },
    setCharts (data) {
      console.log('setCharts', data)
      this.setTypePieOption(data.fig1, '外卖标签分类')
      this.setStoreBarOption(this.storeBarChart, data.fig2.nameData, data.fig2.lineData, '单门店成交额前15名')
      this.setStoreBarOption(this.ratingBarChart, data.fig4.nameData, data.fig4.lineData, '单门店评分前15名')
      this.setBeijingScatterOption(data.fig3)
      // this.autoTip()
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
    setStoreBarOption (chart, nameData, lineData, title) {
      barOption.yAxisOption.data = nameData
      barOption.seriesOption_1.data = lineData
      barOption.seriesOption_2.data = lineData
      barOption.option.yAxis = [barOption.yAxisOption]
      barOption.option.series = [barOption.seriesOption_1, barOption.seriesOption_2]
      barOption.option.title.text = title
      chart.setOption(barOption.option)
      chart.hideLoading()
    },
    setBeijingScatterOption (data) {
      // console.log(data)
      scatterOption.legendOption.data = data.map(item => {
        return item.area
      })
      scatterOption.option.legend = scatterOption.legendOption

      scatterOption.option.series = data.map(item => {
        let option = deepCopy(scatterOption.seriesOption)
        option.name = item.area
        option.symbolSize = function (data) {
          return Math.sqrt(data[2]) / 20
        }
        option.label.normal.formatter = function (param) {
          return param.data[3]
        }
        option.label.emphasis.formatter = function (param) {
          return param.data[3]
        }
        // option.data = [deepCopy([item.shopNum, item.saleNum, item.saleNum])]
        option.data = [[]]
        option.data[0].push(item.shopNum)
        option.data[0].push(item.saleNum)
        option.data[0].push(item.saleNum)
        option.data[0].push(item.area)
        // console.log(option.data)
        return option
      })
      this.beijingScatterChart.setOption(scatterOption.option)
      this.beijingScatterChart.hideLoading()
    },
    autoTip () {
      if (this.timer1 !== -1) {
        clearInterval(this.timer1)
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
      request.contractID = this.$global.contractID
      request.requestID = new Date().getTime()
      request.arg = JSON.stringify({
        action: 'connectDBAndQueryNeimeng',
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
