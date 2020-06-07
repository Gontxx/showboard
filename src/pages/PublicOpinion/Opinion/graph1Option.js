const colorList = [
  '#929fff', '#4e8367', '#af87fe', '#024b51',
  '#bb60b2', '#433e7c', '#f47a75', '#009db2',
  '#0780cf', '#4ea397', '#e75840', '#3685fe',
  '#9977ef', '#f5616f', '#50c48f'
]

export default {
  option: {
    // 图表标题
    title: {
      show:true,//显示策略，默认值true,可选为：true（显示） | false（隐藏）
      text: '微博热搜榜话题图谱',//主标题文本，'\n'指定换行
      x: 'center',        // 水平安放位置，默认为左对齐，可选为：
      // 'center' ¦ 'left' ¦ 'right'
      // ¦ {number}（x坐标，单位px）
      y: 'top',             // 垂直安放位置，默认为全图顶端，可选为：
      // 'top' ¦ 'bottom' ¦ 'center'
      // ¦ {number}（y坐标，单位px）
      //textAlign: null          // 水平对齐方式，默认根据x设置自动调整
      backgroundColor: 'rgba(0,0,0,0)',
      borderColor: '#ccc',    // 标题边框颜色
      borderWidth: 0,         // 标题边框线宽，单位px，默认为0（无边框）
      padding: 5,             // 标题内边距，单位px，默认各方向内边距为5，
                              // 接受数组分别设定上右下左边距，同css
      itemGap: 10,            // 主副标题纵向间隔，单位px，默认为10，
      textStyle: {
        fontSize: 18,
        fontWeight: 'bolder',
        color: '#ddd'        // 主标题文字颜色
      },
    },
    // backgroundColor: '#000',
    tooltip: {
      trigger: 'item',
      position: 'right',
      formatter: function (params) {
        return params.data.name + '<br/>热搜数：' + params.data.value
      }
    },
    animationDurationUpdate: function(idx) {
      // 越往后的数据延迟越大
      return idx * 100;
    },
    animationEasingUpdate: 'bounceIn',
    color: ['#fff', '#fff', '#fff'],
    legend: {
      show: true,
      top:"10%",
    },
    series: [{
      top:"12%",
      type: 'graph',
      layout: 'force',
      force: {
        repulsion: 80,
        edgeLength: 100
      },
      roam: true,
      label: {
        normal: {
          show: true,
          color: "#ddd"
        }
      },
      data: [
        {"name": "刘雨昕长发", "value": 2058124, "symbolSize": 72, "draggable": true, "itemStyle": {"normal": { "shadowBlur": 0, "shadowColor": colorList[1], "color": colorList[1] } } },
        {"name": "澳大利亚暂停申办2032奥运", "value": 1751491, "symbolSize": 66, "draggable": true, "itemStyle": {"normal": { "shadowBlur": 0, "shadowColor": colorList[2], "color": colorList[2] } } },
        {"name": "说白了你敢吗", "value": 1642587, "symbolSize": 64, "draggable": true, "itemStyle": {"normal": { "shadowBlur": 0, "shadowColor": colorList[3], "color": colorList[3] } } },
        {"name": "吴昕跳舞", "value": 1524287, "symbolSize": 62, "draggable": true, "itemStyle": {"normal": { "shadowBlur": 0, "shadowColor": colorList[4], "color": colorList[4] } } },
        {"name": "乃万甩话筒", "value": 1435649, "symbolSize": 60, "draggable": true, "itemStyle": {"normal": { "shadowBlur": 0, "shadowColor": colorList[5], "color": colorList[5] } } },
        {"name": "青春有你导师合作舞台", "value": 1301903, "symbolSize": 57, "draggable": true, "itemStyle": {"normal": { "shadowBlur": 0, "shadowColor": colorList[6], "color": colorList[6] } } },
        {"name": "有没有一种小龙虾是蓬松的", "value": 1150224, "symbolSize": 52, "draggable": true, "itemStyle": {"normal": { "shadowBlur": 0, "shadowColor": colorList[7], "color": colorList[7] } } },
        {"name": "吉林封闭小区居民用蔬菜摆感谢语", "value": 1008954, "symbolSize": 50, "draggable": true, "itemStyle": {"normal": { "shadowBlur": 0, "shadowColor": colorList[8], "color": colorList[8] } } },
        {"name": "建议未成年人不能从事超龄商业活动", "value": 966638, "symbolSize": 49, "draggable": true, "itemStyle": {"normal": { "shadowBlur": 0, "shadowColor": colorList[9], "color": colorList[9] } } },
        {"name": "孟鹤堂曾毅跳女团舞", "value": 942399, "symbolSize": 49, "draggable": true, "itemStyle": {"normal": { "shadowBlur": 0, "shadowColor": colorList[10], "color": colorList[10] } } },
        {"name": "韩国梨泰院感染事件病毒类型与欧美吻合", "value": 777198, "symbolSize": 44, "draggable": true, "itemStyle": {"normal": { "shadowBlur": 0, "shadowColor": colorList[11], "color": colorList[11] } } },
        {"name": "赫兹中国回应申请破产", "value": 726378, "symbolSize": 43, "draggable": true, "itemStyle": {"normal": { "shadowBlur": 0, "shadowColor": colorList[12], "color": colorList[12] } } },
        {"name": "建议增加0-3岁婴幼儿免费体检频次", "value": 624773, "symbolSize": 40, "draggable": true, "itemStyle": {"normal": { "shadowBlur": 0, "shadowColor": colorList[13], "color": colorList[13] } } },
        {"name": "父亲收到女儿送的色盲眼镜", "value": 620858, "symbolSize": 39, "draggable": true, "itemStyle": {"normal": { "shadowBlur": 0, "shadowColor": colorList[0], "color": colorList[0] } } },
        {"name": "舞者", "value": 565363, "symbolSize": 38, "draggable": true, "itemStyle": {"normal": { "shadowBlur": 0, "shadowColor": colorList[14], "color": colorList[14] } } },

      ]
    }]
  }
}
