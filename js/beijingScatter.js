var beijingScatterContainer = document.getElementById('beijing-scatter');

//用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
function resizeBeijingScatterContainer () {
    beijingScatterContainer.style.width = (window.innerWidth * 0.4 - 10) + 'px';
    beijingScatterContainer.style.height = window.innerHeight * 0.3 + 'px';
}
//设置容器高宽
resizeBeijingScatterContainer();

var beijingScatterChart = echarts.init(beijingScatterContainer);
    
var beijingdata = [
    [[ 345,545650, 9692097,"东城"]],
    [[ 462,673511, 12219790,"西城"]],
    [[ 3014, 4133050,77784505,"朝阳"]],
    [[ 1226, 1509606,29048190,"丰台"]],
    [[ 429, 454812,9311392,"石景山"]],
    [[ 2135, 3439662,60958200,"海淀"]],
    [[ 328,152277, 4467543,"门头沟"]],
    [[ 1003,354322, 9194825,"房山"]],
    [[ 1246, 1067944,22908014,"通州"]],
    [[ 993,427649, 10936043,"顺义"]],
    [[ 2181, 1740109,35947864,"昌平"]],
    [[ 1679,947943, 21198375,"大兴"]],
    [[ 303, 68112,1832624,"怀柔"]],
    [[ 392,74573, 2350885,"平谷"]],
    [[ 474, 154275,4501069,"密云"]],
    [[ 322, 64008,2067301,"延庆"]],
];
var beijingLegend = ['东城','西城','朝阳','丰台','石景山','海淀','门头沟','房山','通州','顺义','昌平','大兴','怀柔','平谷','密云','延庆']

var beijingScatteroption = {
    // backgroundColor: '#031f2d',
    title: {
        text: '北京市各区外卖成交情况',
        x: 'center',
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
                    +'<br/>成交额：'+params.value[2];
            //return params.value[0];// + ' : ' + params.value[2];
          
        }
    },
    legend: {
      icon: 'circle',
      bottom: '20px',
      itemWidth: 12,
      itemHeight: 12,
      data: beijingLegend,
      textStyle:{
        color: '#90979c'

      },
    },
    grid: {
      left: '1%',
      right: '2%',
      // bottom: '20px',
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
    series: beijingLegend.map((v, i) => {
      return {
        name: v,
        data: beijingdata[i],
        type: 'scatter',
        symbolSize: function(data) {
          return Math.sqrt(data[2]) / 200
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

beijingScatterChart.setOption(beijingScatteroption);  
