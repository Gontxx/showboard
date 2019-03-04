var beijingMapContainer = document.getElementById('beijing-map-mifen');

//用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
function resizeBeijingMapContainer () {
    beijingMapContainer.style.width = (window.innerWidth * 0.5 - 40) + 'px';
    beijingMapContainer.style.height = (window.innerHeight - 20) + 'px';
}
//设置容器高宽
resizeBeijingMapContainer();

var chartBeijingMap = echarts.init(beijingMapContainer);

var geoCoordMap = {
    '密云':[117.0923,40.5121],
    '怀柔':[116.6377,40.6219],
    '房山':[115.8453,39.7163],
    '延庆':[116.1543,40.5286],
    '门头沟':[115.8,39.9957],
    '昌平':[116.1777,40.2134],
    '大兴':[116.4716,39.6352],
    '顺义':[116.7242,40.1619],
    '平谷':[117.1706,40.2052],
    '通州':[116.7297,39.8131],
    '朝阳':[116.4977,39.949],
    '海淀':[116.2202,40.0239],
    '丰台':[116.2683,39.8309],
    '石景山':[116.1887,39.9346],
    '西城':[116.3631,39.9353],
    '东城':[116.418,39.9367],
     //'宣武':[116.3603,39.8852],
     //'崇文':[116.4166,39.8811],
}
var mapdata1 = [
    {name: '密云县', value: [11, 1713, 44688]},
    {name: '怀柔区', value: [17, 3959, 74632]},
    {name: '延庆县', value: [8, 1776, 43838]},
    {name: '门头沟区', value: [10, 6964, 179532]},
    {name: '昌平区', value: [107, 68855, 1315982]},
    {name: '大兴区', value: [59, 33172, 689725]},
    {name: '顺义区', value: [28, 14865, 345089]},
    {name: '平谷区', value: [5, 1561, 38742]},
    {name: '通州区', value: [60, 39044, 742415]},
    {name: '朝阳区', value: [138, 180598, 3018161]},
    {name: '海淀区', value: [111, 190887, 3127520]},
    {name: '丰台区', value: [70, 94215, 1638848]},
    {name: '石景山区', value: [17, 15098, 323255]},
    {name: '西城区', value: [22, 24918, 424988]},
    {name: '东城区', value: [29, 35641, 635033]},
    {name: '房山区', value: [30, 9809, 235584]},
];
var mapdata = [[111, 190887, 3127520, '海淀'], 
                [70, 94215, 1638848, '丰台'], 
                [29, 35641, 635033, '东城'], 
                [107, 68855, 1315982, '昌平'], 
                [59, 33172, 689725, '大兴'], 
                [138, 180598, 3018161, '朝阳'], 
                [60, 39044, 742415, '通州'], 
                [17, 3959, 74632, '怀柔'], 
                [11, 1713, 44688, '密云'], 
                [17, 15098, 323255, '石景山'], 
                [8, 1776, 43838, '延庆'], 
                [22, 24918, 424988, '西城'], 
                [30, 9809, 235584, '房山'], 
                [10, 6964, 179532, '门头沟'], 
                [5, 1561, 38742, '平谷'], 
                [28, 14865, 345089, '顺义']];


