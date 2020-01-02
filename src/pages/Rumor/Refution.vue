<template>
  <div class="main-column">
    <div class='row-enterprise'>
      <div class="left-column-enterprise">
          <div id = "type-pie" class="chart-container has-background"></div>
        <div id = "word-cloud-place" class="chart-container has-background"></div>

      </div>
      <div class="right-column-enterprise">
          <div id = "word-cloud-noun" class="chart-container has-background"></div>
          <div id = "word-cloud-verb" class="chart-container has-background"></div>
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
// import imageTest from './laba.png'

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
      wordCloudVerbChart: null
      // image1: imageTest
    }
  },
  methods:
  {
    initCharts () {
      this.typePieContainer = document.getElementById('type-pie')
      this.typePieChart = echarts.init(this.typePieContainer)
      this.wordCloudNounContainer = document.getElementById('word-cloud-noun')
      this.wordCloudNounChart = echarts.init(this.wordCloudNounContainer)
      this.wordCloudPlaceContainer = document.getElementById('word-cloud-place')
      this.wordCloudPlaceChart = echarts.init(this.wordCloudPlaceContainer)
      this.wordCloudVerbContainer = document.getElementById('word-cloud-verb')
      this.wordCloudVerbChart = echarts.init(this.wordCloudVerbContainer)
      this.resizeChart()
    },

    resizeChart () {
      let ww = window.innerWidth
      let hh = window.innerHeight
      this.resizeContainer(this.typePieContainer, (ww * 0.45), (hh * 0.49))
      this.typePieChart.resize()
      this.resizeContainer(this.wordCloudNounContainer, (ww * 0.45), (hh * 0.49))
      this.wordCloudNounChart.resize()
      this.resizeContainer(this.wordCloudPlaceContainer, (ww * 0.45), (hh * 0.49))
      this.wordCloudPlaceChart.resize()
      this.resizeContainer(this.wordCloudVerbContainer, (ww * 0.45), (hh * 0.49))
      this.wordCloudVerbChart.resize()
    },

    resizeContainer (container, width, height) {
      container.style.width = width + 'px'
      container.style.height = height + 'px'
    },

    setCharts (data) {
      console.log('setCharts', data)
      this.setTypePieOption(this.typePieChart, data.typeData, '辟谣消息类型分布')
      this.setNounWordCloudOption(this.wordCloudNounChart, data.nounData, '辟谣消息热点名词')
      this.setPlaceWordCloudOption(this.wordCloudPlaceChart, data.placeData, '辟谣消息热点地区')
      this.setVerbWordCloudOption(this.wordCloudVerbChart, data.verbData, '辟谣消息热点行为')
    },

    setTypePieOption (chart, data, title) {
      pieOption.seriesOption.name = title
      pieOption.seriesOption.data = data
      pieOption.option.title.text = title
      pieOption.option.series = [pieOption.seriesOption]
      chart.setOption(pieOption.option)
    },

    setNounWordCloudOption (chart, data, title) {
      nounWordCloudOption.seriesOption.name = title
      nounWordCloudOption.seriesOption.data = data
      // nounWordCloudOption.seriesOption.maskImage = this.image1
      nounWordCloudOption.option.title.text = title
      nounWordCloudOption.option.series = [nounWordCloudOption.seriesOption]
      chart.setOption(nounWordCloudOption.option)
    },

    setPlaceWordCloudOption (chart, data, title) {
      nounWordCloudOption.seriesOption.name = title
      nounWordCloudOption.seriesOption.data = data
      nounWordCloudOption.option.title.text = title
      nounWordCloudOption.option.series = [nounWordCloudOption.seriesOption]
      chart.setOption(nounWordCloudOption.option)
    },

    setVerbWordCloudOption (chart, data, title) {
      nounWordCloudOption.seriesOption.name = title
      nounWordCloudOption.seriesOption.data = data
      nounWordCloudOption.option.title.text = title
      nounWordCloudOption.option.series = [nounWordCloudOption.seriesOption]
      chart.setOption(nounWordCloudOption.option)
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
