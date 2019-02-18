import React, { Component } from 'React'

export default class Map extends Component {
  componentDidMount () {
    this.initPoint()
  }
  componentWillReceiveProps(nextProps){
    // this.updatePoint(nextProps)
  }

  shouldComponentUpdate(nextProps, nextState){
  //   let { list } = this.props;
  //   console.log(list);
  //   console.log(nextProps.list);
    return true;
  //   //return false 则不更新组件
  }

  initPoint () {
    let { list, type} = this.props;
    // console.log(list,type)
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
    } else if(type === '3') {
      myIcon = new BMap.Icon("../image/wind.png", new BMap.Size(24,24));
    } else if (type === '4') {
      myIcon = new BMap.Icon("../image/wave.png", new BMap.Size(24,24));
    }else if (type === '5') {
      myIcon = new BMap.Icon("../image/temperature.png", new BMap.Size(24,24));
    }else if (type === '6') {
      myIcon = new BMap.Icon("../image/water.png", new BMap.Size(24,24));
    }
    if (list.length !==0 ){
      for (let i = 0;i < list.length;i++){
        points[i] = new BMap.Point(list[i].geometry.coordinates[0], list[i].geometry.coordinates[1]);
        marker[i] = new BMap.Marker(points[i], {icon:myIcon});  // 创建标注
        map.addOverlay(marker[i]);              // 将标注添加到地图中
        let label = new BMap.Label(list[i].properties.stnm, {offset:new BMap.Size(20,-10)});
        marker[i].setLabel(label);
        marker[i].addEventListener("click",()=>{
          let p = list[i];  //获取marker的位置
          this.handPoint(p.id);
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
    } else if(type === '3') {
      myIcon = new BMap.Icon("../image/wind.png", new BMap.Size(24,24));
    } else if (type === '4') {
      myIcon = new BMap.Icon("../image/wave.png", new BMap.Size(24,24));
    }else if (type === '5') {
      myIcon = new BMap.Icon("../image/temperature.png", new BMap.Size(24,24));
    }else if (type === '6') {
      myIcon = new BMap.Icon("../image/water.png", new BMap.Size(24,24));
    }
    if (list.length !==0 ){
      for (let i = 0;i < list.length;i++){
        points[i] = new BMap.Point(list[i].geometry.coordinates[0], list[i].geometry.coordinates[1]);
        marker[i] = new BMap.Marker(points[i], {icon:myIcon});  // 创建标注
        map.addOverlay(marker[i]);              // 将标注添加到地图中
        let label = new BMap.Label(list[i].properties.stnm, {offset:new BMap.Size(20,-10)});
        marker[i].setLabel(label);
        marker[i].addEventListener("click",()=>{
          let p = list[i];  //获取marker的位置
          this.handPoint(p.id);
        });
      }
    }
  }

  handPoint =(e)=> {
    this.props.onPoint(e)
  }

  render () {
    return (
      <div className="map">
        <div id="container"></div> 
      </div>
    )
  }
}