var uploadedDataURL = "data/beijing1.json";
chartBeijingMap.showLoading();
$.getJSON(uploadedDataURL, function(geoJson) {
    echarts.registerMap('beijing', geoJson);
    chartBeijingMap.hideLoading();
    var max = 480, min = 9; // todo 
    var maxSize4Pin = 100, minSize4Pin = 20;    

    var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            //var geoCoord = geoCoordMap[data[i].name];
            var geoCoord = geoCoordMap[data[i][3]];
            if (geoCoord) {
                res.push({
                    //name: data[i].name,
                    //value: geoCoord.concat(data[i].value)
                    name: data[i][3],
                    value: geoCoord.concat(data[i][0])
                    
                });
            }
        }
        return res;
    };  
    option = {
        //backgroundColor: '#020933',
        // backgroundColor: '#031f2d',
         //backgroundColor: '#fff',
        title: {
            //top:20,
            text: '北京市米粉外卖热度地图',
            x: 'center',
            y: '3%',
            textStyle: {
                color: '#fff',
                fontSize: '22'
            }
        },      

        tooltip: {
            trigger: 'item',
            formatter: function (params) {
                console.log(params)
                console.log(params.componentType)
                if (params.seriesType == "map")
                    return params.data.name+'<br/>外卖商家数：'+params.data.value[0]
                    +'<br/>订单数：'+params.data.value[1]
                    +'<br/>成交额：'+params.data.value[2]+'元';
                    
            }
        },
     /*   legend: {
            orient: 'vertical',
            y: 'bottom',
            x: 'right',
             data:['pm2.5'],
            textStyle: {
                color: '#fff'
            }
        },*/
    //}, 
        visualMap: {
            show: true,
            min: 40000,
            max: 3000000,
            // left: 'center',
            right: '10%',
            bottom: '3%',
            // top: 'bottom',
            text: ['成交额', ''], // 文本，默认为数值文
            textStyle:{
                color:'#fff',
                fontSize: '18'
            },
            calculable: true,
            seriesIndex: [1],
            //color: ['#d94e5d','#eac736','#50a3ba'],
            inRange: {
                color: ['#e0ffff', '#006edd']
            },
            // orient:'horizontal',
            textStyle:{color: "#fff"},
            // inRange: {
            //     // color: ['#3B5077', '#031525'] // 蓝黑
            //     // color: ['#ffc0cb', '#800080'] // 红紫
            //     // color: ['#3C3B3F', '#605C3C'] // 黑绿
            //     //color: ['#0f0c29', '#302b63', '#24243e'] // 黑紫黑
            //      //color: ['#23074d', '#cc5333'] // 紫红
            //     // color: ['#00467F', '#A5CC82'] // 蓝绿
            //     // color: ['#1488CC', '#2B32B2'] // 浅蓝
            //     // color: ['#00467F', '#A5CC82'] // 蓝绿
            //     // color: ['#00467F', '#A5CC82'] // 蓝绿
            //     // color: ['#00467F', '#A5CC82'] // 蓝绿
            //     // color: ['#00467F', '#A5CC82'] // 蓝绿   

            // }
        },
        geo: {
            show: true,
            map: 'beijing',
            label: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: false,
                }
            },
            roam: true,
            itemStyle: {
                normal: {
                    areaColor: 'transparent',
                    borderColor: '#3fdaff',
                    borderWidth: 2,
                    shadowColor: 'rgba(63, 218, 255, 0.5)',
                    shadowBlur: 30
                },
                emphasis: {
                    areaColor: '#2B91B7',
                }
            },
            data: mapdata1,
        },
        series : 
        [
            {
                name: 'light',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertData(mapdata),
                symbolSize: function (val) {
                    return Math.sqrt(val[2])/3;//val[2] / 50;
                },
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: true,
                        textBorderColor:'#CD8500',
                        textBorderWidth:1,
                    },
                    emphasis: {
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#F4E925'
                    }
                }
            },
            {
                type: 'map',
                map: 'beijing',
                geoIndex: 0,
                aspectScale: 0.75, //长宽比
                showLegendSymbol: false, // 存在legend时显示
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false,
                        textStyle: {
                            color: '#fff'
                        }
                    }
                },
                roam: true,
                itemStyle: {
                    normal: {
                        areaColor: '#031525',
                        borderColor: '#FFFFFF',
                    },
                    emphasis: {
                        areaColor: '#2B91B7'
                    }
                },
                animation: false,
                data: mapdata1,
            },
            {
                name: 'Top 5',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                data: convertData(mapdata.sort(function (a, b) {
                    //return b.value - a.value;
                    return b[0] - a[0];
                }).slice(0, 5)),
                symbolSize: function (val) {
                    console.log(val)
                    return Math.sqrt(val[2])/3;//val[2] / 50;
                },
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke'
                },
                hoverAnimation: true,
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        textBorderColor:'#CD8500',
                        textBorderWidth:1,
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#F4E925',
                        shadowBlur: 10,
                        shadowColor: '#05C3F9'
                    }
                },
                zlevel: 1
            },
        ]
    };
    chartBeijingMap.setOption(option);
});
