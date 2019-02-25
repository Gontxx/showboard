var rateScatterContainer = document.getElementById('rate-scatter');

//用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
function resizeRateScatterContainer () {
    rateScatterContainer.style.width = (window.innerWidth * 0.4 - 20) + 'px';
    rateScatterContainer.style.height = (window.innerHeight * 0.5 - 12) + 'px';
}
//设置容器高宽
resizeRateScatterContainer();

var rateScatterChart = echarts.init(rateScatterContainer);
    
var ratedata = [[[1921, 1736864, 36837311, 'B2']], [[626, 676677, 13008795, 'B3']], [[875, 692314, 13985029, 'B1']], [[1378, 1371600, 26157832, 'C1']], [[986, 958532, 18351859, 'C2']], [[1036, 1071682, 20295812, 'C3']], [[116, 169452, 3315941, 'A2']], [[2, 359, 11732, '']], [[19, 24025, 579576, 'A3']], [[30, 29726, 496470, 'A1']]]
var rateLegend=['B2', 'B3', 'B1', 'C1', 'C2', 'C3', 'A2', '', 'A3', 'A1']


var rateScatteroption = {
    // backgroundColor: '#031f2d',
    title: {
        text: '各评级外卖成交情况',
        x: 'center',
        y:'0%',
        textStyle: {
                color: '#fff',
                fontSize: '16'
            }
    },
    color: [
      '#0580F2',
      '#FAA732',
      '#E1575D',
      '#8B73CC',
      '#8CD123',
      '#4B53BA',
      '#429588',
      '#ff3333', 'orange', 'yellow','lime','aqua'
    ],
    tooltip: {
        trigger: "item",
        "axisLine": {
            lineStyle: {
                color: '#90979c'
            }
        },
        "axisPointer": {
            "type": "shadow",
            textStyle: {
                color: "#fff"
            },
        
        },
        formatter: function (params) {
            return params.value[3]+'<br/>外卖商家数：'+params.value[0]
                    +'<br/>订单数：'+params.value[1]
                    +'<br/>成交额：'+params.value[2]+'元';
            //return params.value[0];// + ' : ' + params.value[2];
          
        }
    },
    legend: {
      icon: 'circle',
      bottom: '0%',
      itemWidth: 12,
      itemHeight: 12,
      data: rateLegend,
      textStyle:{
        color: '#90979c'

      },
    },
    grid: {
      top:"18%",
      left: '0%',
      right: '12%',
      bottom: '20%',
      containLabel: true
    },
    xAxis: {
      "axisLine": {
          lineStyle: {
              color: '#90979c'
          }
      },
      splitLine: {
          lineStyle: {
              type: 'dashed'
          }
      },
      name :'商家数',
    },
    yAxis: {
      "axisLine": {
              lineStyle: {
                  color: '#90979c'
              }
          },
      splitLine: {
          lineStyle: {
              type: 'dashed'
          }
      },
      scale: true,
      name :'订单数',
    },
    series: rateLegend.map((v, i) => {
      return {
        name: v,
        data: ratedata[i],
        type: 'scatter',
        symbolSize: function(data) {
          return Math.sqrt(data[2]) / 150
        },
        label: {
          normal: {
            show: true,
            formatter: function(param) {
              return param.data[3]
            },
            position: 'top'
          },
          emphasis: {
            show: true,
            formatter: function(param) {
              return param.data[3]
            },
            position: 'top'
          }
        },
        itemStyle: {
          normal: {
            shadowBlur: 10,
            shadowColor: 'rgba(120, 36, 50, 0.5)',
            shadowOffsetY: 5
          }
        }
      }
    })
};

rateScatterChart.setOption(rateScatteroption);  
