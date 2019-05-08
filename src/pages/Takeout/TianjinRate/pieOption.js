export default {
  option: {
    title : {
      text: '店铺数',
      x: 'center',
      y:'0%',
      textStyle: {
        color: '#fff',
        fontSize: 16,
      },
    },
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b}: {c} ({d}%)"
    }
  },
  seriesOption_1: {
    name:'店铺数',
    type:'pie',
    selectedMode: 'single',
    center:['50%','55%'],
    radius: [0, '60%'],
    minAngle: 5,
    color: [ '#1c6d90','#09895a','#EE3B3B','#EEB422',],
    label: {
      normal: {
        show: true,
        position: 'outer',
        formatter: '{b}'
      }
    },
    labelLine: {
      normal: {
        show: false
      }
    },
  },
  seriesOption_2: {
    name:'店铺数',
    type:'pie',
    radius: ['60%', '80%'],
    center:['50%','55%'],
    //center:['300','330'],
    color: ['#FF8888','#FF3333','#CC0000','#9acfe8','#56afd8','#1a8fc5', '#96dcc3', '#5ac59e', '#439476', '#346654'],
    label: {
      normal: {
        show:false,
        formatter: '{b}'
      }
    },
  }
}
