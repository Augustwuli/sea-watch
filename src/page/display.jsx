import React, { Component } from 'react'
import { Menu, Loading, Table } from 'element-react'
import 'element-theme-default'
import Map from '@/coms/map'
import Chart from '@/coms/chart'
import Api from '@/tool/api'
import { util } from 'node-forge';

export default class Display extends Component {
  constructor (props) {
    super(props)
    this.selectItem = this.selectItem.bind(this)
    this.state = {
      name: '标题',
      charts: [
        {
          title: '风速',
          anchor: [
            {
              name:'2019/01/01 00:00:00',
              value:['2019/01/01 00:00:00', 0]
            },
            {
              name:'2019/01/03 12:00:00',
              value:['2019/01/03 12:00:00', 0]
            }
          ],
          unit: 'm/s',
          lines: [{name:'平均风速',data:[{name:'2019/01/01 02:00:00', value:['2019/01/01 00:12:00', 15]},
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
          {name:'2019/01/02 20:18:20', value:['2019/01/02 20:18:20', 10]}]},{name:'最大风速',data:[{name:'2019/01/01 02:00:00', value:['2019/01/01 00:12:00', 8]},
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
          {name:'2019/01/02 20:18:20', value:['2019/01/02 20:18:20', 11]}]}]
        },
        {
          title: '风速',
          anchor: [
            {
              name:'2019/01/01 00:00:00',
              value:['2019/01/01 00:00:00', 0]
            },
            {
              name:'2019/01/03 12:00:00',
              value:['2019/01/03 12:00:00', 0]
            }
          ],
          unit: 'm/s',
          lines: [{name:'平均风速',data:[{name:'2019/01/01 02:00:00', value:['2019/01/01 00:12:00', 15]},
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
          {name:'2019/01/02 20:18:20', value:['2019/01/02 20:18:20', 10]}]},{name:'最大风速',data:[{name:'2019/01/01 02:00:00', value:['2019/01/01 00:12:00', 8]},
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
          {name:'2019/01/02 20:18:20', value:['2019/01/02 20:18:20', 11]}]}]
        }
      ],
      columns:[
        {
          label: '站点名称',
          prop: 'name'
        },
        {
          label: '平均风速（m/s）',
          prop: 'ava'
        },
        {
          label: '最大风速（m）',
          prop: 'max'
        },
        {
          label: '风向',
          prop: 'direction'
        },
        {
          label: '风力等级',
          prop: 'scale'
        },
        {
          label: '时间',
          prop: 'date'
        }
      ],
      data:[
        {
          name: '2号浮标',
          ava: '2',
          max: '5',
          direction: '东北',
          scale: '7',
          date: '01/04 08:30'
        },
        {
          name: '2号浮标',
          ava: '2',
          max: '5',
          direction: '东北',
          scale: '7',
          date: '01/04 08:30'
        },
        {
          name: '2号浮标',
          ava: '2',
          max: '5',
          direction: '东北',
          scale: '7',
          date: '01/04 08:30'
        },
        {
          name: '2号浮标',
          ava: '2',
          max: '5',
          direction: '东北',
          scale: '7',
          date: '01/04 08:30'
        },
      ],
      loading: false,
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
    if (index === '1' || index === '2'){
      this.setState({
        loading: false
      },function(){
        console.log(this.state.loading)
      })
      let params = {
        type: index
      };
      Api.get('flags', params, r => {
        this.setState({
          list: r.data.list,
          type: index,
          loading: true
        },function(){
          console.log('getdata'+this.state.list+this.state.type+this.state.loading)
        })
      })
    } else {
      let params = {
        type: index
      };
      Api.get('factors', params, r => {
        this.setState({
          columns: r.data.table.columns,
          type: index,
          data: r.data.table.data,
        },function(){
          console.log('getdata'+this.state.columns+this.state.data+this.state.type);
        })
      })
    }
   
  }
  getData () {
    let params = {
      type: '1'
    };
    Api.get('flags', params, r => {
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
  }
  render () {
    let { loading, charts } = this.state;
    let map = null;
    let dom = null;
    if (loading) {
      map = <Map list={this.state.list} type={this.state.type}/>;
    } else {
      map = <Loading className="load" text="拼命加载中"/>;
    }
    if (charts.length !==0 ){
      dom = charts.map((i,k)=>{
        return (
          <div className="chartInfo" key={k}>
            <div className="subtitle">{i.title}</div>
            <Chart id={`content${k}`} title={i.unit} anchor={i.anchor} lines={i.lines}></Chart>
          </div>
        )
      })
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
          <div className="title">{this.state.name}</div>
          <div style={{marginTop:50+'px'}}></div>
          {dom}
          {/* <Chart charts={this.state.charts}></Chart> */}
          {/* <Table data={this.state.data} columns={this.state.columns} border="true" stripe="true"></Table> */}
        </div>
      </div>
    )
  }
}