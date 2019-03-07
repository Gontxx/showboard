export default {
  option: {
    title : {
      text: '成交额',
      x: 'center',
      y:'0%',
      textStyle: {
        color: '#fff',
        fontSize: 16,
      },
    },
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b}: {c}元 ({d}%)"
    },
  },
  seriesOption: {
    name:'成交额',
    type:'pie',
    color: [ '#deb140', '#49dff0', '#034079', '#6f81da', '#00ffb4',],
    startAngle: 200,
    selectedMode: 'single',
    center:['50%','55%'],
    radius: [0, '80%'],
    label: {
      normal: {
        show:true,
        position: 'inner',
        formatter: '{b}'//\n{d}%'
      }
    },
    labelLine: {
      normal: {
        show: false,
        length:0.5,
      }
    },
  }
}
