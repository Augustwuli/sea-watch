import React, { Component } from 'react'
import { Menu } from 'element-react'
import 'element-theme-default'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title' 
import 'echarts/lib/chart/bar'
export default class Display extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  selectItem (index, indexPath) {
    console.log(index, indexPath)
  }
  componentDidMount () {
    const { BMap } = window 
    let map = new BMap.Map("container");
    // 创建地图实例  
    let point = new BMap.Point(119.5239453291,25.1890781656);
    // 创建点坐标  
    map.centerAndZoom(point, 8);
    // 初始化地图，设置中心点坐标和地图级别  
    map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
    let myChart = echarts.init(document.getElementById('content'));
    myChart.setOption({
      title: { text: 'ECharts 入门示例' },
      tooltip: {},
      xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
      },
      yAxis: {},
      series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
      }]
  });
  }
  render () {
    return (
      <div className="display-page">
        <Menu mode="vertical" theme="dark" defaultActive="1" onSelect={this.selectItem}>
          <Menu.ItemGroup title="观测设备">
            <Menu.Item index="1">大浮标</Menu.Item>
            <Menu.Item index="2">小浮标</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="观测要素">
            <Menu.Item index="3">风力</Menu.Item>
            <Menu.Item index="4">浪高</Menu.Item>
            <Menu.Item index="5">气温</Menu.Item>
            <Menu.Item index="6">水温</Menu.Item>
          </Menu.ItemGroup>
        </Menu>
        <div id="container"></div> 
        <div className="charts">
          <div id="content" style={{ width: 400, height: 400 }}></div>
        </div>
      </div>
    )
  }
}