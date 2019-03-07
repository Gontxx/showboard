<template>
  <div>
    <div class="left-column-hotel">
      <div id="hotel-bar-price" class="chart-container has-background"></div>
      <div id="hotel-bar-num" class="chart-container has-background"></div>
    </div>
    <div class="right-column-hotel">
      <div id="hotel-scatter" class="chart-container has-background"></div>
      <div class="chart-container has-background chart-img">
        <p style="font-size: 16px; text-align: center; width: 100%; color: #ffffff;">酒店标签云</p>
        <img src="/static/cloud_hotel.png" alt="" style="width: 100%; height: 90%;" />
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/scatter'
import { deepCopy } from '@/assets/util'
import defaultData from './defaultData'
import barOption from './barOption'
import scatterOption from './scatterOption'

export default {
  name: 'Hotel',
  data () {
    return {
      hotelBarNumContainer: null,
      hotelBarNumChart: null,
      hotelBarPriceContainer: null,
      hotelBarPriceChart: null,
      hotelScatterContainer: null,
      hotelScatterChart: null
    }
  },
  mounted () {
    this.initCharts()
    let that = this
    window.onresize = function () {
      // 重置容器高宽
      that.resizehotelBarContainer(that.hotelBarNumContainer)
      that.hotelBarNumChart.resize()
      that.resizehotelBarContainer(that.hotelBarPriceContainer)
      that.hotelBarPriceChart.resize()
      that.resizehotelScatterContainer()
      that.hotelScatterChart.resize()
    }
  },
  methods: {
    initCharts () {
      this.hotelBarNumContainer = document.getElementById('hotel-bar-num')
      this.resizehotelBarContainer(this.hotelBarNumContainer)
      this.hotelBarNumChart = echarts.init(this.hotelBarNumContainer)
      this.setBarOption(this.hotelBarNumChart, '商圈/景区覆盖', defaultData.numXData, defaultData.numYData)

      this.hotelBarPriceContainer = document.getElementById('hotel-bar-price')
      this.resizehotelBarContainer(this.hotelBarPriceContainer)
      this.hotelBarPriceChart = echarts.init(this.hotelBarPriceContainer)
      this.setBarOption(this.hotelBarPriceChart, '商圈/景区平均价格', defaultData.priceXData, defaultData.priceYData)

      this.hotelScatterContainer = document.getElementById('hotel-scatter')
      this.resizehotelScatterContainer()
      this.hotelScatterChart = echarts.init(this.hotelScatterContainer)
      this.setBeijingScatterOption(defaultData.hotelData)
    },
    resizehotelBarContainer (container) {
      container.style.width = (window.innerWidth * 0.5 - 40 - 12) + 'px'
      container.style.height = (window.innerHeight * 0.5 - 12) + 'px'
    },
    setBarOption (chart, title, nameData, lineData) {
      barOption.option.title.text = title
      barOption.xAxisOption.data = nameData
      barOption.seriesOption.data = lineData
      barOption.option.xAxis = barOption.xAxisOption
      barOption.option.series = [barOption.seriesOption]
      chart.setOption(barOption.option)
    },
    resizehotelScatterContainer () {
      this.hotelScatterContainer.style.width = (window.innerWidth * 0.5 - 40 - 20) + 'px'
      this.hotelScatterContainer.style.height = (window.innerHeight * 0.5 - 12) + 'px'
    },
    setBeijingScatterOption (data) {
      scatterOption.option.series = data.map(item => {
        let option = deepCopy(scatterOption.seriesOption)
        option.name = item.name
        option.symbolSize = function (data) {
          return Math.sqrt(data[2]) / 500
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
      this.hotelScatterChart.setOption(scatterOption.option)
    }
  }
}
</script>

<style scoped>
</style>
