export default
{
  option:
    {
      title:
        {
          text: '意思谣言微博类型分布',
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
      name: '内容分类',
      type: 'pie',
      color: ['#deb140', '#49dff0', '#e2ff47',
        '#6f81da', '#00ffb4',
        '#00da59', '#da83be','#bbdab6'],
      startAngle: 200,
      selectedMode: 'single',
      center: ['50%', '55%'],
      radius: ['0%', '70%'],
      avoidLabelOverlap: true
    }
}
