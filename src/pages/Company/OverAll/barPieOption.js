
export default {
  option: {
    legend: {},
    tooltip: {
      trigger: 'axis',
      showContent: false
    },
    xAxis: {type: 'category'},
    yAxis: {gridIndex: 0},
    grid: {top: '55%'},
    // series: [
    //   {name: '国有企业', type: 'bar'},
    //   {name: '集体所有制企业', type: 'bar'},
    //   {name: '私营企业', type: 'bar'},
    //   {name: '个人独资企业', type: 'bar'},
    //   {name: '外商投资企业', type: 'bar'},
    //   {name: '港澳台', type: 'bar'},
    //   {name: '联营企业', type: 'bar'},
    //   {
    //     type: 'pie',
    //     id: 'pie',
    //     radius: '30%',
    //     center: ['50%', '25%'],
    //     label: {
    //       formatter: '{b}: {@2012} ({d}%)'
    //     },
    //     encode: {
    //       itemName: 'product',
    //       value: '2012',
    //       tooltip: '2012'
    //     }
    //   }
    // ]
    barOption: {
      data: [],
      id: 'mBar',
      type:"bar",
      itemStyle: {
        normal: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: '#00d386' // 0% 处的颜色
            }, {
              offset: 1,
              color: '#0076fc' // 100% 处的颜色
            }],
            globalCoord: false // 缺省为 false
          },
          barBorderRadius: 15,
        }
      },
    },
    pieOption: {
      id: 'mPie',
      name: '行业分类',
      type: 'pie',
      color: ['#deb140', '#49dff0', '#034079', '#6f81da', '#00ffb4',],
      startAngle: 200,
      selectedMode: 'single',
      center: ['50%', '55%'],
      radius: ['0%', '70%'],
      avoidLabelOverlap: false
    },
  }
}
