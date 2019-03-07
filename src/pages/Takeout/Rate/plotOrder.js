export default {
  option: {
    title: [
      {
        text: '商家订单数分布',
        left: 'center',
        x: 'center',
        y:'0%',
        textStyle: {
          color: '#fff',
          fontSize: 16,
        },
      },

    ],
    tooltip: {
      trigger: 'item',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '10%',
      right: '5%',
      bottom: '10%'
    },
    yAxis: {
      type: 'value',
      name: '订单数',
      nameTextStyle:{
        color: '#B2B2B2',
        fontSize: 12,
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: '#B2B2B2',
          fontSize: 12,
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#B2B2B2',
          width: 1,
          type: 'solid',
        },
      },
    },
  },
  xAxisOption: {
    type: 'category',
    boundaryGap: true,
    nameGap: 30,
    nameTextStyle:{
      color: '#B2B2B2',
      fontSize: 14,
    },
    axisLine:{
      show: true,
      color: '#fff',
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: '#B2B2B2',
        fontSize: 12,
      },
    },
    splitArea: {
      show: false
    },
    splitLine: {
      show: false
    }
  },
  seriesOption: {
    name: 'boxplot',
    type: 'boxplot',
    itemStyle:{
      normal:{
        borderColor: '#fff',
        color:'#8DB6CD',
      },
    },
    tooltip: {
      formatter: function (param) {
        return [
          '卫生评级 ' + param.name + ': ',
          'upper: ' + param.data[4],
          'Q3: ' + param.data[3],
          'median: ' + param.data[2],
          'Q1: ' + param.data[1],
          'lower: ' + param.data[0]
        ].join('<br/>')
      }
    }
  }
}
