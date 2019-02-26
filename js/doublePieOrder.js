var doublePieOrderContainer = document.getElementById('rate-bar');

//用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
function resizeRateBarContainer () {
    doublePieOrderContainer.style.width = (window.innerWidth * 0.4 - 20) +'px';
    doublePieOrderContainer.style.height = (window.innerHeight * 0.5 - 12) + 'px';
}
//设置容器高宽
resizeRateBarContainer();


var doublePieOrderChart = echarts.init(doublePieOrderContainer);
//------------------------------------引用请注明出处

var Ordernum_3 = [
    {value:223203, name:'A'},
    {value:3105855, name:'B'},
    {value:3401814, name:'C'},
    ];
var Ordernum_9 = [
    {value:29726, name:'A1'},
    {value:169452, name:'A2'},
    {value:24025, name:'A3'},
    {value:692314, name:'B1'},
    {value:1736864, name:'B2'},
    {value:676677, name:'B3'},
    {value:1371600, name:'C1'},
    {value:958532, name:'C2'},
    {value:1071682, name:'C3'},
    ];


doublePieOrderOption = {
    //backgroundColor:'#000000',
    title : {
        text: '外卖评级订单数',
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
            name:'外卖评级订单数',
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
            data:Ordernum_3,
        },
        {
            name:'外卖评级订单数',
            type:'pie',
             radius: ['25%', '35%'],
            //center:['300','330'],
            color: ['#FF8888','#FF3333','#CC0000','#9acfe8','#56afd8','#1a8fc5', '#96dcc3', '#5ac59e', '#439476', '#346654'],
            label: {
                normal: {
                    formatter: '{b}\n  {c} ({d}%)'
                }
            },
            data:Ordernum_9,
        }
    ]
};


doublePieOrderChart.setOption(doublePieOrderOption);