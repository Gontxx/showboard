var storeBarContainer = document.getElementById('store-bar');

//用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
function resizeStoreBarContainer () {
    storeBarContainer.style.width = (window.innerWidth * 0.4 - 20) +'px';
    storeBarContainer.style.height = (window.innerHeight * 0.32 - 12) + 'px';
}
//设置容器高宽
resizeStoreBarContainer();


var storeBarChart = echarts.init(storeBarContainer);

var xdata = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]

// var lineData = [248160,231648,230622,227199,218720
//                 ,214676,210824,210767,209792,207746
//                 ,207042,206568,205615,202800,199680];
// var barData = [4600,5000,5500,6500,7500
//                 ,8500,9900,12500,14000,21500
//                 ,23200,24450,25250,33300,35800
//                 ,45400,59810];
// var nameData = ['南城香(东铁营店)',"金百万烤鸭(清河老宅门店)","南城香(陶然亭店)"
//                 ,"南城香(新街口店)","麦堡王炸鸡汉堡(青年路店)","南城香(富丰桥店)"
//                 ,"千寿参鸡汤","麻辣拌(亚运村店","麻辣诱惑·小龙虾·大闸蟹","麻辣拌(亚运村店)"
//                 ,"南城香(霍营店)","千寿参鸡汤","麻辣诱惑·小龙虾·大闸蟹","辣私房·小龙虾海鲜外卖"
//                 ,"醉爱东北家常菜"];

var lineData = [199680, 202800, 205615, 206568, 207042, 207746, 209792, 210767, 210824, 214676, 218720, 227199, 230622, 231648, 248160];
var nameData = ['醉爱东北家常菜', '辣私房·小龙虾海鲜外卖', '麻辣诱惑·小龙虾·大闸蟹', '千寿参鸡汤', '南城香(霍营店)', '麻辣拌(亚运村店)', '麻辣诱惑·小龙虾·大闸蟹', '麻辣拌(亚运村店', '千寿参鸡汤', '南城香(富丰桥店)', '麦堡王炸鸡汉堡(青年路店)', '南城香(新街口店)', '南城香(陶然亭店)', '金百万烤鸭(清河老宅门店)', '南城香(东铁营店)'];
                        

var storeBarOption = {
    // backgroundColor: '#031f2d',
    "title": {
        "text": "单门店成交额前15名",
        x: 'center',
        //x: "4%",  
        y: "0%",
        textStyle: {
            color: '#fff',
            fontSize: '16'
        },

    },
    "tooltip": {
        trigger: "item",
        "axisPointer": {
            "type": "shadow",
            textStyle: {
                color: "#fff"
            },
        
        },
        //formatter: "{a} <br/>{b} : {c}元"
    },
    "grid": {
        "borderWidth": 0,
        "top": "10%",
        "bottom": "10%",
        "right":"30%",
        textStyle: {
            color: "#fff"
        }
    },

    "calculable": true,
    //"xAxis": [{
    "yAxis": [{
        "type": "category",
        "position": 'right',
        //"offset":-100,
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
        "data": nameData,
    }],
    //"yAxis": [{
    "xAxis": [{
        "type": "value",
        "splitNumber":3,
        "splitLine": {
            "show": false
        },
        inverse:true,

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
        "min": function(value) {
            return value.min - 100000;
}

    }],
    // "dataZoom": [{
    //     "show": true,
    //     //"height": 30,
    //     "xAxisIndex": [
    //         0
    //     ],
    //     bottom: 30,
    //     "start": 0,
    //     "end": 60,
    //     handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
    //     handleSize: '110%',
    //     handleStyle:{
    //         color:"#d3dee5",
            
    //     },
    //        textStyle:{
    //         color:"#fff"},
    //        borderColor:"#90979c"
        
        
    // }, {
    //     "type": "inside",
    //     "show": true,
    //     "height": 15,
    //     "start": 1,
    //     "end": 35
    // }],
    "series": [
        {
            "name": "成交额",
            "type": "bar",
            //"stack": "总量",
            label:{
                 "normal": {
                    "position": "left",
                 },

            },
            itemStyle: {
                normal: {
                    color: function(params) {
                        // build a color map as your need.
                        var colorList = [{
                                colorStops: [{
                                    offset: 0,
                                    color: '#FFD119' // 0% 处的颜色
                                }, {
                                    offset: 1,
                                    color: '#FFAC4C' // 100% 处的颜色
                                }]
                            },
                            {
                                colorStops: [{
                                    offset: 0,
                                    color: '#00C0FA' // 0% 处的颜色
                                }, {
                                    offset: 1,
                                    color: '#2F95FA' // 100% 处的颜色
                                }]
                            }
                        ];
                        if (params.dataIndex >= 10) {
                            return colorList[0]
                        } else {
                            return colorList[1]
                        }
                    },
                    barBorderRadius: 15
            }
        },

            // "itemStyle": {
            //     "normal": {
            //         // "color": "rgba(0,191,183,1)",
            //         "color": "rgba(0,110,221,0.8)",
            //         "barBorderRadius": 0,
            //     }
            // },
            "data": lineData
        }, 
        {
            "name": "成交额",
            "type": "line",
            //"stack": "总量",
            symbolSize: 8,
            symbol:'circle',
            "itemStyle": {
                "normal": {
                    "color": "rgba(252,230,48,1)",
                    "barBorderRadius": 0,
                    "label": {
                        "show": true,
                        "position": "left",
                        formatter: function(p) {
                            return p.value > 0 ? (p.value) : '';
                        }
                    }
                    
                },
            },
            "data": lineData
        },
    ]
}
    
storeBarChart.setOption(storeBarOption);
