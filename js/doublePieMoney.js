var doublePieMoneyContainer = document.getElementById('double-pie-money');

//用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
function resizeDoublePieMoneyContainer () {
    console.log('resizeDoublePieMoneyContainer', window.innerWidth * 0.5 - 24, Math.floor((window.innerWidth * 0.5 - 24) / 3.0))
    doublePieMoneyContainer.style.width = Math.floor((window.innerWidth * 0.5 - 20 - 16) / 3.0) +'px';
    doublePieMoneyContainer.style.height = (window.innerHeight * 0.5 - 12) + 'px';
}
//设置容器高宽
resizeDoublePieMoneyContainer();


var doublePieMoneyChart = echarts.init(doublePieMoneyContainer);
//------------------------------------引用请注明出处

var Moneynum_3 = [
    {value:4391987, name:'A'},
    {value:63831135, name:'B'},
    {value:64805503, name:'C'},
    ];
var Moneynum_9 = [
    {value:496470, name:'A1'},
    {value:3315941, name:'A2'},
    {value:579576, name:'A3'},
    {value:13985029, name:'B1'},
    {value:36837311, name:'B2'},
    {value:13008795, name:'B3'},
    {value:26157832, name:'C1'},
    {value:18351859, name:'C2'},
    {value:20295812, name:'C3'},
    ];


doublePieMoneyOption = {
    //backgroundColor:'#000000',
    title : {
        text: '外卖评级成交额',
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
            name:'外卖评级成交额',
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
            data:Moneynum_3,
        },
        {
            name:'外卖评级成交额',
            type:'pie',
             radius: ['25%', '35%'],
            //center:['300','330'],
            color: ['#FF8888','#FF3333','#CC0000','#9acfe8','#56afd8','#1a8fc5', '#96dcc3', '#5ac59e', '#439476', '#346654'],
            label: {
                normal: {
                    formatter: '{b}\n  {c} ({d}%)'
                }
            },
            data:Moneynum_9,
        }
    ]
};


doublePieMoneyChart.setOption(doublePieMoneyOption);