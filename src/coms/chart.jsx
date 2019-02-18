import React, { Component } from 'react';
import echarts from 'echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/toolbox';
export default class Chart extends Component{
  initChart() {
    let { title, lines, id} = this.props;
    let myChart = echarts.init(document.getElementById(id));
    let datas = [];
    let legend = [];
    let series = [];
    if( lines.length !==0 ) {
      for (let i = 0; i < lines.length; i++){
        datas[i] = lines[i].data;
        legend[i] = lines[i].name;
        series[i] = {
          name: legend[i],
          type: 'line',
          showSymbol: false,
          hoverAnimation: false,
          data: datas[i]
        }
      }
    }
    myChart.setOption({
      /**
       * 单位：如单位m/s
       */
      title: {
        text: `单位：${title}`
      },
      /**
       * 两条线代表的意思，如“平均风速”和“最大风速”
       */
      legend: {
        data: legend
      },
      /**
       * 提示文本
       */
      tooltip: {
        trigger: 'axis',
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
        ...series,
      {
        name:'.anchor',
        type:'line', 
        showSymbol:false, 
        // data:anchor,
        itemStyle:{normal:{opacity:0}},
        lineStyle:{normal:{opacity:0}}
      }]
    });
  }

  updateChart (nextProps) {
    let { title, lines, id} = nextProps;
    let myChart = echarts.init(document.getElementById(id));
    let datas = [];
    let legend = [];
    let series = [];
    if( lines.length !==0 ) {
      for (let i = 0; i < lines.length; i++){
        datas[i] = lines[i].data;
        legend[i] = lines[i].name;
        series[i] = {
          name: legend[i],
          type: 'line',
          showSymbol: false,
          hoverAnimation: false,
          data: datas[i]
        }
      }
    }
    myChart.setOption({
      /**
       * 单位：如单位m/s
       */
      title: {
        text: `单位：${title}`
      },
      /**
       * 两条线代表的意思，如“平均风速”和“最大风速”
       */
      legend: {
        data: legend
      },
      /**
       * 提示文本
       */
      tooltip: {
        trigger: 'axis',
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
        ...series,
      {
        name:'.anchor',
        type:'line', 
        showSymbol:false, 
        // data:anchor,
        itemStyle:{normal:{opacity:0}},
        lineStyle:{normal:{opacity:0}}
      }]
    });
  }
  componentWillReceiveProps(nextProps){
    this.updateChart(nextProps)
  }
  componentDidMount () {
    this.initChart();
  }
  render () {
    let { id } = this.props;
    return (
      <div id={id}  className="chart" style={{ width: 500, height: 300 }}></div>
    )
  }
}