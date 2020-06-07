<template>
  <div class="main-column">
    <div class='row-enterprise'>
      <div class='left-column-enterprise'>
        <div class="beijing-container">
          <div id='beijing-map' class='chart-container'></div>
          <hash-result :hash="hashResult" :top="true"></hash-result>
        </div>
        <div id="double-pie-count" class='chart-container'></div>
      </div>
      <div class='right-column-enterprise'>
        <div id='type-pie' class='chart-container has-background'></div>
        <div id='capital-cdf' class='chart-container has-background'></div>
        <div id='capital-box' class='chart-container has-background'></div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import 'echarts/lib/chart/map'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/scatter'
import 'echarts/extension/dataTool'
import { createWssocket } from '@/assets/createWS'
import beijingJson from '@/components/beijing1.json'
import beijingOptions from '@/components/beijingOptions'
import defaultData from './defaultData'
import mapOption from './mapOption'
import lineOption from './lineOption'
import doublePieOption from './doublePieOption'
// import barOption from './barOption'
import plotOrderOption from './plotOption'
import pieOption from './pieOption'
// import typeBarOption from './typeBarOption'
// import typeBarOption from './typeBarOption'
// import sizeBarOption from './sizeBarOption'
// import unitPriceBarOption from './unitPriceBarOption'
// import totalPriceBarOption from './totalPriceBarOption'
import hashResult from '@/components/hashResult'

