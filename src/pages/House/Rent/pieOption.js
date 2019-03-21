var scalePie = 0.5;

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

export default {
  option: {
    title: {
      text:'外卖标签分类',
      left:'center',
      top: '47%',
      right: '10%',
      padding:[24,0],
      textStyle:{
        color:'#fff',
        fontSize: 30 * scalePie,
        align:'center'
      }
    }
  },
  legendOption: {
    selectedMode:false,
    left: 'center',
    top: '43%',
    icon: 'none',
    align:'center',
    textStyle: {
      color: "#fff",
      fontSize: 14 * scalePie,
      rich: rich
    },
  },
  seriesOption: {
    name: '外卖标签分类',
    type: 'pie',
    center:['50%','50%'],
    //roseType : 'radius',
    radius: ['47%', '75%'],
    hoverAnimation: true,
    minAngle: 4,
    startAngle: 200,
    color: ['#c487ee', '#deb140', '#49dff0', '#034079', '#6f81da', '#00ffb4'],
    label: {
      normal: {
        //lineHeight:10000,
        fontSize:12,
      },
      emphasis: {
        rich: rich
      },
    },
    labelLine: {
      show:true,
      normal: {
        length: 5 * scalePie,
        //length2: 0,
        lineStyle: {
          color: '#0b5263'
        }
      },
      emphasis: {
        length: 50 * scalePie,
        length2: 80,
        lineStyle: {
          color: '#0b5263'
        }
      },
    }
  }
}
