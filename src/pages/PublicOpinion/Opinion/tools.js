// tooltips 轮播插件
export function autoShowTooltip (myChart, num, index, time) {
  var count = index
  if (myChart.timer) {
    clearInterval(myChart.timer)
  }
  myChart.timer = setInterval(() => {
    let temp = count
    myChart.dispatchAction({
      type: 'downplay',
      seriesIndex: 0 // serieIndex的索引值   可以触发多个
    })
    myChart.dispatchAction({
      type: 'hideTip',
      seriesIndex: 0 // serieIndex的索引值   可以触发多个
    })
    myChart.dispatchAction({
      type: 'highlight',
      seriesIndex: 0,
      dataIndex: temp
    })
    myChart.dispatchAction({
      type: 'showTip',
      seriesIndex: 0,
      dataIndex: temp
    })
    count++
    if (count >= num) {
      count = 0
    }
  }, time)
  myChart.on('mouseover', (params) => {
    clearInterval(myChart.timer)
    myChart.dispatchAction({
      type: 'downplay',
      seriesIndex: 0
    })
    myChart.dispatchAction({
      type: 'highlight',
      seriesIndex: 0,
      dataIndex: params.dataIndex
    })
    myChart.dispatchAction({
      type: 'showTip',
      seriesIndex: 0,
      dataIndex: params.dataIndex
    })
  })

  myChart.on('mouseout', () => {
    clearInterval(myChart.timer)
    myChart.timer = setInterval(() => {
      myChart.dispatchAction({
        type: 'downplay',
        seriesIndex: 0 // serieIndex的索引值   可以触发多个
      })
      myChart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: count
      })
      myChart.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: count
      })
      count++
      if (count >= num) {
        count = 0
      }
    }, time)
  })
}

export function autoShowSeriesTooltip (myChart, num, index, time) {
  var count = index
  if (myChart.timer) {
    clearInterval(myChart.timer)
  }
  myChart.timer = setInterval(() => {
    let temp = count
    myChart.dispatchAction({
      type: 'downplay',
      seriesIndex: temp // serieIndex的索引值   可以触发多个
    })
    myChart.dispatchAction({
      type: 'hideTip',
      seriesIndex: temp // serieIndex的索引值   可以触发多个
    })
    myChart.dispatchAction({
      type: 'highlight',
      seriesIndex: temp,
      dataIndex: 0
    })
    myChart.dispatchAction({
      type: 'showTip',
      seriesIndex: temp,
      dataIndex: 0
    })
    count++
    if (count >= num) {
      count = 0
    }
  }, time)
  myChart.on('mouseover', (params) => {
    clearInterval(myChart.timer)
    myChart.dispatchAction({
      type: 'downplay'
    })
    myChart.dispatchAction({
      type: 'highlight',
      seriesIndex: params.dataIndex,
      dataIndex: params.dataIndex
    })
    myChart.dispatchAction({
      type: 'showTip',
      seriesIndex: 0,
      dataIndex: params.dataIndex
    })
  })

  myChart.on('mouseout', () => {
    clearInterval(myChart.timer)
    myChart.timer = setInterval(() => {
      myChart.dispatchAction({
        type: 'downplay',
        seriesIndex: count // serieIndex的索引值   可以触发多个
      })
      myChart.dispatchAction({
        type: 'highlight',
        seriesIndex: count,
        dataIndex: 0
      })
      myChart.dispatchAction({
        type: 'showTip',
        seriesIndex: count,
        dataIndex: 0
      })
      count++
      if (count >= num) {
        count = 0
      }
    }, time)
  })
}

export default {
  autoShowTooltip,
  autoShowSeriesTooltip
}
