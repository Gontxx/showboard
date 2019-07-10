export default {
  option: {
    title : {
      text: '企业数',
      x: 'center',
      y:'0%',
      textStyle: {
        color: '#fff',
        fontSize: 16,
      }
    }
  ,
  tooltip: {
    trigger: 'item',
    // formatter: "{a} <br/>{b}: {d}%"
    formatter: function (params) {
      return params.name + ':  ' + params.value[1] + '(' + params.percent + '%)'
    }
  }
  },
  seriesOption_1: {
    name:'企业数',
    type:'pie',
    selectedMode: 'single',
    center:['50%','55%'],
    radius: [0, '50%'],
    color: ['#4181ff','#afffd3','#4ab0cc','#55e8a9','#56afd8','#1a8fc5', '#96dcc3', '#5ac59e', '#439476', '#346654'],
    label: {
      normal: {
        show: true,
        position: 'inner',
        formatter: '{b}'
      }
    },
    encode: {
      // tooltip: ['sum', 'percent'],
      tooltip: ['sum', 'percent'],
      value: 'sum',
      itemName: 'district'
    },
    labelLine: {
      normal: {
        show: true
      }
    },
    datasetIndex: 1
  },
  seriesOption_2: {
    name:'企业数',
    type:'pie',
    radius: ['60%', '75%'],
    center:['50%','55%'],
    //center:['300','330'],
    color: ['#4181ff','#afffd3','#4ab0cc','#55e8a9','#56afd8','#1a8fc5'],
    label: {
      normal: {
        show:true,
        formatter: '{b}'
      }
    },
    encode: {
      tooltip: 4,
      value: 4,
      itemName: 0
    },
    seriesLayoutBy:'row',
    datasetIndex: 0
  }
}
