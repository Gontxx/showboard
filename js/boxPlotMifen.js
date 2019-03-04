var boxPlotRateOrderContainer = document.getElementById('box-plot-mifen');

//用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
function resizeboxPlotRateOrderContainer () {
    boxPlotRateOrderContainer.style.width = (window.innerWidth * 0.5 - 20) +'px';
    boxPlotRateOrderContainer.style.height = (window.innerHeight * 0.35 - 12) + 'px';
}
//设置容器高宽
resizeboxPlotRateOrderContainer();


var boxPlotRateOrderChart = echarts.init(boxPlotRateOrderContainer);
//------------------------------------引用请注明出处

pricelist = [[21, 17, 19, 26, 13, 18, 16, 21, 15, 16, 16, 14, 23, 17, 21, 15, 16, 12, 21, 17, 23, 20, 12, 21, 16, 18, 27, 49, 17, 12, 16, 19, 12, 22, 17, 16, 27], [22, 16, 14, 18, 20, 28, 16, 21, 15, 13, 14, 25, 18, 18, 28, 28, 27, 23, 21, 17, 20, 17, 14, 13, 18, 25, 12, 16, 13, 18, 14, 15, 13, 17, 15, 17, 27, 19, 15, 18, 14, 12, 12, 14, 16, 14, 22, 15, 16, 14, 22, 12, 27, 24, 16, 13, 14, 15, 12, 15, 14, 17, 16, 27, 15, 22, 22, 17, 14, 23, 19, 19, 20, 24, 23, 17, 15, 17, 17, 18, 13, 15, 16, 18, 22, 23, 19, 22, 14, 22, 14, 17, 23, 18, 100, 100, 17, 27, 17, 13, 18, 16, 22, 16, 14, 15, 22, 22, 14, 18, 18, 18, 19, 17, 17, 14, 15, 18, 13, 16, 18, 19, 18, 14, 18, 18, 19, 20, 22, 22, 13, 16, 18, 24, 20, 23, 26, 11, 21, 24, 23, 21, 20, 20, 19, 20, 22, 19, 22, 20, 22, 25, 23, 26, 27, 22, 16, 20, 100, 18, 20, 20, 18, 24, 100, 22, 100, 18, 100, 26, 21, 35, 26, 22, 29, 19, 22, 18, 23, 22, 27, 20, 25, 17, 21, 24, 25, 20, 20, 27, 18, 18, 22, 26, 19, 26, 19, 23, 20, 18, 27, 24, 27, 18, 24, 19, 26, 27, 26, 27, 17, 23, 26, 23, 15, 28, 16, 28, 23, 26, 26, 23, 24, 15, 18, 19, 26, 29, 25, 25, 16, 27, 26, 26, 18, 31, 26, 100, 17, 23, 32, 16, 18, 31, 15, 25, 23, 17, 16, 26, 16, 15, 14, 16, 13, 19, 17, 20, 16, 17, 21, 20, 20, 16, 12, 16, 17, 18, 20, 18, 14, 16, 18, 15, 17, 14, 16, 13, 14, 23, 16, 18, 14, 23, 14, 15, 16, 15, 14, 13, 17, 18, 13, 17, 14, 18, 20, 19, 18, 15, 14, 15, 11, 23, 21, 38, 21, 20, 16, 19, 14, 14, 17, 17, 13, 16, 16, 15, 18, 15, 22, 14, 16, 15, 16, 18, 13, 18, 15, 22, 14, 28, 21, 14, 14, 12, 14, 16, 20, 17, 15, 20, 25, 100, 24, 16, 18, 17, 22, 14, 23, 27, 20, 24, 18, 19, 28, 24, 21, 21, 18, 16, 16, 18, 24, 19, 19, 17, 16, 16, 18, 14, 27, 17, 22, 18, 16, 20, 17, 16, 14, 100, 19, 24, 22, 17, 16, 15, 17, 17, 22, 26, 26, 16, 12, 26, 26, 24, 25, 26, 21, 15, 24, 25, 23, 22, 100, 20, 24, 100, 23, 25, 25, 20, 26, 26, 26, 20, 21, 23, 25, 22, 19, 19, 16, 100, 25, 25, 20, 25, 24, 25, 25, 23, 26, 25, 25, 25, 17, 15, 18, 15, 14, 14, 22, 21, 22, 14, 21, 24, 18, 24, 23, 22, 27, 24, 23, 100, 22, 23, 23, 25, 27, 100, 100, 23, 26, 19, 22, 26, 24, 23, 24, 25, 24, 23, 31, 17, 35, 25, 32, 23, 26, 20, 28, 26, 26, 100, 14, 20, 25, 22, 21, 25, 25, 25, 100, 23, 19, 28, 20, 23, 22, 19, 23, 100, 25], [15, 20, 15, 15, 16, 17, 25, 13, 24, 18, 16, 15, 15, 16, 21, 22, 16, 15, 15, 15, 15, 21, 22, 18, 18, 18, 100, 15, 15, 100, 18, 15, 15, 22, 21, 15, 15, 21, 15, 13, 17, 24, 22, 16, 100, 16, 21, 22, 23, 15, 19, 22, 22, 24, 31, 15, 15, 17, 17, 17, 20, 28, 16, 15, 19, 19, 15, 16, 17, 15, 15, 15, 19, 16, 15, 17, 16, 17, 17, 25, 27, 24, 24, 21, 27, 23, 21, 26, 21, 21, 20, 22, 15, 22, 20, 22, 28, 29, 100, 28, 37, 32, 27, 22, 19, 22, 19], [13, 13, 13, 14, 16, 21, 16, 15, 18, 18, 18, 18, 16, 18, 13, 13, 17, 18, 22, 18, 18, 20, 18, 21, 16, 18, 19, 20, 15, 15, 18, 18, 17, 19, 18, 100, 100, 17, 17, 17, 14, 18, 17, 27, 25, 25, 18, 18, 14, 19, 17, 12, 23, 18, 19, 18, 19, 18, 19, 16, 17, 22, 21, 16, 15, 18, 14, 19, 23, 23, 28]]
namedata = ['螺蛳粉', '过桥米线', '其他米粉', '桂林米粉']
var data = echarts.dataTool.prepareBoxplotData(pricelist);

