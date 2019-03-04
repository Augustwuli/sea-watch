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
      // longitude: 119.5239453291,
      // latitude: 25.1890781656,
      name: '4号标',
      wcolumns:[
        {
          label: '站点名称',
          prop: 'STNM'
        },
        {
          label: '平均风速（m/s）',
          prop: 'FS'
        },
        {
          label: '最大风速（m/s）',
          prop: 'ZDFS'
        },
        {
          label: '风向',
          prop: 'FX'
        },
        {
          label: '风力等级',
          prop: 'FL'
        },
        {
          label: '时间',
          prop: 'TIMESTR'
        }
      ],
      wecolumns:[
        {
          label: '站点名称',
          prop: 'STNM'
        },
        {
          label: '有效波高（m）',
          prop: 'YXBG'
        },
        {
          label: '最大波高（m）',
          prop: 'ZDBG'
        },
        {
          label: '浪级',
          prop: 'LJ'
        },
        {
          label: '时间',
          prop: 'TIMESTR'
        }
      ],
      tcolumns:[
        {
          label: '站点名称',
          prop: 'STNM'
        },
        {
          label: '气温（℃）',
          prop: 'QW'
        },
        {
          label: '时间',
          prop: 'TIMESTR'
        }
      ],
      wtcolumns: [
        {
          label: '站点名称',
          prop: 'STNM'
        },
        {
          label: '水温（℃）',
          prop: 'SW'
        },
        {
          label: '时间',
          prop: 'TIMESTR'
        }
      ],
      data:[],
      loading: false,
      type: '1',
      list: [],
      wline:[], //风速
      weline:[],//浪高
      tline:[], //气温
      wtline:[],//水温
      pline:[], //气压

      sline:[], //盐度
      phline:[],//PH
      oline:[], //溶解氧
      tuline:[],//浊度
      chline:[],//叶绿素
    }
  }
  selectItem (index,indexPath) {
    this.setState({
      loading: false
    },function(){
      console.log(this.state.loading)
    })
    console.log('index'+index)
    if (index === '1'){
      let params = {
        flag: "get_emlines",
        itype: "大浮标"
      };
      Api.post('floatManage/findBigFloat', params, r => {
        this.setState({
          list: r.m_data.features,
          type: '1',
          loading: true,
          name: '4号标'
        },function(){
          console.log('getdata'+this.state)
        })
      })
    }else if (index === '2') {
      let params = {
        flag: "get_stcds",
        itype: "小浮标"
      };
      Api.post('floatManage/findCommon', params, r => {
        this.setState({
          list: r.m_data.features,
          type: '2',
          loading: true,
        },function(){
          console.log('getdata'+this.state)
        })
      })
    } else if (index === '3') {
      let params = {
        flag: "Get_EmNewDATA",
        itype: "wind"
      };
      Api.post('floatManage/findCommon', params, r => {
        this.setState({
          list: r.tb_data,
          type: '3',
          loading: true,
        },function(){
          console.log('getdata'+this.state)
        })
      })
    }else if (index === '4') {
      let params = {
        flag: "Get_EmNewDATA",
        itype: "wave"
      };
      Api.post('floatManage/findCommon', params, r => {
        this.setState({
          list: r.tb_data,
          type: '4',
          loading: true,
        },function(){
          console.log('getdata'+this.state)
        })
      })
    }else if (index === '5') {
      let params = {
        flag: "Get_EmNewDATA",
        itype: "temp"
      };
      Api.post('floatManage/findCommon', params, r => {
        this.setState({
          list: r.tb_data,
          type: '5',
          loading: true,
        },function(){
          console.log('getdata'+this.state)
        })
      })
    }
    else if (index === '6') {
      let params = {
        flag: "Get_EmNewDATA",
        itype: "water"
      };
      Api.post('floatManage/findCommon', params, r => {
        this.setState({
          list: r.tb_data,
          type: '6',
          loading: true,
        },function(){
          console.log('getdata'+this.state)
        })
      })
    }
  }
  getData () {
    let params = {
      flag: "get_emlines",
      itype: "大浮标"
    };
    Api.post('floatManage/findBigFloat', params, r => {
      this.setState({
        list: r.m_data.features,
        loading: true,
      },function(){
        console.log('getdata'+this.state)
      })
    })
  }

  getWLine (id, flag, itype) {
    let params = {
      flag: flag,
      itype: itype,
      id: id,
      element1: "PJFS",
      element2: "ZDFS",
      element3: "",
      elementN1: "平均风速",
      elementN2: "最大风速",
      elementN3: ""
    }
    Api.post('floatManage/findFloatMonitor', params, r => {
      this.setState({
        wline: r.lines,
      },function(){
        console.log('getdata'+this.state)
      })
    })
  }

  getWeLine (id, flag, itype) {
    let params = {
        flag: flag,
        itype: itype,
        id: id,
        element1: "YXLG",
        element2: "ZDLG",
        element3: "",
        elementN1: "有效浪高",
        elementN2: "最大浪高",
        elementN3: ""
    }
    Api.post('floatManage/findFloatMonitor', params, r => {
      this.setState({
        weline: r.lines,
      },function(){
        console.log('getdata'+this.state)
      })
    }) 
  }

  getTLine (id, flag, itype) {
    let params = {
      flag: flag,
      itype: itype,
      id: id,
      element1: "QW",
      element2: "",
      element3: "",
      elementN1: "气温",
      elementN2: "",
      elementN3: ""
  }
  Api.post('floatManage/findFloatMonitor', params, r => {
    this.setState({
      tline: r.lines,
    },function(){
      console.log('getdata'+this.state)
    })
  })
  }

  getWTLine (id, flag, itype) {
    let params = {
      flag: flag,
      itype: itype,
      id: id,
      element1: "BCSW",
      element2: "",
      element3: "",
      elementN1: "水温",
      elementN2: "",
      elementN3: ""
  }
    Api.post('floatManage/findFloatMonitor', params, r => {
      this.setState({
        wtline: r.lines,
      },function(){
        console.log('getdata'+this.state)
      })
    })
  }

  getPLine (id, flag, itype) {
    let params = {
      flag: flag,
      itype: itype,
      id: id,
      element1: "QY",
      element2: "",
      element3: "",
      elementN1: "气压",
      elementN2: "",
      elementN3: ""
  }
    Api.post('floatManage/findFloatMonitor', params, r => {
      this.setState({
        pline: r.lines,
      },function(){
        console.log('getdata'+this.state)
      })
    })
  }

  getSLine (id) {
    let params = {
      flag: "get_emlines",
      itype: "浮标",
      id: id,
      element1: "YD",
      element2: "",
      element3: "",
      elementN1: "盐度",
      elementN2: "",
      elementN3: ""
  }
    Api.post('floatManage/findFloatMonitor', params, r => {
      this.setState({
        sline: r.lines,
      },function(){
        console.log('getdata'+this.state)
      })
    })
  }

  getPHLine (id) {
    let params = {
      flag: "get_emlines",
      itype: "浮标",
      id: id,
      element1: "PH",
      element2: "",
      element3: "",
      elementN1: "PH",
      elementN2: "",
      elementN3: ""
  }
    Api.post('floatManage/findFloatMonitor', params, r => {
      this.setState({
        phline: r.lines,
      },function(){
        console.log('getdata'+this.state)
      })
    })
  }

  getOLine (id) {
    let params = {
      flag: "get_emlines",
      itype: "浮标",
      id: id,
      element1: "RJY",
      element2: "",
      element3: "",
      elementN1: "溶解氧",
      elementN2: "",
      elementN3: ""
  }
    Api.post('floatManage/findFloatMonitor', params, r => {
      this.setState({
        oline: r.lines,
      },function(){
        console.log('getdata'+this.state)
      })
    })
  }

  getTuLine (id) {
    let params = {
      flag: "get_emlines",
      itype: "浮标",
      id: id,
      element1: "ZD",
      element2: "",
      element3: "",
      elementN1: "浊度",
      elementN2: "",
      elementN3: ""
  }
    Api.post('floatManage/findFloatMonitor', params, r => {
      this.setState({
        tuline: r.lines,
      },function(){
        console.log('getdata'+this.state)
      })
    })
  }

  getCHLine (id) {
    let params = {
      flag: "get_emlines",
      itype: "浮标",
      id: id,
      element1: "YLS",
      element2: "",
      element3: "",
      elementN1: "叶绿素",
      elementN2: "",
      elementN3: ""
  }
    Api.post('floatManage/findFloatMonitor', params, r => {
      this.setState({
        chline: r.lines,
      },function(){
        console.log('getdata'+this.state)
      })
    })
  }

  componentWillMount () {
    this.getData()
    let {type} = this.state;
    if (type === '1') {
      this.getWLine("23", "get_emlines", "大浮标")
      this.getWeLine("23", "get_emlines", "大浮标")
      this.getTLine("23", "get_emlines", "大浮标")
      this.getWTLine("23", "get_emlines", "大浮标")
      this.getPLine("23", "get_emlines", "大浮标")
    } else if (type === '2'){
      this.getWLine("23", "get_emlines", "浮标")
      this.getWeLine("23", "get_emlines", "浮标")
      this.getTLine("23", "get_emlines", "浮标")
      this.getWTLine("23", "get_emlines", "浮标")
      this.getPLine("23", "get_emlines", "浮标")

      this.getSLine("23")
      this.getPHLine("23")
      this.getOLine("23")
      this.getTuLine("23")
      this.getCHLine("23")
    }
  }
  componentDidMount () {
  }

  clickRow =(row) =>{
    let {type} = this.state;
    this.setState({
      name: row.STNM,
      // longitude: row.LON,
      // latitude: row.LAT
    }, function(){
      console.log(this.state.name)
    })
    if (type === '3'){
      this.getWLine(row.STCD, "get_emlines", row.PARENT_TYPE)
    } else if (type === '4'){
      this.getWeLine(row.STCD, "get_emlines", row.PARENT_TYPE)
    } else if (type === '5'){
      this.getTLine(row.STCD, "get_emlines", row.PARENT_TYPE)
    } else if (type === '6'){
      this.getWTLine(row.STCD, "get_emlines", row.PARENT_TYPE)
    }
  }

  handPoint =(e,name,itype)=> {
    let {type} = this.state;
    this.setState({
      name: name
    },function(){
      console.log(this.state.name)
    })
    if(type === '1'){
      this.getWLine(e, "get_emlines", itype)  //风速
      this.getWeLine(e, "get_emlines", itype) //浪高
      this.getTLine(e, "get_emlines", itype)  //气温
      this.getWTLine(e, "get_emlines", itype) //水温
      this.getPLine(e, "get_emlines", itype)  //气压
    } else if (type === '2'){
      this.getWLine(e, "get_emlines", itype)
      this.getWeLine(e, "get_emlines", itype)
      this.getTLine(e, "get_emlines", itype)
      this.getWTLine(e, "get_emlines", itype)
      this.getPLine(e, "get_emlines", itype)
      this.getSLine(e)
      this.getPHLine(e)
      this.getOLine(e)
      this.getTuLine(e)
      this.getCHLine(e)
    } else if (type === '3'){
      this.getWLine(e, "get_emlines", itype)
    } else if (type === '4'){
      this.getWeLine(e, "get_emlines", itype)
    } else if (type === '5'){
      this.getTLine(e, "get_emlines", itype)
    } else if (type === '6'){
      this.getWTLine(e, "get_emlines", itype)
    }
  }
  render () {
    let { loading, wline, weline, tline, wtline, pline, sline, phline, oline, tuline, chline, type} = this.state;
    let map = null;
    let dom = null;
    let table = null;
    let title = null;
    if (loading) {
      map = <Map list={this.state.list} type={this.state.type} onPoint={this.handPoint} />;
    } else {
      map = <Loading className="load" text="拼命加载中"/>;
    }
    title = <div className="title">{this.state.name} 曲线过程</div>;
    if (type === '1'){
      dom = 
        <div>
          <div className="chartInfo">
          <div className="subtitle">平均风速</div>
            <Chart id={`content1`} title={'m/s'} lines={wline}></Chart>
          </div>
          <div className="chartInfo">
            <div className="subtitle">有效浪高</div>
            <Chart id={`content2`} title={'m'} lines={weline}></Chart>
          </div>
          <div className="chartInfo">
            <div className="subtitle">气温</div>
            <Chart id={`content3`} title={'℃'} lines={tline}></Chart>
          </div>
          <div className="chartInfo">
            <div className="subtitle">水温</div>
            <Chart id={`content4`} title={'℃'} lines={wtline}></Chart>
          </div>
          <div className="chartInfo">
            <div className="subtitle">气压</div>
            <Chart id={`content5`} title={'hPa'} lines={pline}></Chart>
          </div>
        </div>      
    } else if (type === '2') {
      dom = 
        <div>
          <div className="chartInfo">
          <div className="subtitle">平均风速</div>
            <Chart id={`content1`} title={'m/s'} lines={wline}></Chart>
          </div>
          <div className="chartInfo">
            <div className="subtitle">有效浪高</div>
            <Chart id={`content2`} title={'m'} lines={weline}></Chart>
          </div>
          <div className="chartInfo">
            <div className="subtitle">气温</div>
            <Chart id={`content3`} title={'℃'} lines={tline}></Chart>
          </div>
          <div className="chartInfo">
            <div className="subtitle">水温</div>
            <Chart id={`content4`} title={'℃'} lines={wtline}></Chart>
          </div>
          <div className="chartInfo">
            <div className="subtitle">气压</div>
            <Chart id={`content5`} title={'hPa'} lines={pline}></Chart>
          </div>
          <div className="chartInfo">
          <div className="subtitle">溶解氧</div>
            <Chart id={`content6`} title={'mg/L'} lines={oline}></Chart>
          </div>
          <div className="chartInfo">
            <div className="subtitle">PH</div>
            <Chart id={`content7`} title={''} lines={phline}></Chart>
          </div>
          <div className="chartInfo">
            <div className="subtitle">盐度</div>
            <Chart id={`content8`} title={''} lines={sline}></Chart>
          </div>
          <div className="chartInfo">
            <div className="subtitle">浊度</div>
            <Chart id={`content9`} title={''} lines={tuline}></Chart>
          </div>
          <div className="chartInfo">
            <div className="subtitle">叶绿素</div>
            <Chart id={`content10`} title={'hPa'} lines={chline}></Chart>
          </div>
        </div>
    } else if (type === '3') {
      table = 
      <div>
        <Table onRowClick={this.clickRow} data={this.state.list} columns={this.state.wcolumns} maxHeight="300" border={true} stripe={true}></Table>
        <p style={{fontSize: 20 + 'px',textAlign: 'center'}}>三天实测风速曲线图【{this.state.name}】</p>
        <Chart id='charts' title={'m/s'} lines={wline}></Chart>
      </div>
      title = <div className="title">最新数据</div>
    } else if (type === '4') {
      table = 
      <div>
        <Table onRowClick={this.clickRow} data={this.state.list} columns={this.state.wecolumns} maxHeight="300" border={true} stripe={true}></Table>
        <p style={{fontSize: 20 + 'px',textAlign: 'center'}}>三天实测波高曲线图【{this.state.name}】</p>
        <Chart id='charts' title={'m'} lines={weline}></Chart>
      </div>
      title = <div className="title">最新数据</div>
    } else if (type === '5') {
      table = 
      <div>
        <Table onRowClick={this.clickRow} data={this.state.list} columns={this.state.tcolumns} maxHeight="300" border={true} stripe={true}></Table>
        <p style={{fontSize: 20 + 'px',textAlign: 'center'}}>三天实测气温曲线图【{this.state.name}】</p>
        <Chart id='charts' title={'℃'} lines={tline}></Chart>
      </div>
    } else if (type === '6') {
      table = 
      <div>
        <Table onRowClick={this.clickRow} data={this.state.list} columns={this.state.wtcolumns} maxHeight="300" border={true} stripe={true}></Table>
        <p style={{fontSize: 20 + 'px',textAlign: 'center'}}>三天实测水温曲线图【{this.state.name}】</p>
        <Chart id='charts' title={'℃'} lines={wtline}></Chart>
      </div>
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
        <div className="news">新闻：泉州海事联合地方部门现场拆除2艘海上非法载客船只 <a href="http://www.cnss.com.cn/html/2019/news_management_0228/324647.html">点此查看</a></div>
        {map}
        <div className="charts">
          {title}
          <div style={{marginTop:50+'px'}}></div>
          {dom}
          {table}
        </div>
      </div>
    )
  }
}