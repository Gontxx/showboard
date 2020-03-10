export default
{
  option:
    {
      title:
        {
          text: '辟谣信息类型分布',
          x: 'center',
          y: '0%',
          textStyle:
            {
              color: '#fff',
              fontSize: 16
            }
        },
      tooltip:
        {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {d}%'
        }
    },
  seriesOption:
    {
      name: '辟谣分类',
      type: 'pie',
      color: ['#deb140', '#49dff0', '#e2ff47',
        '#6f81da', '#00ffb4', '#da83be'],
      startAngle: 200,
      selectedMode: 'single',
      center: ['50%', '55%'],
      radius: ['0%', '70%'],
      avoidLabelOverlap: true
    }
}
