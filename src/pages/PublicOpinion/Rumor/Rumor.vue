<template>
  <div class="main-column">
    <div class='row-enterprise'>
      <div class="left-column-enterprise">
          <div id = "type-pie-refute" class="chart-container"></div>
        <div id = "word-cloud-place" class="chart-container"></div>

      </div>
      <div class="left-column-enterprise">
        <div id = "type-pie-weibo" class="chart-container"></div>
        <div id = "word-cloud" class="chart-container"></div>
        <hash-result :hash="hashResult"></hash-result>
      </div>
        <div class="right-column-enterprise">
          <div id="box-plot-repost" class="chart-container has-background"></div>
          <div id="box-plot-comment" class="chart-container has-background"></div>
          <div id="box-plot-attitude" class="chart-container has-background"></div>
        </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import 'echarts/lib/chart/pie'
import 'echarts-wordcloud'
import pieOption from './pieOption'
import defaultData from './defaultData'
import nounWordCloudOption from './nounWordCloudOption'
import typeWordCloudOption from './typeWordCloudOption'
import plotOrderOption from './plotOption'
import hashResult from '@/components/hashResult'

export default {
  name: 'PiYao',
  data () {
    return {
      tmpData: defaultData,
      typePieContainer: null,
      typePieChart: null,
      wordCloudNounContainer: null,
      wordCloudNounChart: null,
      wordCloudPlaceContainer: null,
      wordCloudPlaceChart: null,
      wordCloudVerbContainer: null,
      wordCloudVerbChart: null,
      typePieContainer1: null,
      typePieChart1: null,
      wordCloudContainer: null,
      wordCloudChart: null,
      repostBoxContainer: null,
      repostBoxChart: null,
      commentBoxContainer: null,
      commentBoxChart: null,
      attitudeBoxContainer: null,
      attitudeBoxChart: null,
      pieType: '财经',
      hashResult: ''
    }
  },
  components: {
    hashResult
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
      this.typePieContainer = document.getElementById('type-pie-refute')
      this.typePieChart = echarts.init(this.typePieContainer)
      this.wordCloudPlaceContainer = document.getElementById('word-cloud-place')
      this.wordCloudPlaceChart = echarts.init(this.wordCloudPlaceContainer)
      this.typePieContainer1 = document.getElementById('type-pie-weibo')
      this.typePieChart1 = echarts.init(this.typePieContainer1)
      this.wordCloudContainer = document.getElementById('word-cloud')
      this.wordCloudChart = echarts.init(this.wordCloudContainer)
      this.repostBoxContainer = document.getElementById('box-plot-repost')
      this.repostBoxChart = echarts.init(this.repostBoxContainer)
      this.commentBoxContainer = document.getElementById('box-plot-comment')
      this.commentBoxChart = echarts.init(this.commentBoxContainer)
      this.attitudeBoxContainer = document.getElementById('box-plot-attitude')
      this.attitudeBoxChart = echarts.init(this.attitudeBoxContainer)
      this.resizeChart()

      let that = this
      this.typePieChart1.on('click', function (params) {
        that.pieType = params.name
      })
    },

    resizeChart () {
      let ww = window.innerWidth
      let hh = window.innerHeight
      this.resizeContainer(this.typePieContainer, (ww * 0.3 - 12), (hh * 0.5 - 12))
      this.typePieChart.resize()
      this.resizeContainer(this.wordCloudPlaceContainer, (ww * 0.3 - 12), (hh * 0.5 - 12))
      this.wordCloudPlaceChart.resize()
      this.resizeContainer(this.typePieContainer1, (ww * 0.3 - 12), (hh * 0.5 - 12))
      this.typePieChart1.resize()
      this.resizeContainer(this.wordCloudContainer, (ww * 0.3 - 12), (hh * 0.5 - 12))
      this.wordCloudChart.resize()
      this.resizeContainer(this.repostBoxContainer, (ww * 0.38 - 12), (hh * 0.33 - 12))
      this.repostBoxChart.resize()
      this.resizeContainer(this.commentBoxContainer, (ww * 0.38 - 12), (hh * 0.33 - 12))
      this.commentBoxChart.resize()
      this.resizeContainer(this.attitudeBoxContainer, (ww * 0.38 - 12), (hh * 0.33 - 12))
      this.attitudeBoxChart.resize()
    },

    resizeContainer (container, width, height) {
      container.style.width = width + 'px'
      container.style.height = height + 'px'
    },

    setCharts (data) {
      console.log('setCharts', data)
      this.setTypePieOption(this.typePieChart, data.typeData, '辟谣消息类型分布')
      // this.setNounWordCloudOption(this.wordCloudNounChart, data.nounData, '辟谣消息热点名词')
      this.setPlaceWordCloudOption(this.wordCloudPlaceChart, data.placeData, '辟谣消息热点地区')
      // this.setVerbWordCloudOption(this.wordCloudVerbChart, data.verbData, '辟谣消息热点行为')
      this.setTypePieOption(this.typePieChart1, data.typeData1, '疑似谣言微博类型分布')
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

    // setNounWordCloudOption (chart, data, title) {
    //   nounWordCloudOption.seriesOption.name = title
    //   nounWordCloudOption.seriesOption.data = data
    //   // nounWordCloudOption.seriesOption.maskImage = this.image1
    //   nounWordCloudOption.option.title.text = title
    //   nounWordCloudOption.option.series = [nounWordCloudOption.seriesOption]
    //   chart.setOption(nounWordCloudOption.option)
    //   chart.hideLoading()
    // },

    setPlaceWordCloudOption (chart, data, title) {
      nounWordCloudOption.seriesOption.name = title
      nounWordCloudOption.seriesOption.data = data
      nounWordCloudOption.option.title.text = title
      nounWordCloudOption.option.series = [nounWordCloudOption.seriesOption]
      chart.setOption(nounWordCloudOption.option)
    },

    // setVerbWordCloudOption (chart, data, title) {
    //   nounWordCloudOption.seriesOption.name = title
    //   nounWordCloudOption.seriesOption.data = data
    //   nounWordCloudOption.option.title.text = title
    //   nounWordCloudOption.option.series = [nounWordCloudOption.seriesOption]
    //   chart.setOption(nounWordCloudOption.option)
    // }
    setBoxPlotRateOrderOption (chart, orderdata, namedata, type) {
      let data = echarts.dataTool.prepareBoxplotData(orderdata)
      plotOrderOption.option.title.text = '疑似谣言微博' + type + '数量分布'
      plotOrderOption.xAxisOption.data = namedata
      plotOrderOption.seriesOption.data = data.boxData
      plotOrderOption.option.xAxis = plotOrderOption.xAxisOption
      plotOrderOption.option.series = [plotOrderOption.seriesOption]
      chart.setOption(plotOrderOption.option)
      // chart.hideLoading()
    },
    setWordCloudOption (chart, data, title) {
      typeWordCloudOption.seriesOption.name = title
      typeWordCloudOption.seriesOption.data = data
      typeWordCloudOption.option.title.text = title
      typeWordCloudOption.option.series = [typeWordCloudOption.seriesOption]
      chart.setOption(typeWordCloudOption.option)
      chart.hideLoading()
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
    width: 30%;
    height: 100%;
    float: left;
  }
  .right-column-enterprise {
    width: 40%;
    height: 100%;
    float: left;
  }
  .row-enterprise {
    width: 100%;
    float: left;
  }
</style>
