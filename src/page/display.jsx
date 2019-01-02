import React, { Component } from 'react'
import { Menu } from 'element-react'
import 'element-theme-default'
import echarts from 'echarts/lib/echarts'
import Map from '@/coms/map'
import Api from '@/tool/api'

import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title' 
import 'echarts/lib/chart/bar'
export default class Display extends Component {
  constructor (props) {
    super(props)
    this.selectItem = this.selectItem.bind(this)
    this.state = {
      type: '1',
      list: [
        {
          id: '1',
          title: '1号浮标',
          long: 120.164244,
          lat: 24.991759
        },
        {
          id: '2',
          title: '2号浮标',
          long: 119.888285,
          lat: 24.655936
        },
        {
          id: '3',
          title: '3号浮标',
          long: 118.131343,
          lat: 23.744665
        }
      ]
    }
  }
  selectItem (index,indexPath) {
    console.log('index'+index)
    let params = {
      type: '1'
    };
    Api.get('positions', params, r => {
      this.setState({
        list: r.data.list,
        type: index
      },function(){
        console.log('getdata'+this.state.list+this.state.type)
      })
    })
    // this.setState({
    //   type: index
    // },() => {
    //   console.log(this.state.type)
    // })
  }
  getData () {
    let params = {
      type: '1'
    };
    Api.get('positions', params, r => {
      this.setState({
        list: r.data.list
      },function(){
        console.log('getdata'+this.state.list)
      })
    })
  }
  componentWillMount () {
    this.getData()
  }
  componentDidMount () {
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
        <Menu mode="vertical" theme="dark" onSelect={this.selectItem}>
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
        <Map list={this.state.list} type={this.state.type}></Map>
        <div className="charts">
          <div id="content" style={{ width: 400, height: 400 }}></div>
        </div>
      </div>
    )
  }
}