var hotelBarPriceContainer = document.getElementById('hotel-bar-price');

//用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
function resizehotelBarPriceContainer () {
    hotelBarPriceContainer.style.width = (window.innerWidth * 0.5 - 40) +'px';
    hotelBarPriceContainer.style.height = (window.innerHeight * 0.5 - 12) + 'px';
}
//设置容器高宽
resizehotelBarPriceContainer();


var hotelBarPriceChart = echarts.init(hotelBarPriceContainer);

var XData=[ '古北水镇', '古北水镇周边', '工体/三里屯/东直门', '房山区', '怀柔慕田峪/红螺寺', '丰台区', '天安门/王府井', '燕莎/亮马桥/朝阳公园', '鼓楼/后海', '酒仙桥/798', '国贸CBD/四惠', '西单/金融街', '西城区', '南锣鼓巷', '望京', '平谷区', '怀柔虹鳟鱼一条沟/神堂峪', '北京站/建国门', '十三陵水库/居庸关长城风景区', '亚运村/奥体中心', '上地产业园/西三旗', '中关村/五道口', '西直门/动物园', '老国展/三元桥', '怀柔雁栖湖风景区', '马甸/安贞', '香山/八大处风景区', '小汤山温泉度假区', '首都机场/新国展', '顺义温泉休闲区', '公主坟/五棵松/石景山游乐园地区', '北京西站/丽泽商务区', '前门/天坛', '怀柔区', '亦庄地区', '延庆旅游度假区', '怀柔城区', '总部地区/丰南体育馆地区', '门头沟/潭柘寺/妙峰山风景区', '密云区', '大兴农业生态观光区', '永定门/北京南站/大红门', '传媒大学/管庄', '欢乐谷游乐区', '房山风景区', '劲松/潘家园/宋家庄', '密云风景区', '八达岭古长城附近', '南苑', '果园环岛/通州区', '门头沟', '延庆区', '大兴区', '通州区', '平谷城区', '十渡风景名胜区周边', '顺义区', '龙庆峡风景区周边', '京东石林峡风景区'];
var yData=[ 1046.176471, 591.836364, 546.106742, 524.818182, 498.076923, 464.333333, 461.673333, 438.788235, 432.183333, 418.767442, 414.840741, 414.713675, 398.0, 392.159664, 374.076336, 370.6, 363.372549, 363.112676, 362.240506, 348.604167, 346.758621, 329.597964, 318.760456, 312.612245, 312.219512, 298.867769, 290.885714, 289.691756, 289.527027, 275.375, 271.681275, 267.26749, 265.27707, 262.884058, 256.272727, 249.113924, 246.6, 244.146154, 243.477612, 239.347826, 231.964286, 231.057971, 229.96, 219.090909, 209.365517, 203.400662, 196.542342, 196.231579, 193.5, 193.33209, 191.173913, 189.0, 188.0, 172.6, 164.02381, 139.873684, 138.0, 121.056338, 104.307692];
// XData.map(function(){
//     yData.push((Math.random()*1000+100).toFixed(0))
// })
var dataMin=parseInt(Math.min.apply(null, yData)/2);
for(var i=0;i<XData.length;i++){
    
}
hotelBarPriceOption = {
    //backgroundColor:"#080f15",
    title: {
        text: '商圈/景区平均价格',
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
      bottom: '5%',
      containLabel: true
    },
    xAxis: {
    	"axisLine": {
          lineStyle: {
              color: '#90979c'
          }
      },
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

    },
    yAxis: {
        name:'平均价格',
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



hotelBarPriceChart.setOption(hotelBarPriceOption);