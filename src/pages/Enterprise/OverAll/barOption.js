export default {
  option: {
    title: {
      text: '行业',
      x: 'center',
      y:'0%',
      textStyle: {
        color: '#fff',
        fontSize: '16'
      }
    },
    grid: {
      top:'15%',
      left: '8%',
      right: '8%',
      bottom: '0%',
      containLabel: true
    },
    yAxis: {
      'axisLine': {
        lineStyle: {
          color: '#90979c'
        }
      },
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      },
      scale: true,
      name:'企业数量'
    },
    'tooltip': {
      'trigger': 'item',
      'textStyle': {
        'fontSize': 12
      },
    },
  },
  xAxisOption: {
    axisTick: {
      show: false
    },
    splitLine: {
      show: false
    },
    splitArea: {
      show: false
    },
    axisLabel: {
        interval: 0,
        rotate: 20
    },
    axisLine: {
      lineStyle: {
        color: '#90979c'
      }
    }
  },
  seriesOption: {
    type:"bar",
    itemStyle: {
      normal: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0,
            color: '#00d386' // 0% 处的颜色
          }, {
            offset: 1,
            color: '#0076fc' // 100% 处的颜色
          }],
          globalCoord: false // 缺省为 false
        },
        barBorderRadius: 15,
      }
    },
  },
}
