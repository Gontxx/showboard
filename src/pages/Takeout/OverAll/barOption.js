export default {
  option: {
    'title': {
      'text': '单门店成交额前15名',
      x: 'center',
      y: '0%',
      textStyle: {
        color: '#fff',
        fontSize: '16'
      },

    },
    'tooltip': {
      trigger: 'item',
      'axisPointer': {
        'type': 'shadow',
        textStyle: {
          color: '#fff'
        },

      },
    },
    'grid': {
      'borderWidth': 0,
      'top': '10%',
      'bottom': '9%',
      'right':'28%',
      textStyle: {
        color: '#fff'
      }
    },
    'calculable': true,
    'xAxis': [{
      'type': 'value',
      'splitNumber':3,
      'splitLine': {
        'show': false
      },
      inverse:true,

      'axisLine': {
        lineStyle: {
          color: '#90979c'
        }
      },
      'axisTick': {
        'show': false
      },
      'axisLabel': {
        'interval': 0,

      },
      'splitArea': {
        'show': false
      },
      'min': 0
      // 'min': function(value) {
      //   return value.min >= 100000 ? value.min - 100000 : 0;
      // }
    }],
  },
  yAxisOption: {
    'type': 'category',
    'position': 'right',
    'axisLine': {
      lineStyle: {
        color: '#90979c'
      }
    },
    'splitLine': {
      'show': false
    },
    'axisTick': {
      'show': false
    },
    'splitArea': {
      'show': false
    },
    'axisLabel': {
      'interval': 0,
    },
  },
  seriesOption_1: {
    'name': '成交额',
    'type': 'bar',
    label:{
      'normal': {
        'position': 'left',
      },

    },
    itemStyle: {
      normal: {
        color: function(params) {
          // build a color map as your need.
          var colorList = [{
            colorStops: [{
              offset: 0,
              color: '#FFD119' // 0% 处的颜色
            }, {
              offset: 1,
              color: '#FFAC4C' // 100% 处的颜色
            }]
          },
            {
              colorStops: [{
                offset: 0,
                color: '#00C0FA' // 0% 处的颜色
              }, {
                offset: 1,
                color: '#2F95FA' // 100% 处的颜色
              }]
            }
          ];
          if (params.dataIndex >= 10) {
            return colorList[0]
          } else {
            return colorList[1]
          }
        },
        barBorderRadius: 15
      }
    },
  },
  seriesOption_2: {
    'name': '成交额',
    'type': 'line',
    symbolSize: 8,
    symbol:'circle',
    'itemStyle': {
      'normal': {
        'color': 'rgba(252,230,48,1)',
        'barBorderRadius': 0,
        'label': {
          'show': true,
          'position': 'left',
          formatter: function(p) {
            return p.value > 0 ? (p.value) : '';
          }
        }
      },
    },
  },
}
