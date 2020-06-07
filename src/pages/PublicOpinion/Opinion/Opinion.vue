<template>
  <div>
    <div class="main-column">
      <div class='row-enterprise'>
    <div class='left-column'>
      <div id='topics-graph' class='chart-container has-background align-right'></div>
      <div id='sentiment-graph' class='chart-container has-background align-right'></div>
    </div>
    <div class='right-column'>
      <div id='topic-radar' class='chart-container has-background align-left'></div>
      <div id='bottom-radar' class='chart-container has-background align-left'></div>
    </div>
  </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import 'echarts/lib/chart/graph'
import 'echarts/lib/chart/radar'
import graph1Option from './graph1Option'
import graph2Option from './graph2Option'
import radar1Option from './radar1Option'
import radar2Option from './radar2Option'
import defaultWeiboData from './defaultWeiboData'
import tools from './tools'

export default {
  name: 'Opinion',
  data () {
    return {
      topicsGraphContainer: null,
      topicsGraphChart: null,
      sentimentGraphContainer: null,
      sentimentGraphChart: null,
      topicRadarContainer: null,
      topicRadarChart: null,
      bottomRadarContainer: null,
      bottomRadarChart: null
    }
  },
  methods: {
    initCharts () {
      this.topicsGraphContainer = document.getElementById('topics-graph')
      this.topicsGraphChart = echarts.init(this.topicsGraphContainer)
      this.sentimentGraphContainer = document.getElementById('sentiment-graph')
      this.sentimentGraphChart = echarts.init(this.sentimentGraphContainer)

      this.topicRadarContainer = document.getElementById('topic-radar')
      this.topicRadarChart = echarts.init(this.topicRadarContainer)
      this.bottomRadarContainer = document.getElementById('bottom-radar')
      this.bottomRadarChart = echarts.init(this.bottomRadarContainer)

      this.resizeChart()
      this.showLoading()

      this.topicsGraphChart.setOption(graph1Option.option)
      this.topicsGraphChart.hideLoading()
      this.sentimentGraphChart.setOption(graph2Option.option)
      this.sentimentGraphChart.hideLoading()
      this.topicRadarChart.setOption(radar1Option.option)
      this.topicRadarChart.hideLoading()
      this.bottomRadarChart.setOption(radar2Option.option)
      this.bottomRadarChart.hideLoading()

      tools.autoShowTooltip(this.topicsGraphChart, 15, 0, 5000)
      tools.autoShowSeriesTooltip(this.topicRadarChart, 5, 0, 8000)
      tools.autoShowTooltip(this.sentimentGraphChart, 20, 0, 5000)
      tools.autoShowSeriesTooltip(this.bottomRadarChart, 5, 5, 8000)
    },
    resizeChart () {
      let ww = window.innerWidth
      let hh = window.innerHeight
      this.resizeContainer(this.topicsGraphContainer, (ww * 0.45), (hh * 0.48))
      this.topicsGraphChart.resize()
      this.resizeContainer(this.sentimentGraphContainer, (ww * 0.45), (hh * 0.48))
      this.sentimentGraphChart.resize()
      this.resizeContainer(this.topicRadarContainer, (ww * 0.45), (hh * 0.48))
      this.topicRadarChart.resize()
      this.resizeContainer(this.bottomRadarContainer, (ww * 0.45), (hh * 0.48))
      this.bottomRadarChart.resize()
    },
    showLoading () {
      this.topicsGraphChart.showLoading()
      this.sentimentGraphChart.showLoading()
      this.topicRadarChart.showLoading()
      this.bottomRadarChart.showLoading()
    },
    resizeContainer (container, width, height) {
      container.style.width = width + 'px'
      container.style.height = height + 'px'
    },
    setCharts (data) {
      console.log('setCharts', data)
      this.setBeijingMapOption(data.fig1)
      this.setTypePieOption(data.fig2, data.district + '外卖标签分类')
      this.setStoreBarOption(data.fig3.nameData, data.fig3.lineData, data.district + '单门店成交额前15名')
      this.setBeijingScatterOption(data.fig1)
      // this.autoTip()
    },
    getData () {
      // console.log('district', district)
      this.showLoading()
      let that = this
      // 2020-05-29 15:04:48 合约可能出问题了，注释传入自定义数据进行调试
      // window.executeCurrentContract('connectDBAndQuery', JSON.stringify({
      //   type: 'takeout',
      //   detail: 'overall',
      //   district: district
      // }), function (data) {
      //   let result = JSON.parse(data.result)
      //   that.setCharts(result)
      // })
      let data = JSON.stringify({
        'fig1': defaultWeiboData.beijingData,
        'fig2': defaultWeiboData.typePieData,
        'fig3': {'nameData': defaultWeiboData, 'lineData': defaultWeiboData.lineData},
        'district': ''
      })
      let result = JSON.parse(data)
      that.setCharts(result)
    }
  },
  mounted () {
    this.initCharts()
    // this.getData()
    let that = this
    window.onresize = function () {
      // 重置容器高宽
      that.resizeChart()
    }
  }
}
</script>

<style scoped>
  .left-column {
    /*width: calc(50% - 80px);*/
    width: 50%;
    height: 100vh;
    position: relative;
    float: left;
  }

  .right-column {
    width: 50%;
    height: 100vh;
    position: relative;
    float: left;
  }

  .chart-container {
    /*margin: 8px;*/
    padding: 8px;
  }

  .has-background {
    background-color: rgba(255, 255, 255, 0.15);
    border-radius: 8px;
  }

  .align-right {
    margin: 1%;
    float: right;
  }

  .align-left {
    margin: 1%;
    float: left;
  }
  .row-enterprise {
    width: 100%;
    float: left;
  }
  .main-column {
    width: calc(100% - 80px);
    height: 100vh;
    overflow: scroll;
  }
</style>
