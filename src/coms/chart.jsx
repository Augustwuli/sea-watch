import React, { Component } from 'react';
import echarts from 'echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/toolbox';
export default class Chart extends Component{
  componentDidMount () {
    let myChart = echarts.init(document.getElementById('content'));
    let first = [
      {name:'2019/01/01 02:00:00', value:['2019/01/01 00:12:00', 15]},
      {name:'2019/01/01 06:00:00', value:['2019/01/01 06:00:00', 10]},
      {name:'2019/01/01 12:18:18', value:['2019/01/01 12:18:18', 20]},
      {name:'2019/01/01 15:18:20', value:['2019/01/01 15:18:20', 10]},
      {name:'2019/01/01 18:18:18', value:['2019/01/01 18:18:18', 12]},
      {name:'2019/01/01 20:18:20', value:['2019/01/01 20:18:20', 10]},
      {name:'2019/01/02 00:00:20', value:['2019/01/02 00:00:20', 15]},
      {name:'2019/01/02 02:00:00', value:['2019/01/02 00:12:00', 15]},
      {name:'2019/01/02 06:00:00', value:['2019/01/02 06:00:00', 10]},
      {name:'2019/01/02 12:18:18', value:['2019/01/02 12:18:18', 20]},
      {name:'2019/01/02 15:18:20', value:['2019/01/02 15:18:20', 10]},
      {name:'2019/01/02 18:18:18', value:['2019/01/02 18:18:18', 12]},
      {name:'2019/01/02 20:18:20', value:['2019/01/02 20:18:20', 10]},
    ];
    let second = [
      {name:'2019/01/01 02:00:00', value:['2019/01/01 00:12:00', 8]},
      {name:'2019/01/01 06:00:00', value:['2019/01/01 06:00:00', 20]},
      {name:'2019/01/01 12:18:18', value:['2019/01/01 12:18:18', 10]},
      {name:'2019/01/01 15:18:20', value:['2019/01/01 15:18:20', 20]},
      {name:'2019/01/01 18:18:18', value:['2019/01/01 18:18:18', 15]},
      {name:'2019/01/01 20:18:20', value:['2019/01/01 20:18:20', 11]},
      {name:'2019/01/02 00:00:20', value:['2019/01/02 00:00:20', 15]},
      {name:'2019/01/02 02:00:00', value:['2019/01/02 00:12:00', 15]},
      {name:'2019/01/02 06:00:00', value:['2019/01/02 06:00:00', 15]},
      {name:'2019/01/02 12:18:18', value:['2019/01/02 12:18:18', 12]},
      {name:'2019/01/02 15:18:20', value:['2019/01/02 15:18:20', 16]},
      {name:'2019/01/02 18:18:18', value:['2019/01/02 18:18:18', 17]},
      {name:'2019/01/02 20:18:20', value:['2019/01/02 20:18:20', 11]},
    ]
    let anchor = [
      {name:'2019/01/01 00:00:00', value:['2019/01/01 00:00:00', 0]},
      {name:'2019/01/03 12:00:00', value:['2019/01/03 12:00:00', 0]}
      ];
    myChart.setOption({
      title: {
        text: '单位：m/s'
      },
      legend: {
        data:['平均风速','最大风速']
      },
      tooltip: {
        trigger: 'axis',
        formatter: function (params) {
          params = params[0];
          var date = new Date(params.name);
          return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear() + ' : ' + params.value[1];
        },
        axisPointer: {
            animation: false
        }
      },
      xAxis: {
        type: 'time',
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        splitLine: {
          show: true
        }
      },
      series: [
      {
        name: '平均风速',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        data: first
      },
      {
        name: '最大风速',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        data: second
      },
      {
        name:'.anchor',
        type:'line', 
        showSymbol:false, 
        data:anchor,
        itemStyle:{normal:{opacity:0}},
        lineStyle:{normal:{opacity:0}}
      }]
    });
  }
  render () {
    return (
      <div id="content" className="chart" style={{ width: 400, height: 400 }}></div>
    )
  }
}