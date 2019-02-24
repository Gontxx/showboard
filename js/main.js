var vm = new Vue({
    el: "#app",
    data: {
    	nav: 'home',
        uploadedDataURL: 'data/beijing1.json',
        chartBeijingMap: null,
    },
    watch: {

    },
    methods: {
		initCharts() {
			this.initBeijingMap()
		},
        initBeijingMap() {
            this.chartBeijingMap = echarts.init(document.getElementById('beijing-map'));
            this.chartBeijingMap.showLoading();
            let that = this;
            $.getJSON(uploadedDataURL, function(geoJson) {
                echarts.registerMap('beijing', geoJson);
                that.chartBeijingMap.hideLoading();
        var mapdata1 = [
            {name: '密云县', value: [474, 154275,4501069]},
            {name: '怀柔区', value: [303, 68112,1832624]},
            {name: '延庆县', value: [322, 64008,2067301]},
            {name: '门头沟区', value: [328,152277, 4467543]},
            {name: '昌平区', value: [2181, 1740109,35947864]},
            {name: '大兴区', value: [1679,947943, 21198375]},
            {name: '顺义区', value: [993,427649, 10936043]},
            {name: '平谷区', value: [392,74573, 2350885]},
            {name: '通州区', value: [1246, 1067944,22908014]},
            {name: '朝阳区', value: [14, 4133050,77784505]},
            {name: '海淀区', value: [2135, 3439662,60958200]},
            {name: '丰台区', value: [1226, 1509606,29048190]},
            {name: '石景山区', value: [429, 454812,9311392]},
            {name: '西城区', value: [462,673511, 12219790]},
            {name: '东城区', value: [345,545650, 9692097]},
            {name: '房山区', value: ['None','None', 'None']},
        ];
        var mapdata = [
            [ 345,545650, 9692097,"东城"],
            [ 462,673511, 12219790,"西城"],
            [ 3014, 4133050,77784505,"朝阳"],
            [ 1226, 1509606,29048190,"丰台"],
            [ 429, 454812,9311392,"石景山"],
            [ 2135, 3439662,60958200,"海淀"],
            [ 328,152277, 4467543,"门头沟"],
            [ 1003,354322, 9194825,"房山"],
            [ 1246, 1067944,22908014,"通州"],
            [ 993,427649, 10936043,"顺义"],
            [ 2181, 1740109,35947864,"昌平"],
            [ 1679,947943, 21198375,"大兴"],
            [ 303, 68112,1832624,"怀柔"],
            [ 392,74573, 2350885,"平谷"],
            [ 474, 154275,4501069,"密云"],
            [ 322, 64008,2067301,"延庆"],
        ];
        var max = 480, min = 9; // todo 
        var maxSize4Pin = 100, minSize4Pin = 20;    

        option = {
            //backgroundColor: '#020933',
            backgroundColor: '#031f2d',
            title: {
                //top:20,
                text: '北京市各区外卖成交情况',
                
                x: 'center',
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
                        +'<br/>成交额：'+params.data.value[2];
                        
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
                left: 'left',
                top: 'bottom',
                text: ['高', '低'], // 文本，默认为数值文本
                calculable: true,
                seriesIndex: [1],
                //color: ['#d94e5d','#eac736','#50a3ba'],
                inRange: {
                    color: ['#e0ffff', '#006edd']
            },
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
            series : [
          {
                name: 'light',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertMapData(mapdata),
                symbolSize: function (val) {
                    return Math.sqrt(val[2])/3;//val[2] / 50;
                },
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: true
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
                data: convertMapData(mapdata.sort(function (a, b) {
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
        myChart.setOption(option);
    });
        }
    },
    mounted: function() {
    	this.initCharts()

    }
});


