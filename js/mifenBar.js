var mifenBarContainer = document.getElementById('mifen-bar');

//用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
function resizeMifenBarContainer () {
    mifenBarContainer.style.width = (window.innerWidth * 0.5 - 20) +'px';
    mifenBarContainer.style.height = (window.innerHeight * 0.32 - 12) + 'px';
}
//设置容器高宽
resizeMifenBarContainer();


var mifenBarChart = echarts.init(mifenBarContainer);

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

var lineData = [170196, 130929, 130511, 113183, 107472, 
                107408, 101640, 99040, 92124, 89280, 
                88984, 87374, 85813, 83572, 78000, 
                74880, 74730, 73410, 73248, 72900, 
                70905, 70192, 69930, 69258, 68640, 
                68535, 67014, 66930, 64607, 63296]
var nameData = ['水平有限柳州螺蛳粉（五道口店）', '强记桂林米粉', '螺蛳粉先生（中关村店）', '云南过桥米线(人民大学店)', '水平有限柳州螺蛳粉(上地店)', '云南过桥米线(亚运村店）', '螺蛳粉先生(蓟门里店)', '云南过桥米线(双井店)', '云南过桥米线(花园美食城26号店)', '水平有限螺蛳粉（回龙观店）', '云南过桥米线(紫竹桥店)', '天瑞福云南过桥米线', '桥香阁过桥米线', '驴肉火烧过桥米线(四道口店)', '过桥米线.鸭血粉丝(安慧里店)', '又一春排骨饭过桥米线', '正宗云南过桥米线(马连道店)', '四季香过桥米线黄焖鸡', '顶香阁桂林米粉螺蛳粉(上地店)', '云南过桥米线(永定路店)', '云南过桥米线(黄寺店)', '无名缘米粉(青年路店)', '云南过桥米线（南方庄店）', '云南过桥米线(中关村店)', '一品鲜云南过桥米线(东直门店)', '驴肉火烧过桥米线', '闫小溪过桥米线(东直门店)', '桂林米粉（北洼路店）', '四有青年米粉·面(富卓大厦店)', '云南过桥米线(百味时代)']

var name = ['水平有限柳州螺蛳粉（五道口店）', '强记桂林米粉', '螺蛳粉先生（中关村店）', '云南过桥米线(人民大学店)', '水平有限柳州螺蛳粉(上地店)', '云南过桥米线(亚运村店）', '螺蛳粉先生(蓟门里店)', '云南过桥米线(双井店)', '云南过桥米线(花园美食城26号店)', '水平有限螺蛳粉（回龙观店）', '云南过桥米线(紫竹桥店)', '天瑞福云南过桥米线', '桥香阁过桥米线', '驴肉火烧过桥米线(四道口店)', '过桥米线.鸭血粉丝(安慧里店)', '又一春排骨饭过桥米线', '正宗云南过桥米线(马连道店)', '四季香过桥米线黄焖鸡', '顶香阁桂林米粉螺蛳粉(上地店)', '云南过桥米线(永定路店)', '云南过桥米线(黄寺店)', '无名缘米粉(青年路店)', '云南过桥米线（南方庄店）', '云南过桥米线(中关村店)', '一品鲜云南过桥米线(东直门店)', '驴肉火烧过桥米线', '闫小溪过桥米线(东直门店)', '桂林米粉（北洼路店）', '四有青年米粉·面(富卓大厦店)', '云南过桥米线(百味时代)', '荣记桂林米粉广式煲仔饭']
var Data1 = [170196, 0, 113183, 0, 101640, 0, 92124, 0, 0, 85813, 0, 0, 0, 0, 0, 0, 0, 0, 68640, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
var Data2 = [0, 0, 0, 107472, 0, 99040, 0, 89280, 88984, 0, 83572, 78000, 74880, 74730, 73410, 73248, 72900, 70905, 0, 68535, 67014, 0, 64607, 63296, 62784, 62464, 61884, 0, 0, 59092]
var Data3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 66930, 0, 0, 0, 0, 0, 0, 59180, 0]
var Data4 = [0, 130929, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 61866, 0, 0]




var mifenBarOption = {
    // backgroundColor: '#031f2d',
    "title": {
        "text": "米粉成交额前30名",
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
    'legend': {
        show:true,
      icon: 'circle',
      bottom: '50%',
      itemWidth: 12,
      itemHeight: 12,
      data: ['螺蛳粉','过桥米线','其他米粉','桂林米粉'],
      textStyle:{
        color: '#90979c'

      },
    },
    "grid": {
        "borderWidth": 0,
        "top": "15%",
        "bottom": "2%",
        "right":"3%",
        textStyle: {
            color: "#fff"
        }
    },

    "calculable": true,
    "xAxis": [{
    //"yAxis": [{
        //name:'店铺',
        "type": "category",
        "position": 'right',
        //"offset":-100,
        'axisLabel':{
            "show":false
        },
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
    "yAxis": [{
    //"xAxis": [{
        'name':'成交额（元）',
        "type": "value",
        "splitNumber":3,
        "splitLine": {
            "show": false
        },
        //inverse:true,

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
            return 0;//value.min- 30000;
}

    }],
    "series": [
        {
            "name": "螺蛳粉",
            "type": "bar",
            "stack": "总量",
            label:{
                 "normal": {
                    "position": "left",
                 },

            },
            itemStyle: {
                normal: {
                    color: '#deb140',
                    barBorderRadius: 15
            }
        },
            "data": Data1
        }, 
        {
            "name": "桂林米粉",
            "type": "bar",
            "stack": "总量",
            label:{
                 "normal": {
                    "position": "left",
                 },

            },
            itemStyle: {
                normal: {
                    color: '#6f81da',
                    barBorderRadius: 15
            }
        },
            "data": Data4
        }, 
        {
            "name": "过桥米线",
            "type": "bar",
            "stack": "总量",
            label:{
                 "normal": {
                    "position": "left",
                 },

            },
            itemStyle: {
                normal: {
                    color: '#49dff0',
                    barBorderRadius: 15
            }
        },
            "data": Data2
        }, 
        {
            "name": "其他米粉",
            "type": "bar",
            "stack": "总量",
            label:{
                 "normal": {
                    "position": "left",
                 },

            },
            itemStyle: {
                normal: {
                    color: '#034079',
                    barBorderRadius: 15
            }
        },
            "data": Data3
        }, 

    ]
}
    
mifenBarChart.setOption(mifenBarOption);
