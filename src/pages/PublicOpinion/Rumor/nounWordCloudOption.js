export default
{
  option:
    {
      title:
        {
          text: '辟谣消息热点名词',
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
          formatter: '{a} <br/>{b}: {c}'
        }
    },
  seriesOption:
    {
      name: '热点名词',
      type: 'wordCloud',
      sizeRange: [12, 55],
      textStyle: {
        normal: {
          color: function () {
            return 'rgb(' + Math.round(Math.random() * 255) + ',' +
            Math.round(Math.random() * 255) + ',' +
            Math.round(Math.random() * 255) + ')'
          }
        }
      }
    }
}
