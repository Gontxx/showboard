export default {
  option: {
    'title': {
      'text': '米粉成交额前30名',
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
    'legend': {
      show:true,
      icon: 'circle',
      bottom: '50%',
      itemWidth: 12,
      itemHeight: 12,
      data: ['螺蛳粉','过桥米线','其他米粉','桂林米粉'],
      textStyle:{
        color: '#90979c'
      },
    },
    'grid': {
      'borderWidth': 0,
      'top': '15%',
      'bottom': '2%',
      'right':'3%',
      textStyle: {
        color: '#fff'
      }
    },
    'calculable': true,
    'yAxis': [{
      'name':'成交额（元）',
      'type': 'value',
      'splitNumber':3,
      'splitLine': {
        'show': false
      },
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
      'min': function(value) {
        return 0;
      }
    }],
  },
  xAxisOption: {
    'type': 'category',
    'position': 'right',
    'axisLabel':{
      'interval': 0,
      'show':false
    },
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
  },
  seriesOption_1: {
    'name': '螺蛳粉',
    'type': 'bar',
    'stack': '总量',
    label:{
      'normal': {
        'position': 'left',
      },
    },
    itemStyle: {
      normal: {
        color: '#deb140',
        barBorderRadius: 15
      }
    },
  },
  seriesOption_2: {
    'name': '桂林米粉',
    'type': 'bar',
    'stack': '总量',
    label:{
      'normal': {
        'position': 'left',
      },
    },
    itemStyle: {
      normal: {
        color: '#6f81da',
        barBorderRadius: 15
      }
    }
  },
  seriesOption_3: {
    'name': '过桥米线',
    'type': 'bar',
    'stack': '总量',
    label:{
      'normal': {
        'position': 'left',
      },
    },
    itemStyle: {
      normal: {
        color: '#49dff0',
        barBorderRadius: 15
      }
    },
  },
  seriesOption_4: {
    'name': '其他米粉',
    'type': 'bar',
    'stack': '总量',
    label:{
      'normal': {
        'position': 'left',
      },
    },
    itemStyle: {
      normal: {
        color: '#034079',
        barBorderRadius: 15
      }
    },
  }
}
