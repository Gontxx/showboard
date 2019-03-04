var doublePieMoneyContainer = document.getElementById('pie-money');

//用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
function resizeDoublePieMoneyContainer () {
    doublePieMoneyContainer.style.width = Math.floor((window.innerWidth * 0.5 - 20 - 16) / 3.0) +'px';
    doublePieMoneyContainer.style.height = (window.innerHeight * 0.3 - 12) + 'px';
}
//设置容器高宽
resizeDoublePieMoneyContainer();


var doublePieMoneyChart = echarts.init(doublePieMoneyContainer);
//------------------------------------引用请注明出处

var Moneynum_4 = [
    {value:1247971, name:'螺蛳粉'},
    {value:8364325, name:'过桥米线'},
    {value:1785343, name:'其他米粉'},
    {value:1480393, name:'桂林米粉'},
    
    
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
        text: '成交额',
        x: 'center',
        y:'0%',
        textStyle: {
            color: '#fff',
            fontSize: 16,
        },
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c}元 ({d}%)"
    },
    // legend: {
        
    //     // x: 'middle',
    //     // y:'bottom'

    //     icon: 'circle',
    //     bottom: '20%',
    //     itemWidth: 12,
    //     itemHeight: 12,
    //     textStyle:{
    //         color: '#90979c'

    //     },
    //     data:['A','B','C',]
    // },

    series: [
        {
            name:'成交额',
            type:'pie',
            color: [ '#deb140', '#49dff0', '#034079', '#6f81da', '#00ffb4',],
            startAngle: 200,
            selectedMode: 'single',
            //center:['300','330'],
            center:['50%','55%'],
            radius: [0, '80%'],
            //color: ['#EE3B3B','#1c6d90', '#09895a',],
            label: {
                normal: {
                    //position: 'inner',
                    show:true,
                    position: 'inner',
                    formatter: '{b}'//\n{d}%'
                }
            },
            labelLine: {
                normal: {
                    show: false,
                    length:0.5,
                }
            },
            data:Moneynum_4,
        },
        // {
        //     name:'成交额',
        //     type:'pie',
        //     radius: ['60%', '80%'],
        //     center:['50%','55%'],
        //     //center:['300','330'],
        //     color: ['#FF8888','#FF3333','#CC0000','#9acfe8','#56afd8','#1a8fc5', '#96dcc3', '#5ac59e', '#439476', '#346654'],
        //     label: {
        //         normal: {
        //             show:false,
        //             position: 'inner',
        //             formatter: '{b}'//\n  {c} ({d}%)'
        //         }
        //     },
        //     labelLine:{
        //         normal:{

        //             show:false
        //         },
        //     },
        //     data:Moneynum_9,
        // }
    ]
};


doublePieMoneyChart.setOption(doublePieMoneyOption);