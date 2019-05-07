export default {
  option: {
    title: {
      //top:20,
      text: '北京市外卖热度地图',
      x: 'center',
      y: '3%',
      textStyle: {
        color: '#fff',
        fontSize: '22'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: function (params) {
        if (params.seriesType === 'map')
          return params.data.name+'<br/>外卖商家数：'+params.data.value[0]
            +'<br/>A级商家数：'+params.data.value[1]
            +'<br/>B级商家数：'+params.data.value[2]
            +'<br/>C级商家数：'+params.data.value[3];

      }
    },
    visualMap: {
      show: true,
      max: 1200,
      right: '10%',
      bottom: '3%',
      text: ['商家数', ''], // 文本，默认为数值文
      textStyle:{
        color:'#fff',
        fontSize: '15'
      },
      calculable: true,
      seriesIndex: [1],
      inRange: {
        color: ['#00467F', '#A5CC82']//['#e0ffff', '#006edd']
      },
    },
  },
  geoOption: {
    show: true,
    map: 'beijing',
    label: {
      normal: {
        show: false
      },
      emphasis: {
        show: false,
      }
    },
    roam: true,
    itemStyle: {
      normal: {
        areaColor: 'transparent',
        borderColor: '#3fdaff',
        borderWidth: 2,
        shadowColor: 'rgba(63, 218, 255, 0.5)',
        shadowBlur: 30
      },
      emphasis: {
        areaColor: '#2B91B7',
      }
    },
  },
  seriesOption_1: {
    name: 'light',
    type: 'scatter',
    coordinateSystem: 'geo',
    symbolSize: function (val) {
      return Math.sqrt(val[0]) * 1.2;//val[2] / 50;
    },
    label: {
      normal: {
        formatter: '{b}',
        position: 'right',
        show: true,
        textBorderColor:'#CD8500',
        textBorderWidth:1,
      },
      emphasis: {
        show: true
      }
    },
    itemStyle: {
      normal: {
        color: '#F4E925'
      }
    }
  },
  seriesOption_2: {
    type: 'map',
    map: 'beijing',
    geoIndex: 0,
    aspectScale: 0.75, //长宽比
    showLegendSymbol: false, // 存在legend时显示
    label: {
      normal: {
        show: false
      },
      emphasis: {
        show: false,
        textStyle: {
          color: '#fff'
        }
      }
    },
    roam: true,
    itemStyle: {
      normal: {
        areaColor: '#031525',
        borderColor: '#FFFFFF',
      },
      emphasis: {
        areaColor: '#2B91B7'
      }
    },
    animation: false,
  },
  seriesOption_3: {
    name: 'Top 5',
    type: 'effectScatter',
    coordinateSystem: 'geo',
    symbolSize: function (val) {
      return Math.sqrt(val[0]) * 1.2;//val[2] / 50;
    },
    showEffectOn: 'render',
    rippleEffect: {
      brushType: 'stroke'
    },
    hoverAnimation: true,
    label: {
      normal: {
        formatter: '{b}',
        position: 'right',
        textBorderColor:'#CD8500',
        textBorderWidth:1,
        show: true
      }
    },
    itemStyle: {
      normal: {
        color: '#F4E925',
        shadowBlur: 10,
        shadowColor: '#05C3F9'
      }
    },
    zlevel: 1
  }
}
