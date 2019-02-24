
var typePieContainer = document.getElementById('type-pie');

//用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
function resizeTypePieContainer () {
    typePieContainer.style.width = window.innerWidth * 0.3+'px';
    typePieContainer.style.height = window.innerHeight + 'px';
}
//设置容器高宽
resizeTypePieContainer();

var typePieChart = echarts.init(typePieContainer);
var scalePie = 0.5;
var typeData = ["简餐",    "米粉面馆",     "地方小吃",     "盖浇饭",  "川湘菜",  "麻辣烫",  "包子粥店",     "炸鸡炸串",     "烧烤", "其它菜系", "香锅砂锅", "黄焖鸡米饭", "饺子馄饨", "汉堡", "日韩料理", "东北菜", "火锅烤鱼", "小龙虾", "生煎锅贴", "鸭脖卤味", "披萨意面", "奶茶果汁", "西餐", "西北菜", "海鲜", "煲仔饭", "新疆菜", "零食", "粤菜","鲁菜","甜品","烧腊饭","江浙菜","咖啡","云南菜", "咖喱饭", "蛋糕","东南亚菜"]
var typePieData =[{ name: "简餐",  value: 8268,},
                { name: "米粉面馆", value: 3037,},
                { name: "地方小吃", value: 2563,},
                { name: "盖浇饭",  value: 2356,},
                { name: "川湘菜",  value: 1517,},
                { name: "麻辣烫",  value: 1248,},
                { name: "包子粥店", value: 1171,},
                { name: "炸鸡炸串", value: 1109,},
                { name: "烧烤",value:     967,},
                { name: "其它菜系",value:   916,},
                { name: "香锅砂锅",value:   752,},
                { name: "黄焖鸡米饭",value:  748,},
                { name: "饺子馄饨",value:   585,},
                { name: "汉堡",value:     563,},
                { name: "日韩料理",value:   503,},
                { name: "东北菜",value:    498,},
                { name: "火锅烤鱼",value:   498,},
                { name: "小龙虾",value:    395,},
                { name: "生煎锅贴",value:   334,},
                { name: "鸭脖卤味",value:   332,},
                { name: "披萨意面",value:   284,},
                { name: "奶茶果汁",value:   264,},
                { name: "西餐",value:     260,},
                { name: "西北菜",value:    235,},
                { name: "海鲜",value:     231,},
                { name: "煲仔饭",value:    164,},
                { name: "新疆菜",value:    114,},
                { name: "零食",value:     100,},
                { name: "粤菜",value:     81,},
                { name: "鲁菜",value:     68,},
                { name: "甜品",value:     66,},
                { name: "烧腊饭",value: 58,},
                { name: "江浙菜",value: 55,},
                { name: "咖啡",value:     54,},
                { name: "云南菜",value:    45,},
                { name: "咖喱饭",value:    32,},
                { name: "蛋糕",value:     18,},
                { name: "东南亚菜",value:   15,}]
var rich = {
    yellow: {
        color: "#ffc72b",
        fontSize: 30 * scalePie,//30 * scalePie,
        padding: [2, 0],
        align: 'center'
    },
    total: {
        color: "#ffc72b",
        fontSize: 35 * scalePie,
        align: 'center'
    },
    white: {
        color: "#fff",
        align: 'center',
        fontSize: 30 * scalePie,
        //padding: [21, 0]
        padding: [2, 0]
    },
    blue: {
        color: '#49dff0',
        fontSize: 30 * scalePie,
        align: 'center'
    },
    hr: {
        borderColor: '#0b5263',
        width: '100%',
        borderWidth: 1,
        height: 0,
    }
}
var typePieOption = {
    // backgroundColor: '#031f2d',
    title: {
        text:'外卖标签分类',
        left:'center',
        top: '48%',
        right: '10%',
        padding:[24,0],
        textStyle:{
            color:'#fff',
            fontSize: 30 * scalePie,
            align:'center'
        }
    },
    tooltip: {
    trigger: 'item',
    formatter: "{b}<br/>{c},{d}%"
    },

    legend: {
        selectedMode:false,
        formatter: function(name) {
            var total = 0; //各科正确率总和
            var averagePercent; //综合正确率
            typePieData.forEach(function(value, index, array) {
                total += value.value;
            });
            return '{total|' + total + '}';
        },
        data: [typePieData[0].name],
        left: 'center',
        top: '47%',
        icon: 'none',
        align:'center',
        textStyle: {
            color: "#fff",
            fontSize: 14 * scalePie,
            rich: rich
        },
    },
    series: [{
        name: '外卖标签分类',
        type: 'pie',
        //roseType : 'radius',
        radius: ['27%', '45%'],
        hoverAnimation: true,
        minAngle: 7,
        //startAngle: 0,
        color: ['#c487ee', '#deb140', '#49dff0', '#034079', '#6f81da', '#00ffb4'],
        label: {
            emphasis: {
                formatter: function(params, ticket, callback) {
                    var total = 0; //总数量
                    var percent = 0; //占比
                    typePieData.forEach(function(value, index, array) {
                        total += value.value;
                    });
                    percent = ((params.value / total) * 100).toFixed(1);
                    //return '{white|' + params.name + '}\n{hr|}\n{yellow|' + params.value + '}\n{blue|' + percent + '%}';
                    return '{white|' + params.name + '}  {yellow|' + params.value + '} {blue|' + percent + '%}\n{hr|}\n';
                },
                rich: rich
            },
        },
        labelLine: {
            show:true,
            emphasis: {
                length: 180,
                length2: 80,
                lineStyle: {
                    color: '#0b5263'
                }
            },
            // normal: {
            //     length: 35 * scalePie,
            //     //length2: 0,
            //     lineStyle: {
            //         color: '#0b5263'
            //     }
            // },
            
        },

        data: typePieData
    }]
};

typePieChart.setOption(typePieOption);
