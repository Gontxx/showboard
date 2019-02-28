var hotelBarNumContainer = document.getElementById('hotel-bar-Num');

//用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
function resizehotelBarNumContainer () {
    hotelBarNumContainer.style.width = (window.innerWidth * 0.5 - 40) +'px';
    hotelBarNumContainer.style.height = (window.innerHeight * 0.5 - 12) + 'px';
}
//设置容器高宽
resizehotelBarNumContainer();


var hotelBarNumChart = echarts.init(hotelBarNumContainer);

var XData=['密云风景区', '中关村/五道口', '前门/天坛', '劲松/潘家园/宋家庄', '房山风景区', '小汤山温泉度假区', '永定门/北京南站/大红门', '国贸CBD/四惠', '果园环岛/通州区', '西直门/动物园', '总部地区/丰南体育馆地区', '大兴农业生态观光区', '公主坟/五棵松/石景山游乐园地区', '北京西站/丽泽商务区', '西单/金融街', '首都机场/新国展', '怀柔区', '亚运村/奥体中心', '十渡风景名胜区周边', '亦庄地区', '工体/三里屯/东直门', '延庆旅游度假区', '十三陵水库/居庸关长城风景区', '天安门/王府井', '北京站/建国门', '望京', '顺义温泉休闲区', '马甸/安贞', '南锣鼓巷', '上地产业园/西三旗', '传媒大学/管庄', '老国展/三元桥', '八达岭古长城附近', '燕莎/亮马桥/朝阳公园', '平谷城区', '龙庆峡风景区周边', '香山/八大处风景区', '门头沟/潭柘寺/妙峰山风景区', '怀柔慕田峪/红螺寺', '鼓楼/后海', '古北水镇周边', '怀柔虹鳟鱼一条沟/神堂峪', '密云区', '酒仙桥/798', '怀柔雁栖湖风景区', '古北水镇', '欢乐谷游乐区', '南苑', '京东石林峡风景区', '门头沟', '房山区', '通州区', '平谷区', '怀柔城区', '丰台区', '昌平区', '西城区', '延庆区', '顺义区', '大兴区']
var yData=[555, 393, 314, 302, 290, 279, 276, 270, 268, 263, 260, 252, 251, 243, 234, 222, 207, 192, 190, 187, 178, 158, 158, 150, 142, 131, 128, 121, 119, 116, 100, 98, 95, 85, 84, 71, 70, 67, 65, 60, 55, 51, 46, 43, 41, 34, 33, 26, 26, 23, 11, 5, 5, 5, 3, 2, 1, 1, 1, 1]
// XData.map(function(){
//     yData.push((Math.random()*1000+100).toFixed(0))
// })
var dataMin=parseInt(Math.min.apply(null, yData)/2);
for(var i=0;i<XData.length;i++){
    
}
hotelBarNumOption = {
    //backgroundColor:"#080f15",
    title: {
        text: '商圈/景区覆盖',
        x: 'center',
        y:'0%',
        textStyle: {
                color: '#fff',
                fontSize: '16'
            }
    },
    grid: {
      top:"10%",
      left: '0%',
      right: '0%',
      bottom: '0%',
      containLabel: true
    },
    xAxis: {
        axisTick: {
            show: false
        },
        splitLine: {
            show: false
        },
        splitArea: {
            show: false
        },
        data: XData,
        axisLabel: {
            //rotate:90,
            //fontSize:9,
            // formatter: function(value) {
            //     var ret = ""; //拼接加\n返回的类目项
            //     var maxLength = 1; //每项显示文字个数
            //     var valLength = value.length; //X轴类目项的文字个数
            //     var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
            //     if (rowN > 1) //如果类目项的文字大于3,
            //     {
            //         for (var i = 0; i < rowN; i++) {
            //             var temp = ""; //每次截取的字符串
            //             var start = i * maxLength; //开始截取的位置
            //             var end = start + maxLength; //结束截取的位置
            //             //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
            //             temp = value.substring(start, end) + "\n";
            //             ret += temp; //凭借最终的字符串
            //         }
            //         return ret;
            //     } else {
            //         return value;
            //     }
            // },
            // interval: 0,
            // fontSize: 8,
            // fontWeight: 100,
            // textStyle: {
            //     color: '#9faeb5',

            // }
        },
        axisLine: {
            lineStyle: {
                color: '#90979c'
            }
        }
    },
    yAxis: {
        //name:'平均价格',
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
      //name :'消费人数',
        // axisTick: {
        //     show: false
        // },
        // splitLine: {
        //     show: false
        // },
        // splitArea: {
        //     show: false
        // },
        // min: dataMin,
        // axisLabel: {
        //     textStyle: {
        //         color: '#9faeb5',
        //         fontSize: 16,
        //     }
        // },
        // axisLine: {
        //     lineStyle: {
        //         color: '#4d4d4d'
        //     }
        // }
    },
    "tooltip": {
      "trigger": "item",
      "textStyle": {
        "fontSize": 12
      },
      //"formatter": "{b0}:{c0}"
    },
    series: {
        type:"bar",
        itemStyle: {
            normal: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0,
                        color: '#00d386' // 0% 处的颜色
                    }, {
                        offset: 1,
                        color: '#0076fc' // 100% 处的颜色
                    }],
                    globalCoord: false // 缺省为 false
                },
                barBorderRadius: 15,
            }
        },
        // barWidth: 7,
        data: yData
    }
};



hotelBarNumChart.setOption(hotelBarNumOption);