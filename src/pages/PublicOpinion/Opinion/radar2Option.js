export default {
  option: {
    title: {
      text: '话题舆情二级指标雷达图',
      x: 'center',
      y: 'top',
      textStyle: {
        color: '#ddd'
      }
    },
    tooltip: {
      trigger: 'item',
      position: 'right',
    },
    radar: [
      {
        // shape: 'circle',
        indicator: [
          { name: '焦度', max: 100},
          { name: '持续度', max: 100},
          { name: '灵敏度', max: 100},
        ],
        center: ['27%', '32%'],
        radius: '38%'
      },
      {
        // shape: 'circle',
        indicator: [
          { name: '聚焦度', max: 100},
          { name: '聚焦焦度', max: 100},
          { name: '聚焦持续度', max: 100},
          { name: '聚焦灵敏度', max: 100},
        ],
        center: ['75%', '28%'],
        radius: '31%'
      },
      {
        // shape: 'circle',
        indicator: [
          { name: '阅读指数', max: 100},
          { name: '讨论指数', max: 100},
          { name: '转发指数', max: 100},
          { name: '评论指数', max: 100},
          { name: '点赞指数', max: 100},
        ],
        center: ['27%', '78%'],
        radius: '30%'
      },
      {
        // shape: 'circle',
        indicator: [
          { name: '情感指数', max: 100},
          { name: '离散度', max: 100},
          { name: '活力度', max: 100},
        ],
        center: ['75%', '82%'],
        radius: '38%'
      },
    ],
    series: [
      {
        name: '舆情一级指标',
        type: 'radar',
        radarIndex: 0,
        // areaStyle: {normal: {}},
        itemStyle: {normal: {areaStyle: {type: 'default'}}},
        data : [
          {
            value : [100, 70, 65],
            name : '热度',
          },
        ]
      },
      {
        type: 'radar',
        radarIndex: 1,
        tooltip: {
          trigger: 'item'
        },
        areaStyle: {},
        data: [
          {
            value : [80, 100, 70, 65],
            name : '聚焦热度',
          }
        ]
      },
      {
        type: 'radar',
        radarIndex: 2,
        tooltip: {
          trigger: 'item'
        },
        areaStyle: {},
        data: [
          {
            value : [85, 65, 80, 100, 100],
            name : '扩散度',
          }
        ]
      },
      {
        type: 'radar',
        radarIndex: 3,
        tooltip: {
          trigger: 'item'
        },
        areaStyle: {},
        data: [
          {
            value : [45, 90, 90],
            name : '情感度',
          }
        ]
      },
    ]
  }
}
