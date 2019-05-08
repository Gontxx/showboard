export default {
  option: {
    title: {
      text: '各区外卖成交情况',
      x: 'center',
      y: '0%',
      textStyle: {
        color: '#fff',
        fontSize: '16'
      }
    },
    color: [
      '#0580F2',
      '#FAA732',
      '#E1575D',
      '#8B73CC',
      '#8CD123',
      '#4B53BA',
      '#429588',
      '#ff3333', 'orange', 'yellow', 'lime', 'aqua'
    ],
    tooltip: {
      trigger: "item",
      "axisLine": {
        lineStyle: {
          color: '#90979c'
        }
      },
      "axisPointer": {
        "type": "shadow",
        textStyle: {
          color: "#fff"
        },
      },
      formatter: function (params) {
        return params.value[3] + '<br/>外卖商家数：' + params.value[0]
          + '<br/>订单数：' + params.value[1]
          + '<br/>成交额：' + params.value[2] + '元';
      }
    },
    grid: {
      top:"18%",
      left: '0%',
      right: '8%',
      bottom: '12%',
      containLabel: true
    },
    xAxis: {
      "axisLine": {
        lineStyle: {
          color: '#90979c'
        }
      },
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      },
      name :'商家数',
    },
    yAxis: {
      "axisLine": {
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
      name :'订单数',
    },
  },
  legendOption: {
    icon: 'circle',
    bottom: '0%',
    itemWidth: 12,
    itemHeight: 12,
    textStyle:{
      color: '#90979c'
    },
  },
  seriesOption: {
    type: 'scatter',
    label: {
      normal: {
        show: true,
        position: 'top'
      },
      emphasis: {
        show: true,
        position: 'top'
      }
    },
    itemStyle: {
      normal: {
        shadowBlur: 10,
        shadowColor: 'rgba(120, 36, 50, 0.5)',
        shadowOffsetY: 5
      }
    }
  }
}
