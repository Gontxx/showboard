var rateBarContainer = document.getElementById('rate-bar');

//用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
function resizeRateBarContainer () {
    rateBarContainer.style.width = (window.innerWidth * 0.4 - 20) +'px';
    rateBarContainer.style.height = (window.innerHeight * 0.4 - 12) + 'px';
}
//设置容器高宽
resizeRateBarContainer();


var rateBarChart = echarts.init(rateBarContainer);
//------------------------------------引用请注明出处

var  salesdata = [990, 1460, 1264, 791, 904, 1080, 995, 972, 1034];
var orderdata = [16549, 28585, 30504, 15982, 19176, 20780, 18982, 18612, 19590];
var namedata = ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3'];


rateBarOption = {
        //backgroundColor: '#031f2d',
        title: {
            text:'各评级外卖平均情况', 
            x: 'center',
            y:'0%',
            textStyle: {
                color: '#fff',
                fontSize: 16,
            },
        },
        tooltip: {
            show: true,
            trigger: 'item',
            formatter: '{b}<br/>{a}: {c}',
            axisPointer: {
                type: 'shadow',
            }
        },
        grid: [{
            show: false,
            left: '4%',
            top: '22%',
            bottom: '0%',
            containLabel: true,
            width: '40%',
        }, {
            show: false,
            left: '52%',
            top: '28%',
            bottom: '0%',
            width: '0%',
        }, {
            show: false,
            right: '4%',
            top: '22%',
            bottom: '0%',
            containLabel: true,
            width: '40%',
        }, ],
        xAxis: [
            {
            type: 'value',
            name :'平均订单数',
            "splitNumber":4,
            nameLocation:'center',
            nameGap:30,
            nameTextStyle:{
                color: '#B2B2B2',
                fontSize: 14,
            },
            inverse: true,
            position: 'top',
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#B2B2B2',
                    fontSize: 12,
                },
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#1F2022',
                    width: 1,
                    type: 'solid',
                },
            },
        }, {
            gridIndex: 1,
            show: false,
        }, {
            gridIndex: 2,
            name :'平均每单价格',
            nameLocation:'center',
            nameGap:30,
            nameTextStyle:{
                color: '#B2B2B2',
                fontSize: 14,
            },
            type: 'value',
            position: 'top',
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#B2B2B2',
                    fontSize: 12,
                },
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#1F2022',
                    width: 1,
                    type: 'solid',
                },
            },
        }, ],
        yAxis: [{
            type: 'category',
            inverse: true,
            position: 'right',
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: false,
                margin: 8,
                textStyle: {
                    color: '#9D9EA0',
                    fontSize: 12,
                },

            },
            data: namedata,
        }, {
            gridIndex: 1,
            type: 'category',
            inverse: true,
            position: 'left',
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#9D9EA0',
                    fontSize: 12,
                },

            },
            data: namedata.map(function(value) {
                return {
                    value: value,
                    textStyle: {
                        align: 'center',
                    }
                }
            }),
        }, {
            gridIndex: 2,
            type: 'category',
            inverse: true,
            position: 'left',
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: false,
                textStyle: {
                    color: '#9D9EA0',
                    fontSize: 12,
                },
            },
            data: namedata,
        }, ],
        series: [{
                name: '平均订单数',
                type: 'bar',
                //barGap: 20,
                //barWidth: 20,
                label: {
                    normal: {
                        show: false,
                    },
                    emphasis: {
                        show: true,
                        position: 'left',
                        offset: [0, 0],
                        textStyle: {
                            color: '#fff',
                            fontSize: 14,
                        },
                    },
                },
                itemStyle: {
                    normal: {
                        color: '#659F83',
                        barBorderRadius: 15
                    },
                    emphasis: {
                        color: '#08C7AE',
                        barBorderRadius: 15
                    },
                },
                
                data: orderdata,
            },
            {
                name: '平均每单价格',
                type: 'bar',
                //barGap: 20,
                //barWidth: 20,
                xAxisIndex: 2,
                yAxisIndex: 2,
                label: {
                    normal: {
                        show: false,
                    },
                    emphasis: {
                        show: true,
                        position: 'right',
                        offset: [0, 0],
                        textStyle: {
                            color: '#fff',
                            fontSize: 14,
                        },
                    },
                },
                itemStyle: {
                    normal: {
                        color: '#F68989',
                        barBorderRadius: 15
                    },
                    emphasis: {
                        color: '#F94646',
                        barBorderRadius: 15
                    },
                },
                data: salesdata,
            }
        ]
};

    
rateBarChart.setOption(rateBarOption);
