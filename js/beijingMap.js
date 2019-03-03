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
var mapdata1 = [
    {name: '密云县', value: [458, 128880, 3649860]},
    {name: '怀柔区', value: [313, 68284, 1824872]},
    {name: '延庆县', value: [291, 51154, 1625718]},
    {name: '门头沟区', value: [311, 142486, 4123087]},
    {name: '昌平区', value: [2145, 1701987, 35257695]},
    {name: '大兴区', value: [1679, 946748, 21124129]},
    {name: '顺义区', value: [992, 427162, 10921816]},
    {name: '平谷区', value: [396, 72936, 2319217]},
    {name: '通州区', value: [1233, 1042213, 22403616]},
    {name: '朝阳区', value: [2969, 4069105, 76678128]},
    {name: '海淀区', value: [2090, 3360953, 59578954]},
    {name: '丰台区', value: [1214, 1495306, 28746036]},
    {name: '石景山区', value: [425, 452301, 9252630]},
    {name: '西城区', value: [454, 651572, 11841433]},
    {name: '东城区', value: [344, 545148, 9681555]},
    {name: '房山区', value: [997, 350962, 9113454]},
];
// var mapdata = [
//     [ 345,545650, 9692097,"东城"],
//     [ 462,673511, 12219790,"西城"],
//     [ 3014, 4133050,77784505,"朝阳"],
//     [ 1226, 1509606,29048190,"丰台"],
//     [ 429, 454812,9311392,"石景山"],
//     [ 2135, 3439662,60958200,"海淀"],
//     [ 328,152277, 4467543,"门头沟"],
//     [ 1003,354322, 9194825,"房山"],
//     [ 1246, 1067944,22908014,"通州"],
//     [ 993,427649, 10936043,"顺义"],
//     [ 2181, 1740109,35947864,"昌平"],
//     [ 1679,947943, 21198375,"大兴"],
//     [ 303, 68112,1832624,"怀柔"],
//     [ 392,74573, 2350885,"平谷"],
//     [ 474, 154275,4501069,"密云"],
//     [ 322, 64008,2067301,"延庆"],
// ];
var mapdata = [[2969, 4069105, 76678128, '朝阳'], 
                [454, 651572, 11841433, '西城'], 
                [1214, 1495306, 28746036, '丰台'], 
                [2090, 3360953, 59578954, '海淀'], 
                [313, 68284, 1824872, '怀柔'], 
                [291, 51154, 1625718, '延庆'], 
                [458, 128880, 3649860, '密云'], 
                [992, 427162, 10921816, '顺义'], 
                [425, 452301, 9252630, '石景山'], 
                [997, 350962, 9113454, '房山'], 
                [344, 545148, 9681555, '东城'], 
                [2145, 1701987, 35257695, '昌平'], 
                [1233, 1042213, 22403616, '通州'], 
                [1679, 946748, 21124129, '大兴'], 
                [396, 72936, 2319217, '平谷'], 
                [311, 142486, 4123087, '门头沟']]


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
            min: 0,
            max: 10000000,
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
