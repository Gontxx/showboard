export default {
  option: {
    title: {
      text: '商家成交额分布',
      left: 'center',
      x: 'center',
      y:'0%',
      textStyle: {
        color: '#fff',
        fontSize: 16,
      },
    },
    tooltip: {
      trigger: 'item',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      //top:'11%',
      left: '11%',
      right: '5%',
      bottom: '10%'
    },
    yAxis: {
      type: 'value',
      name: '成交额（元）',
      nameTextStyle:{
        color: '#B2B2B2',
        fontSize: 12,
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: '#B2B2B2',
          fontSize: 9,
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
        bMoneyColor: '#fff',
        color:'#8B668B',
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
  },
}
