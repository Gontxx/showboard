<template>
  <div class="main-column">
    <div class='row-enterprise'>
      <div class="left-column-enterprise">
        <div id = "type-pie" class="chart-container"></div>
        <div id = "word-cloud" class="chart-container"></div>
      </div>
      <div class="right-column-enterprise">
        <div id="box-plot-repost" class="chart-container has-background"></div>
        <div id="box-plot-comment" class="chart-container has-background"></div>
        <div id="box-plot-attitude" class="chart-container has-background"></div>
      </div>
    </div>
    <div class='row-enterprise'>
      <div id = "count-bar" class="chart-container"></div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import 'echarts/lib/chart/pie'
import 'echarts-wordcloud'
import pieOption from './pieOption'
import defaultData from './defaultData'
import typeWordCloudOption from './typeWordCloudOption'
import plotOrderOption from './plotOption'

export default {
  name: 'Weibo',
  data () {
    return {
      tmpData: defaultData,
      typePieContainer: null,
      typePieChart: null,
      wordCloudContainer: null,
      wordCloudChart: null,
      countBarContainer: null,
      countBarChart: null,
      repostBoxContainer: null,
      repostBoxChart: null,
      commentBoxContainer: null,
      commentBoxChart: null,
      attitudeBoxContainer: null,
      attitudeBoxChart: null,
      pieType: '财经'
    }
  },
  watch: {
    pieType () {
      console.log('pie type change')
      this.setCharts(this.tmpData)
      // this.setWordCloudOption(this.countBarChart, data.JiankangData, '疑似健康类谣言微博热点词')
    }
  },
  methods:
  {
    initCharts () {
      this.typePieContainer = document.getElementById('type-pie')
      this.typePieChart = echarts.init(this.typePieContainer)
      this.wordCloudContainer = document.getElementById('word-cloud')
      this.wordCloudChart = echarts.init(this.wordCloudContainer)
      this.countBarContainer = document.getElementById('count-bar')
      this.countBarChart = echarts.init(this.countBarContainer)
      this.repostBoxContainer = document.getElementById('box-plot-repost')
      this.repostBoxChart = echarts.init(this.repostBoxContainer)
      this.commentBoxContainer = document.getElementById('box-plot-comment')
      this.commentBoxChart = echarts.init(this.commentBoxContainer)
      this.attitudeBoxContainer = document.getElementById('box-plot-attitude')
      this.attitudeBoxChart = echarts.init(this.attitudeBoxContainer)
      this.resizeChart()

      let that = this
      this.typePieChart.on('click', function (params) {
        that.pieType = params.name
      })
    },

    resizeChart () {
      let ww = window.innerWidth
      let hh = window.innerHeight
      this.resizeContainer(this.typePieContainer, (ww * 0.45), (hh * 0.49))
      this.typePieChart.resize()
      this.resizeContainer(this.wordCloudContainer, (ww * 0.45), (hh * 0.49))
      this.wordCloudChart.resize()
      this.resizeContainer(this.repostBoxContainer, (ww * 0.45), (hh * 0.32))
      this.repostBoxChart.resize()
      this.resizeContainer(this.commentBoxContainer, (ww * 0.45), (hh * 0.32))
      this.commentBoxChart.resize()
      this.resizeContainer(this.attitudeBoxContainer, (ww * 0.45), (hh * 0.32))
      this.attitudeBoxChart.resize()
    },

    resizeContainer (container, width, height) {
      container.style.width = width + 'px'
      container.style.height = height + 'px'
    },

    setCharts (data) {
      console.log('setCharts', data)
      this.setTypePieOption(this.typePieChart, data.typeData, '疑似谣言微博类型分布')
      this.setWordCloudOption(this.wordCloudChart, data.wordCloudData[this.pieType], '疑似' + this.pieType + '类谣言微博热点词')
      this.setBoxPlotRateOrderOption(this.repostBoxChart, data.reposts, data.domainData, '转发')
      this.setBoxPlotRateOrderOption(this.commentBoxChart, data.comments, data.domainData, '评论')
      this.setBoxPlotRateOrderOption(this.attitudeBoxChart, data.attitudes, data.domainData, '点赞')
    },

    setTypePieOption (chart, data, title) {
      pieOption.seriesOption.name = title
      pieOption.seriesOption.data = data
      pieOption.option.title.text = title
      pieOption.option.series = [pieOption.seriesOption]
      chart.setOption(pieOption.option)
    },

    setWordCloudOption (chart, data, title) {
      typeWordCloudOption.seriesOption.name = title
      typeWordCloudOption.seriesOption.data = data
      // nounWordCloudOption.seriesOption.maskImage = this.image1
      typeWordCloudOption.option.title.text = title
      typeWordCloudOption.option.series = [typeWordCloudOption.seriesOption]
      chart.setOption(typeWordCloudOption.option)
    },

    // setCountBarOption (chart, data, title) {
    //   barOption.option.title.text = title
    //   var namedata = []
    //   var bardata = []
    //   data.forEach(function (value, index, array) {
    //     namedata.push(value.name)
    //     bardata.push(value.value)
    //   })
    //   barOption.xAxisOption.data = namedata
    //   barOption.option.yAxis.name = '平均' + this.barType + '数量'
    //   barOption.seriesOption.data = bardata
    //   barOption.option.xAxis = barOption.xAxisOption
    //   barOption.option.series = [barOption.seriesOption]
    //   this.countBarChart.setOption(barOption.option)
    // }

    setBoxPlotRateOrderOption (chart, orderdata, namedata, type) {
      let data = echarts.dataTool.prepareBoxplotData(orderdata)
      plotOrderOption.option.title.text = '疑似谣言微博' + type + '数量分布'
      plotOrderOption.xAxisOption.data = namedata
      plotOrderOption.seriesOption.data = data.boxData
      plotOrderOption.option.xAxis = plotOrderOption.xAxisOption
      plotOrderOption.option.series = [plotOrderOption.seriesOption]
      chart.setOption(plotOrderOption.option)
    }
  },
  mounted () {
    this.initCharts()
    this.setCharts(this.tmpData)
    let that = this
    window.onresize = function () {
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
</style>
