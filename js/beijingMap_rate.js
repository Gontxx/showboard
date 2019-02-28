var beijingMapContainer = document.getElementById('beijing-map');

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

area = ['朝阳区', '西城区', '丰台区', '海淀区', '密云区', '东城区', '昌平区', '怀柔区', '大兴区', '通州区', '房山区', '石景山区', '平谷区', '顺义区', '延庆区', '门头沟区']
var mapdata1 = [
    {name: '密云县', value: [238, 6, 119, 113]},
    {name: '怀柔区', value: [151, 5, 65, 81]},
    {name: '延庆县', value: [145, 2, 27, 116]},
    {name: '门头沟区', value: [147, 3, 74, 70]},
    {name: '昌平区', value: [916, 6, 387, 523]},
    {name: '大兴区', value: [669, 97, 379, 193]},
    {name: '顺义区', value: [465, 3, 325, 137]},
    {name: '平谷区', value: [205, 0, 75, 130]},
    {name: '通州区', value: [324, 3, 210, 111]},
    {name: '朝阳区', value: [921, 7, 419, 495]},
    {name: '海淀区', value: [1120, 14, 477, 629]},
    {name: '丰台区', value: [366, 9, 153, 204]},
    {name: '石景山区', value: [210, 2, 73, 135]},
    {name: '西城区', value: [184, 3, 95, 86]},
    {name: '东城区', value: [142, 0, 66, 76]},
    {name: '房山区', value: [523, 5, 362, 156]},
];
var mapdata = [
    [ 142, 0, 66, 76,"东城"],
    [ 184, 3, 95, 86,"西城"],
    [ 921, 7, 419, 495,"朝阳"],
    [ 366, 9, 153, 204,"丰台"],
    [ 210, 2, 73, 135,"石景山"],
    [ 1120, 14, 477, 629,"海淀"],
    [ 147, 3, 74, 70,"门头沟"],
    [ 523, 5, 362, 156,"房山"],
    [ 324, 3, 210, 111,"通州"],
    [ 465, 3, 325, 137,"顺义"],
    [ 916, 6, 387, 523,"昌平"],
    [ 669, 97, 379, 193,"大兴"],
    [ 151, 5, 65, 81,"怀柔"],
    [ 205, 0, 75, 130,"平谷"],
    [ 205, 0, 75, 130,"密云"],
    [ 145, 2, 27, 116,"延庆"],
];

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
            var geoCoord = geoCoordMap[data[i][4]];
            if (geoCoord) {
                res.push({
                    //name: data[i].name,
                    //value: geoCoord.concat(data[i].value)
                    name: data[i][4],
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
            text: '北京市外卖热度地图',
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
                    +'<br/>A级商家数：'+params.data.value[1]
                    +'<br/>B级商家数：'+params.data.value[2]
                    +'<br/>C级商家数：'+params.data.value[3];
                    
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
            min: 0,
            //max: 10000000,
            // left: 'center',
            right: '10%',
            bottom: '3%',
            // top: 'bottom',
            text: ['商家数', ''], // 文本，默认为数值文
            textStyle:{
                color:'#fff',
                fontSize: '18'
            },
            calculable: true,
            seriesIndex: [1],
            //color: ['#d94e5d','#eac736','#50a3ba'],
            inRange: {
                color: ['#00467F', '#A5CC82']//['#e0ffff', '#006edd']
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
                    return Math.sqrt(val[0])*1.2;//val[2] / 50;
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
                    return Math.sqrt(val[0])*1.2;//val[2] / 50;
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
