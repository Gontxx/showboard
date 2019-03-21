export default {
  xAxisOption: {
    "type": "category",
    "axisLine": {
      lineStyle: {
        color: '#90979c'
      }
    },
    "splitLine": {
      "show": false
    },
    "axisTick": {
      "show": false
    },
    "splitArea": {
      "show": false
    },
    "axisLabel": {
      "interval": 0,

    },
  },
  option : {

    title: {
      text: '各区外卖成交情况',
      x: 'center',
      y: '0%',
      textStyle: {
        color: '#fff',
        fontSize: '16'
      }
    },
    "tooltip": {
      "trigger": "axis",
      "axisPointer": {
        "type": "shadow",
        textStyle: {
          color: "#fff"
        }

      },
    },
    "grid": {
      top:"10%",
      left: '10%',
      right: '3%',
      bottom: '15%',
      textStyle: {
        color: "#fff"
      }
    },
    "legend": {
      //x: '4%',
      top: '92%',
      textStyle: {
        color: '#90979c',
      },
      "data": ['老用户', '新用户', '总']
    },


    "calculable": true,
    xAxis: {
      "type": "category",
      "axisLine": {
        lineStyle: {
          color: '#90979c'
        }
      },
      "splitLine": {
        "show": false
      },
      "axisTick": {
        "show": false
      },
      "splitArea": {
        "show": false
      },
      "axisLabel": {
        "interval": 0,

      },
      //"data": [1,2,3,4,5,6,7,8,9,10,11,12],
      "data":["海淀","顺义","东城","怀柔","丰台","朝阳","通州","西城","大兴","房山","石景山","昌平","门头沟","延庆","平谷","密云",],
    },
    "yAxis": [{
      "type": "value",
      "splitLine": {
        lineStyle: {
          type: 'dashed'
        }
      },
      // "splitLine": {
      //   "show": false
      // },
      "axisLine": {
        lineStyle: {
          color: '#90979c'
        }
      },
      "axisTick": {
        "show": false
      },
      "axisLabel": {
        "interval": 0,

      },
      "splitArea": {
        "show": false
      },
      name :'房屋数量',

    }],
    "series": [{
      "name": "50m2以下",
      "type": "bar",
      "stack": "总量",
      "barMaxWidth": 35,
      "barGap": "10%",
      "itemStyle": {
        "normal": {
          "color": "rgba(255,144,128,1)",
          "label": {
            "show": false,
            "textStyle": {
              "color": "#fff"
            },
            "position": "insideTop",
            formatter: function(p) {
              return p.value > 0 ? (p.value) : '';
            }
          }
        }
      },

    },

      {
        "name": "50-80m2",
        "type": "bar",
        "stack": "总量",
        "itemStyle": {
          "normal": {
            "color": "rgba(0,191,183,1)",
            "barBorderRadius": 0,
            "label": {
              "show": false,
              "position": "top",
              formatter: function(p) {
                return p.value > 0 ? (p.value) : '';
              }
            }
          }
        },

      },
      {
        "name": "80-110m2",
        "type": "bar",
        "stack": "总量",
        "itemStyle": {
          "normal": {
            //"color": "rgba(0,191,183,1)",
            "barBorderRadius": 0,
            "label": {
              "show": false,
              "position": "top",
              formatter: function(p) {
                return p.value > 0 ? (p.value) : '';
              }
            }
          }
        },

      },
      {
        "name": "110-150m2",
        "type": "bar",
        "stack": "总量",
        "itemStyle": {
          "normal": {
            //"color": "rgba(0,191,183,1)",
            "barBorderRadius": 0,
            "label": {
              "show": false,
              "position": "top",
              formatter: function(p) {
                return p.value > 0 ? (p.value) : '';
              }
            }
          }
        },

      },
      {
        "name": "150m2以上",
        "type": "bar",
        "stack": "总量",
        "itemStyle": {
          "normal": {
            //"color": "rgba(0,191,183,1)",
            "barBorderRadius": 0,
            "label": {
              "show": false,
              "position": "top",
              formatter: function(p) {
                return p.value > 0 ? (p.value) : '';
              }
            }
          }
        },

      },
    ]
  }
}
