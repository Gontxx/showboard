export default {
  option: {
    title: {
      text: '商圈/景点消费分布散点图',
      x: 'center',
      y:'0%',
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
      '#ff3333', 'orange', 'yellow','lime','aqua'
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
        return params.value[3]+'<br/>数量：'+params.value[1]
          +'<br/>消费人数：'+params.value[0]
          +'<br/>消费额：'+params.value[2]+'元';
      }
    },
    grid: {
      top:"10%",
      left: '0%',
      right: '9.5%',
      bottom: '5%',
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
      name :'数量',
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
      name :'消费人数',
    },
  },
  seriesOption: {
    type: 'scatter',
    label: {
      normal: {
        show: false,
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
