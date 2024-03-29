
export default {
  option: {
    title: {
      text: '房价分布图',
      x: 'center',
      y: '0%',
      textStyle: {
        color: '#fff',
        fontSize: '16'
      }
    },
    tooltip: {},
    grid: {
      top: '12%',
      left: '1%',
      right: '10%',
      bottom: '8%',
      containLabel: true,
    },
    xAxis: [{
      type: 'category',
      boundaryGap: false,
      axisLine: { //坐标轴轴线相关设置。数学上的x轴
        show: true,
        lineStyle: {
          color: '#90979c'
        },
      },
      axisLabel: { //坐标轴刻度标签的相关设置
        textStyle: {
          color: '#90979c',
          margin: 15,
        },
      },
      axisTick: {show: false,},
      name:'房价区间',
      data: ['200万以下', '200-300万', '300-500万', '500-700万', '700-1000万', '1000万以上'],
    }],
    yAxis: [{
      type: 'value',
      //min: 0,
      //max: 140,

      // splitLine: {
      //   show: true,
      //   type: 'dashed',
      //   lineStyle: {
      //     color: '#90979c'
      //   }
      // },
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      },
      axisLine: {
        show: true,
        lineStyle:{
          color: '#90979c',
        },
        },
      axisLabel: {
        margin: 20,
        textStyle: {
          color: '#90979c',
        },
      },
      axisTick: {show: false,},
      name :'房屋数量累积比',
    }],
    series: {
      name: '值',
      type: 'line',
      smooth: true, //是否平滑曲线显示
// 			symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
      symbolSize: 0,

      lineStyle: {
        normal: {
          color: '#3deaff'   // 线条颜色
        }
      },
      areaStyle: { //区域填充样式
        normal: {
          //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
          // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          //   {offset: 0, color: 'rgba(61,234,255, 0.9)'},
          //   {offset: 0.7, color: 'rgba(61,234,255, 0)'}
          // ], false),

          shadowColor: 'rgba(53,142,215, 0.9)', //阴影颜色
          shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
        }
      },
      //data: [90, 105, 84, 125, 110, 92]
    }
  }
}
