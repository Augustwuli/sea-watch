import React, { Component } from 'react'
import { Menu, Loading, Table } from 'element-react'
import 'element-theme-default'
import Map from '@/coms/map'
import Chart from '@/coms/chart'
import Api from '@/tool/api'

export default class Display extends Component {
  constructor (props) {
    super(props)
    this.selectItem = this.selectItem.bind(this)
    this.state = {
      columns:[
        {
          label: '站点名称',
          prop: 'name'
        },
        {
          label: '平均风速',
          prop: 'ava'
        }
      ],
      data:[
        {
          name: '2号浮标',
          ava: '2'
        },
        {
          name: '2号浮标',
          ava: '2'
        }
      ],
      loading: false,
      title: '4号标 三天曲线过程',
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
    this.setState({
      loading: false
    },function(){
      console.log(this.state.loading)
    })
    let params = {
      type: '1'
    };
    Api.get('positions', params, r => {
      this.setState({
        list: r.data.list,
        type: index,
        loading: true
      },function(){
        console.log('getdata'+this.state.list+this.state.type+this.state.loading)
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
        list: r.data.list,
        loading: true
      },function(){
        console.log('getdata'+this.state.list,this.state.loading)
      })
    })
  }
  componentWillMount () {
    this.getData()
  }
  componentDidMount () {
  //   let myChart = echarts.init(document.getElementById('content'));
  //   myChart.setOption({
  //     title: { text: 'ECharts 入门示例' },
  //     tooltip: {},
  //     xAxis: {
  //         data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
  //     },
  //     yAxis: {},
  //     series: [{
  //         name: '销量',
  //         type: 'bar',
  //         data: [5, 20, 36, 10, 10, 20]
  //     }]
  // });
  }
  render () {
    let { loading } = this.state;
    let map = null;
    if (loading) {
      map = <Map list={this.state.list} type={this.state.type}/>;
    } else {
      map = <Loading className="load" text="拼命加载中"/>;
    }
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
        {map}
        <div className="charts">
          <div className="title">{this.state.title}</div>
          <div style={{marginTop:50+'px'}}></div>
          {/* <div className="subtitle">有效浪高</div> */}
          {/* <Chart></Chart> */}
          <Table data={this.state.data} columns={this.state.columns} border="true" stripe="true"></Table>
        </div>
      </div>
    )
  }
}