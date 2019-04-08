export default {
  option: {
    title: {
      text: '北京市在售二手房热度地图',
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
        if (params.seriesType === 'map') {
          if (params.data.mapType === 'num') {
            return params.data.name + '：' + params.data.value
          } else {
            return params.data.name + '：' + params.data.value + '元'
          }
        }
      }
    },
    visualMap: {
      show: true,
      min: 0,
      //max: 10000,
      right: '10%',
      bottom: '3%',
      text: ['', ''], // 文本，默认为数值文
      textStyle: {
        color: '#fff',
        fontSize: '12'
      },
      calculable: true,
      seriesIndex: [1],
      inRange: {
        color: ['#e0ffff', '#006edd']
      }
    }
  },
  geoOption: {
    show: true,
    map: 'beijing',
    label: {
      normal: {
        show: false
      },
      emphasis: {
        show: false
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
        areaColor: '#2B91B7'
      }
    }
  },
  seriesOption_1: {
    name: 'light',
    type: 'scatter',
    coordinateSystem: 'geo',
    symbolSize: function (val) {
      return Math.sqrt(val[2]) / 3
    },
    label: {
      normal: {
        formatter: '{b}',
        position: 'right',
        show: true,
        textBorderColor: '#CD8500',
        textBorderWidth: 1
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
    aspectScale: 0.75, // 长宽比
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
    animation: false
  },
  seriesOption_3: {
    name: 'Top 5',
    type: 'effectScatter',
    coordinateSystem: 'geo',
    symbolSize: function (val) {
      return Math.sqrt(val[2]) / 3
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
        textBorderColor: '#CD8500',
        textBorderWidth: 1,
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
