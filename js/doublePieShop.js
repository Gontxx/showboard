var doublePieShopContainer = document.getElementById('double-pie-shop');

//用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
function resizeDoublePieShopContainer () {
    doublePieShopContainer.style.width = Math.floor((window.innerWidth * 0.5 - 20 - 16) / 3.0) +'px';
    doublePieShopContainer.style.height = (window.innerHeight * 0.5 - 12) + 'px';
}
//设置容器高宽
resizeDoublePieShopContainer();


var doublePieShopChart = echarts.init(doublePieShopContainer);
//------------------------------------引用请注明出处

var shopnum_3 = [
    {value:165, name:'A'},
    {value:3422, name:'B'},
    {value:3400, name:'C'},
    ];
var shopnum_9 = [
    {value:30, name:'A1'},
    {value:116, name:'A2'},
    {value:19, name:'A3'},
    {value:875, name:'B1'},
    {value:1921, name:'B2'},
    {value:626, name:'B3'},
    {value:1378, name:'C1'},
    {value:986, name:'C2'},
    {value:1036, name:'C3'},
    ];


doublePieShopOption = {
    // backgroundColor:'#000000',
    title : {
        text: '外卖评级店铺数',
        x: 'center',
        y:'0%',
        textStyle: {
            color: '#fff',
            fontSize: 16,
        },
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },

    series: [
        {
            name:'外卖评级店铺数',
            type:'pie',
            selectedMode: 'single',
            //center:['300','330'],
            radius: [0, '20%'],
            color: ['#EE3B3B','#1c6d90', '#09895a',],
            label: {
                normal: {
                    position: 'inner',
                    formatter: '{b}\n{d}%'
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:shopnum_3,
        },
        {
            name:'外卖评级店铺数',
            type:'pie',
             radius: ['25%', '35%'],
            //center:['300','330'],
            color: ['#FF8888','#FF3333','#CC0000','#9acfe8','#56afd8','#1a8fc5', '#96dcc3', '#5ac59e', '#439476', '#346654'],
            label: {
                normal: {
                    formatter: '{b}\n  {c} ({d}%)'
                }
            },
            data:shopnum_9,
        }
    ]
};


doublePieShopChart.setOption(doublePieShopOption);