export default {
  name: 'Company',
  data () {
    return {
      beijingMapContainer: null,
      chartBeijingMap: null,
      topTenBarContainer: null,
      topTenBarChart: null,
      capitalCdfContainer: null,
      capitalCdfChart: null,
      typePieContainer: null,
      typePieChart: null,
      typeBarPieContainer: null,
      typeBarPieChart: null,
      capitalBoxContainer: null,
      capitalBoxChart: null,
      current: 0,
      tmpData: defaultData,
      hashResult: ''
    }
  },
  components: {
    hashResult
  },
  methods: {
    // 图表初始化
    initCharts () {
      echarts.registerMap('beijing', beijingJson)
      this.beijingMapContainer = document.getElementById('beijing-map')
      this.chartBeijingMap = echarts.init(this.beijingMapContainer)

      // this.topTenBarContainer = document.getElementById('top-ten-bar')
      // this.topTenBarChart = echarts.init(this.topTenBarContainer)

      this.capitalCdfContainer = document.getElementById('capital-cdf')
      this.capitalCdfChart = echarts.init(this.capitalCdfContainer)

      this.typePieContainer = document.getElementById('type-pie')
      this.typePieChart = echarts.init(this.typePieContainer)

      this.typeDoublePieContainer = document.getElementById('double-pie-count')
      this.typeDoublePieChart = echarts.init(this.typeDoublePieContainer)

      this.capitalBoxContainer = document.getElementById('capital-box')
      this.capitalBoxChart = echarts.init(this.capitalBoxContainer)

      this.resizeChart()
      this.showLoading()

      let that = this
      this.chartBeijingMap.on('click', function (params) {
        // console.log('chartBeijingMap click', params)
        that.district = params.name
        that.getData(params.name.substring(0, params.name.length - 1))
      })

      that = this
      this.typeDoublePieChart.on('mouseover', function (params) {
        if (params.seriesIndex === 1) return
        doublePieOption.seriesOption_2.encode.value = params.data[0]
        doublePieOption.seriesOption_2.encode.tooltip = params.data[0]
        // console.log(params.data[0])
        doublePieOption.option.series = [doublePieOption.seriesOption_1, doublePieOption.seriesOption_2]
        // console.log(doublePieOption.option)
        that.typeDoublePieChart.setOption(doublePieOption.option)
      })
    },
    showLoading () {
      this.chartBeijingMap.showLoading()
      // this.topTenBarChart.showLoading()
      this.capitalCdfChart.showLoading()
      this.typePieChart.showLoading()
      this.typeDoublePieChart.showLoading()
      this.capitalBoxChart.showLoading()
    },
    resizeChart () {
      let ww = window.innerWidth
      let hh = window.innerHeight
      this.resizeContainer(this.beijingMapContainer, (ww * 0.5 - 40 - 20), (hh * 0.6 - 16))
      this.chartBeijingMap.resize()
      // this.resizeContainer(this.topTenBarContainer, (ww * 0.5 - 40 - 20), (hh * 0.4 - 12))
      // this.topTenBarChart.resize()
      this.resizeContainer(this.capitalCdfContainer, (ww * 0.5 - 40 - 20), (hh * 0.33 - 12))
      this.capitalCdfChart.resize()
      this.resizeContainer(this.capitalBoxContainer, (ww * 0.5 - 40 - 20), (hh * 0.33 - 12))
      this.capitalBoxChart.resize()
      this.resizeContainer(this.typePieContainer, (ww * 0.5 - 40 - 20), (hh * 0.33 - 12))
      this.typePieChart.resize()
      this.resizeContainer(this.typeDoublePieContainer, (ww * 0.5 - 40 - 20), (hh * 0.4 - 12))
      this.typeDoublePieChart.resize()
    },
    resizeContainer (container, width, height) {
      container.style.width = width + 'px'
      container.style.height = height + 'px'
    },
    setCharts (data) {
      console.log('setCharts', data)
      this.setBeijingMapOption(data.fig1)
      this.setPieOption(this.typePieChart, data.district + '行业分类', data.fig2)
      var namedata = []
      var linedata = []
      data.fig3.forEach(function (value, index, array) {
        namedata.push(value.name)
        linedata.push(value.value)
      })
      // this.setTopTenBarOption(namedata, linedata, data.district + '前十大热门行业')
      this.setLineOption(data.fig4, data.district + '企业注册资金分布')
      var nameList = []
      var capitalList = []
      data.fig5.forEach(function (value, index, array) {
        nameList.push(value.name)
        capitalList.push(value.value)
      })
      this.setBoxPlotRateOrderOption(capitalList, nameList, data.district + '各类型企业注册资金分布')
      this.setDoublePieOption(this.typeDoublePieChart, '企业数量', data.fig6)
      // this.setlineOption(data.fig2, this.district + '房价分布图')
      // var namedata = []
      // var linedata = []
      // data.fig3.forEach(function (value, index, array) {
      //   namedata.push(value.name)
      //   linedata.push(value.value)
      // })
      // this.setStoreBarOption(namedata, linedata, this.district + '商圈房屋数量柱状图')
      // this.setTypeBarOption(data.fig4.map(item => {
      //   return {name: item.name, value: item.value['roomType']}
      // }))
      // this.setSizeBarOption(data.fig4.map(item => {
      //   return {name: item.name, value: item.value['areaSize']}
      // }))
      // this.setUnitPriceBarOption(data.fig4.map(item => {
      //   return {name: item.name, value: item.value['unitPrice']}
      // }))
      // this.setTotalPriceBarOption(data.fig4.map(item => {
      //   return {name: item.name, value: item.value['totalPrice']}
      // }))
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
            value: geoCoord.concat(data[i].value)
          })
        }
      }
      return res
    },
    transformData (data) {
      let res = []
      let topTen = data.slice()
      topTen.sort(function (a, b) {
        return b.value - a.value
      })
      let num = topTen[9].value
      data.forEach(function (value, index, array) {
        res.push({
          name: value.name,
          value: value.value,
          label: {
            show: value.value >= num
          },
          labelLine: {
            show: value.value >= num
          },
          avoidLabelOverlap: value.value >= num
        })
      })
      return res
    },
    setPieOption (chart, title, data) {
      pieOption.seriesOption.name = title
      pieOption.seriesOption.data = this.transformData(data)
      pieOption.option.title.text = title
      pieOption.option.series = [pieOption.seriesOption]
      console.log(pieOption.option)
      chart.setOption(pieOption.option)
      this.typePieChart.hideLoading()
    },
    // setTopTenBarOption (nameData, lineData, title) {
    //   barOption.option.title.text = title
    //   barOption.xAxisOption.data = nameData
    //   barOption.seriesOption.data = lineData
    //   barOption.option.xAxis = barOption.xAxisOption
    //   barOption.option.series = [barOption.seriesOption]
    //   this.topTenBarChart.setOption(barOption.option)
    //   this.topTenBarChart.hideLoading()
    // },
    setLineOption (data, title) {
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
      this.capitalCdfChart.setOption(lineOption.option)
      this.capitalCdfChart.hideLoading()
    },
    setBoxPlotRateOrderOption (orderdata, namedata, title) {
      let data = echarts.dataTool.prepareBoxplotData(orderdata)
      plotOrderOption.xAxisOption.data = namedata
      plotOrderOption.seriesOption.data = data.boxData
      plotOrderOption.option.xAxis = plotOrderOption.xAxisOption
      plotOrderOption.option.series = [plotOrderOption.seriesOption]
      plotOrderOption.option.title.text = title
      console.log(title)
      console.log(plotOrderOption.option)
      this.capitalBoxChart.setOption(plotOrderOption.option)
      this.capitalBoxChart.hideLoading()
    },
    convertData1 (data) {
      let res = []
      for (let i = 0; i < data.length; ++i) {
        let cnt = 0
        for (let j = 0; j < data.length; ++j) {
          cnt += data[i].value[j].value
        }
        res.push({
          name: data[i].name,
          value: cnt
        })
      }
      return res
    },
    getDataset (data) {
      let ds = [['district']]
      let ds1 = [['district']]
      for (let i = 0; i < data[0].value.length; ++i) {
        ds.push([data[0].value[i].name])
        ds1.push([data[0].value[i].name])
      }
      for (let i = 0; i < data.length; ++i) {
        ds[0].push(data[i].name)
        for (let j = 0; j < data[i].value.length; ++j) {
          ds[1 + j].push(data[i].value[j].value)
        }
      }
      let all = 0
      ds1[0].push('sum')
      for (let i = 1; i < ds.length; ++i) {
        var cnt = 0
        for (let j = 2; j < ds[i].length; ++j) {
          cnt += ds[i][j]
        }
        ds1[i].push(cnt)
        all += cnt
      }
      ds1[0].push('percent')
      for (let i = 1; i < ds.length; ++i) {
        ds1[i].push(ds1[i][1] / all)
      }
      return [{source: ds}, {source: ds1}]
    },
    setDoublePieOption (chart, title, data) {
      doublePieOption.option.dataset = this.getDataset(data)
      doublePieOption.option.title.text = title
      doublePieOption.option.series = [doublePieOption.seriesOption_1, doublePieOption.seriesOption_2]
      console.log(doublePieOption.option)
      chart.setOption(doublePieOption.option)
      chart.hideLoading()
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
            console.log(res)
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
        action: 'connectDBAndQueryOrg',
        arg: JSON.stringify({
          type: 'company',
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
  .left-column-enterprise {
    width: 50%;
    height: 100%;
    float: left;
  }
  .right-column-enterprise {
    width: 50%;
    height: 100%;
    float: left;
  }
  .row-enterprise {
    width: 100%;
    float: left;
  }
  .beijing-container {
    position: relative;
  }
</style>
