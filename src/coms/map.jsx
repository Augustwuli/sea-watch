import React, { Component } from 'React'

export default class Map extends Component {
  constructor (props) {
    super(props)
    this.state = {
      type: '1',
      list: []
    }
  }
  componentDidMount () {
    this.initPoint()
  }
  componentWillReceiveProps(nextProps){
    this.updatePoint(nextProps)
  }
   initPoint () {
    let { list, type} = this.props;
    console.log(list,type)
    const { BMap } = window; 
    let map = new BMap.Map("container"); // 创建地图实例  
    let point = new BMap.Point(119.5239453291,25.1890781656); // 创建点坐标  
    map.centerAndZoom(point, 8); // 初始化地图，设置中心点坐标和地图级别  
    map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放

    let points = [];
    let marker = [];
    let myIcon = new BMap.Icon("../image/big.png", new BMap.Size(24,24));
    if(type === '2'){
      myIcon = new BMap.Icon("../image/small.png", new BMap.Size(24,24));
    }
    if (list.length !==0 ){
      for (let i = 0;i < list.length;i++){
        points[i] = new BMap.Point(list[i].long, list[i].lat);
        marker[i] = new BMap.Marker(points[i], {icon:myIcon});  // 创建标注
        map.addOverlay(marker[i]);              // 将标注添加到地图中
        let label = new BMap.Label(list[i].title, {offset:new BMap.Size(20,-10)});
        marker[i].setLabel(label);
        marker[i].addEventListener('click', (e) => {
          console.log(e.target.getLabel().content)
        }); 
      }
    }
  }
  updatePoint (nextProps) {
    console.log('更新')
    let { list, type} = nextProps;
    console.log(list,type)
    const { BMap } = window; 
    let map = new BMap.Map("container"); // 创建地图实例  
    let point = new BMap.Point(119.5239453291,25.1890781656); // 创建点坐标  
    map.centerAndZoom(point, 8); // 初始化地图，设置中心点坐标和地图级别  
    map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放

    let points = [];
    let marker = [];
    let myIcon = new BMap.Icon("../image/big.png", new BMap.Size(24,24));
    if(type === '2'){
      myIcon = new BMap.Icon("../image/small.png", new BMap.Size(24,24));
    }
    if (list.length !==0 ){
      for (let i = 0;i < list.length;i++){
        points[i] = new BMap.Point(list[i].long, list[i].lat);
        marker[i] = new BMap.Marker(points[i], {icon:myIcon});  // 创建标注
        map.addOverlay(marker[i]);              // 将标注添加到地图中
        let label = new BMap.Label(list[i].title, {offset:new BMap.Size(20,-10)});
        marker[i].setLabel(label);
        marker[i].addEventListener('click', (e) => {
          console.log(e.target.getLabel().content)
        }); 
      }
    }
  }
  render () {
    return (
      <div id="container"></div> 
    )
  }
}