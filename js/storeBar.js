var storeBarContainer = document.getElementById('store-bar');

//用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
function resizeStoreBarContainer () {
    storeBarContainer.style.width = (window.innerWidth * 0.255 - 10) +'px';
    storeBarContainer.style.height = window.innerHeight * 0.6 + 'px';
}
//设置容器高宽
resizeStoreBarContainer();


var storeBarChart = echarts.init(storeBarContainer);

var xdata = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]

var lineData = [248160,231648,230622,227199,218720
                ,214676,210824,210767,209792,207746
                ,207042,206568,205615,202800,199680];
var barData = [4600,5000,5500,6500,7500
                ,8500,9900,12500,14000,21500
                ,23200,24450,25250,33300,35800
                ,45400,59810];
var nameData = ['南城香(东铁营店)',"金百万烤鸭(清河老宅门店)","南城香(陶然亭店)"
                ,"南城香(新街口店)","麦堡王炸鸡汉堡(青年路店)","南城香(富丰桥店)"
                ,"千寿参鸡汤","麻辣拌(亚运村店","麻辣诱惑·小龙虾·大闸蟹","麻辣拌(亚运村店)"
                ,"南城香(霍营店)","千寿参鸡汤","麻辣诱惑·小龙虾·大闸蟹","辣私房·小龙虾海鲜外卖"
                ,"醉爱东北家常菜"];
                        

var storeBarOption = {
    // backgroundColor: '#031f2d',
    "title": {
        "text": "单门店成交额前15名",
        x: 'center',
        //x: "4%",  
        y: "10%",
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
        formatter: "{a} <br/>{b} : {c}元"
    },
    "grid": {
        "borderWidth": 0,
        "top": 110,
        "bottom": 95,
        textStyle: {
            color: "#fff"
        }
    },

    "calculable": true,
    //"xAxis": [{
    "yAxis": [{
        "type": "category",
        "position": 'right',
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
            "itemStyle": {
                "normal": {
                    // "color": "rgba(0,191,183,1)",
                    "color": "rgba(0,110,221,0.8)",
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
            "data": lineData
        }, {
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
                        "position": "top",
                        formatter: function(p) {
                            return p.value > 0 ? (p.value) : '';
                        }
                    }
                    
                }
            },
            "data": lineData
        },
    ]
}
    
storeBarChart.setOption(storeBarOption);