boxPlotRateOrderOption = {
    title: [
        {
            text: '各类别单价分布',
            left: 'center',
            x: 'center',
            y:'0%',
            textStyle: {
                color: '#fff',
                fontSize: 16,
            },
        },

    ],

    tooltip: {
        trigger: 'item',
        axisPointer: {
            type: 'shadow'
        }
    },
    grid: {
        left: '10%',
        right: '5%',
        bottom: '10%'
    },
    xAxis: {
        type: 'category',
        data: namedata,
        boundaryGap: true,
        nameGap: 30,
        nameTextStyle:{
                color: '#B2B2B2',
                fontSize: 14,
            },
        axisLine:{
            show: true,
            color: '#fff',
        },
        axisLabel: {
                show: true,
                textStyle: {
                    color: '#B2B2B2',
                    fontSize: 12,
               },
           },
        splitArea: {
            show: false
        },

        splitLine: {
            show: false
        }
    },
    yAxis: {
        type: 'value',
        name: '单价（元）',
        min:10,
        nameTextStyle:{
                color: '#B2B2B2',
                fontSize: 12,
            },
        // splitArea: {
        //     show: true
        // },
        axisLabel: {
                show: true,
                textStyle: {
                    color: '#B2B2B2',
                    fontSize: 12,
                    type: 'solid',
               },
           },
        splitLine: {
                show: true,
                lineStyle: {
                    color: '#B2B2B2',
                    width: 1,
                    type: 'solid',
                },
            },
    },
    series: [
        {
            name: 'boxplot',
            type: 'boxplot',
            data: data.boxData,
            itemStyle:{
                normal:{
                    borderColor: '#fff',
                    color:'#8DB6CD',
                    // function(params) {
                    //     return '#EE3B3B';
                    //     var colorList = ['#EE3B3B','#1c6d90', '#09895a'];
                    //     if (params.dataIndex <= 2) {
                    //         return colorList[0]
                    //     }
                    //     else if (params.dataIndex <= 5) {
                    //         return colorList[1]
                    //     }else {
                    //         return colorList[2]
                    //     }
                    // },
                },
            },
            tooltip: {
                formatter: function (param) {
                    return [
                        '类别： ' + param.name + ': ',
                        'upper: ' + param.data[4],
                        'Q3: ' + param.data[3],
                        'median: ' + param.data[2],
                        'Q1: ' + param.data[1],
                        'lower: ' + param.data[0]
                    ].join('<br/>')
                }
            }
        },
        // {
        //     name: 'outlier',
        //     type: 'scatter',
        //     data: data.outliers
        // }
    ]
};


boxPlotRateOrderChart.setOption(boxPlotRateOrderOption);