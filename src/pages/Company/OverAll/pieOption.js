export default {
  option: {
    title: {
      text: '行业分类',
      x: 'center',
      y: '0%',
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
  seriesOption: {
    name: '行业分类',
    type: 'pie',
    color: ['#deb140', '#49dff0', '#034079', '#6f81da', '#00ffb4',],
    startAngle: 200,
    selectedMode: 'single',
    center: ['50%', '55%'],
    radius: ['0%', '70%'],
    avoidLabelOverlap: false
  },
  itemStyle: {
    normal: {
      label: true
    }
  }
}
