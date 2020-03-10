<template>
  <div class="main-column">
    <div class='row-enterprise'>
      <div class="left-column-enterprise">
        <div id = "type-pie" class="chart-container has-background"></div>
      </div>
      <div class="right-column-enterprise">
        <div id = "word-cloud" class="chart-container has-background"></div>
      </div>
    </div>
    <div class='row-enterprise'>
      <div class="btn-group switch-bar" role="group">
        <button type="button" class="btn btn-default" :class="{'active': barType ==='转发' }" @click="barType = '转发'">转发</button>
        <button type="button" class="btn btn-default" :class="{'active': barType ==='评论' }" @click="barType = '评论'">评论</button>
        <button type="button" class="btn btn-default" :class="{'active': barType ==='点赞' }" @click="barType = '点赞'">点赞</button>
      </div>
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
import barOption from './barOption'

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
      barType: '转发',
      pieType: '财经'
    }
  },
  watch: {
    barType () {
      console.log('bar type change')
      this.setCharts(this.tmpData)
    },
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
      this.resizeContainer(this.countBarContainer, (ww * 0.92), (hh * 0.45))
      this.countBarChart.resize()
    },

    resizeContainer (container, width, height) {
      container.style.width = width + 'px'
      container.style.height = height + 'px'
    },

    setCharts (data) {
      console.log('setCharts', data)
      this.setTypePieOption(this.typePieChart, data.typeData, '疑似谣言微博类型分布')
      this.setWordCloudOption(this.wordCloudChart, data.wordCloudData[this.pieType], '疑似' + this.pieType + '类谣言微博热点词')
      this.setCountBarOption(this.countBarChart, data.statData.map(item => {
        return {name: item.name, value: item.value[this.barType]}
      }), '疑似谣言微博平均' + this.barType + '数')
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

    setCountBarOption (chart, data, title) {
      barOption.option.title.text = title
      var namedata = []
      var bardata = []
      data.forEach(function (value, index, array) {
        namedata.push(value.name)
        bardata.push(value.value)
      })
      barOption.xAxisOption.data = namedata
      barOption.option.yAxis.name = '平均' + this.barType + '数量'
      barOption.seriesOption.data = bardata
      barOption.option.xAxis = barOption.xAxisOption
      barOption.option.series = [barOption.seriesOption]
      this.countBarChart.setOption(barOption.option)
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
  .switch-bar {
    position: absolute;
    left: calc(50% - 60px);
    bottom: 0;
  }
</style>
