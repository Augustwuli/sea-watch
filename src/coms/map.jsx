import React, { Component } from 'React'

export default class Map extends Component {
  constructor (props){
    super(props)
    this.state = {
      name: ''
    }
  }
  componentDidMount () {
    this.initPoint()
  }
  componentWillReceiveProps(nextProps){
    // this.updatePoint(nextProps)
  }

  shouldComponentUpdate(nextProps, nextState){
    return true;
  }

  initPoint () {
    let { list, type} = this.props;
    const { BMap } = window; 
    let map = new BMap.Map("container"); // 创建地图实例  
    let point = new BMap.Point(119.5239453291, 25.1890781656); // 创建点坐标  
    map.centerAndZoom(point, 8); // 初始化地图，设置中心点坐标和地图级别  
    map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放

    let points = [];
    let marker = [];
    let label = [];
    let myIcon = new BMap.Icon("../image/big.png", new BMap.Size(24,24));
    if(type === '2'){
      myIcon = new BMap.Icon("../image/small.png", new BMap.Size(24,24));
    }else if (type === '3'|| type === '4'|| type === '5'|| type === '6') {
      myIcon = new BMap.Icon("../image/wind.png", new BMap.Size(24,24));
    }
    if (list.length !==0 ){
      if (type === '1') {
        for (let i = 0;i < list.length;i++){
          points[i] = new BMap.Point(list[i].geometry.coordinates[0], list[i].geometry.coordinates[1]);
          marker[i] = new BMap.Marker(points[i], {icon:myIcon});  // 创建标注
          map.addOverlay(marker[i]);              // 将标注添加到地图中
          label[i] = new BMap.Label(list[i].properties.stnm, {offset:new BMap.Size(20,-10)});
          label[i].setStyle({
            backgroundColor: "#0081FF",
            border: 'none'
          })
          if(list[i].id === '23'){
            label[i].setStyle({
              backgroundColor: "#F57E00",
              border: 'none'
            })
          }
          marker[i].setLabel(label[i]);
          marker[i].addEventListener("click",()=>{
            let p = list[i];  //获取marker的位置
            for(let i = 0; i<label.length;i++){
              label[i].setStyle({
                backgroundColor: "#0081FF",
                border: 'none'
              })
            }
            label[i].setStyle({
              backgroundColor: "#F57E00",
              border: 'none'
            })
            this.handPoint(p.id,p.properties.stnm,"大浮标");
          });
        }
      } else if (type === '2') {
        for (let i = 0;i < list.length;i++){
          points[i] = new BMap.Point(list[i].geometry.coordinates[0], list[i].geometry.coordinates[1]);
          marker[i] = new BMap.Marker(points[i], {icon:myIcon});  // 创建标注
          map.addOverlay(marker[i]);              // 将标注添加到地图中
          label[i] = new BMap.Label(list[i].properties.stnm, {offset:new BMap.Size(20,-10)});
          label[i].setStyle({
            backgroundColor: "#0081FF",
            border: 'none'
          })
          if(list[i].id === '23'){
            label[i].setStyle({
              backgroundColor: "#F57E00",
              border: 'none'
            })
          }
          marker[i].setLabel(label[i]);
          marker[i].addEventListener("click",()=>{
            let p = list[i];  //获取marker的位置
            for(let i = 0; i<label.length;i++){
              label[i].setStyle({
                backgroundColor: "#0081FF",
                border: 'none'
              })
            }
            label[i].setStyle({
              backgroundColor: "#F57E00",
              border: 'none'
            })
            this.handPoint(p.id,p.properties.stnm,"浮标");
          });
        }
      } else if (type === '3') {
        this.setState({
          name: 'wind'
        },function(){
          console.log(this.state.name)
        })
        for (let i = 0;i < list.length;i++){
          points[i] = new BMap.Point(list[i].LON, list[i].LAT);
          marker[i] = new BMap.Marker(points[i], {icon:myIcon});  // 创建标注
          map.addOverlay(marker[i]);              // 将标注添加到地图中
          label[i] = new BMap.Label(" ", {offset:new BMap.Size(20,-10)});
          let image = 'url(../image/arrow8.png)';
          if(list[i].FX.indexOf('南西南')!== -1){
            image = 'url(../image/arrow1.png)';
          }else if(list[i].FX.indexOf('西西南')!== -1){
            image = 'url(../image/arrow3.png)';
          }else if(list[i].FX.indexOf('西西北')!== -1){
            image = 'url(../image/arrow5.png)';
          }else if(list[i].FX.indexOf('北西北')!== -1){
            image = 'url(../image/arrow7.png)';
          }else if(list[i].FX.indexOf('北东北')!== -1){
            image = 'url(../image/arrow9.png)';
          }else if(list[i].FX.indexOf('东东北')!== -1){
            image = 'url(../image/arrow11.png)';
          }else if(list[i].FX.indexOf('东东南')!== -1){
            image = 'url(../image/arrow13.png)';
          }else if(list[i].FX.indexOf('南东南')!== -1){
            image = 'url(../image/arrow15.png)';
          }else if(list[i].FX.indexOf('西南')!== -1){
            image = 'url(../image/arrow2.png)';
          }else if(list[i].FX.indexOf('西北')!== -1){
            image = 'url(../image/arrow6.png)';
          }else if(list[i].FX.indexOf('东北')!== -1){
            image = 'url(../image/arrow10.png)';
          }else if(list[i].FX.indexOf('东南')!== -1){
            image = 'url(../image/arrow14.png)';
          }else if(list[i].FX.indexOf('西')!== -1){
            image = 'url(../image/arrow4.png)';
          }else if(list[i].FX.indexOf('北')!== -1){
            image = 'url(../image/arrow8.png)';
          }else if(list[i].FX.indexOf('东')!== -1){
            image = 'url(../image/arrow12.png)';
          }else if(list[i].FX.indexOf('南')!== -1){
            image = 'url(../image/arrow16.png)';
          }
          let color = "#00A014";
          if(list[i].FL >= 10){
            color = "#FF0000";
          }else if(list[i].FL >= 8){
            color = "#C000E9";
          }else if(list[i].FL >= 6){
            color = "#E59400";
          }else if(list[i].FL >= 4){
            color = "#0081FF";
          }else if(list[i].FL >= 1){
            color = "#00A014";
          }
          label[i].setStyle({
            backgroundColor: color,
            height: "30px",
            width: "30px",
            border:"2px solid #fff",
            borderRadius:"50%",
            backgroundImage: image,
            position: 'absolute',
            left: '0px'
          })
          marker[i].setLabel(label[i]);
          marker[i].addEventListener("click",()=>{
            let p = list[i];  //获取marker的位置
            this.handPoint(p.STCD,p.STNM,p.PARENT_TYPE);
          });
          marker[i].addEventListener("mouseover", function(){   
            let opts = {
              width : 200,     // 信息窗口宽度
              height: 220,     // 信息窗口高度
              title : `最新数据【${list[i].STNM}】` , // 信息窗口标题
              enableMessage:true,//设置允许信息窗发送短息
            };  
            let info='';
            if (list[i].REMARK) {
              info = `<p>时间：${list[i].TMSTR}</p><p>平均风速：${list[i].FS}m/s</p><p>最大风速：${list[i].ZDFS == null? '': list[i].ZDFS}m/s</p><p>风向：${list[i].FX}</p><p>风力等级：${list[i].FL}级</p><p>经度：${list[i].LON}</p><p>纬度：${list[i].LON}</p><p>说明：${list[i].REMARK}</p><p>类型：${list[i].TYPE}</p>`;
            }else {
              info = `<p>时间：${list[i].TMSTR}</p><p>平均风速：${list[i].FS}m/s</p><p>最大风速：${list[i].ZDFS == null? '': list[i].ZDFS}m/s</p><p>风向：${list[i].FX}</p><p>风力等级：${list[i].FL}级</p><p>经度：${list[i].LON}</p><p>纬度：${list[i].LON}</p><p>类型：${list[i].TYPE}</p>`;
            }
            let infoWindow = new BMap.InfoWindow(info, opts);  // 创建信息窗口对象     
            map.openInfoWindow(infoWindow,points[i]); //开启信息窗口
          });
          marker[i].addEventListener("mouseout",function(){
            map.closeInfoWindow()
          })
        }
      }else if (type === '4') {
        this.setState({
          name: 'wind'
        },function(){
          console.log(this.state.name)
        })
        for (let i = 0;i < list.length;i++){
          points[i] = new BMap.Point(list[i].LON, list[i].LAT);
          marker[i] = new BMap.Marker(points[i], {icon:myIcon});  // 创建标注
          map.addOverlay(marker[i]);              // 将标注添加到地图中
          let content = `${list[i].YXBG}|${list[i].ZDBG}`;
          label[i] = new BMap.Label(content, {offset:new BMap.Size(20,-10)});
          let color = "#00A014"
          if(list[i].LJ==="中浪"){
            color = "#1376C2";
          }else if(list[i].LJ==="大浪"){
            color = "#E59400";
          }else if(list[i].LJ==="巨浪"){
            color = "#C000E9";
          }else if(list[i].LJ==="狂浪"){
            color = "#FF0000";
          }
          label[i].setStyle({
            backgroundColor: color,
            height: "18px",
            width: "40px",
            border: "1px solid #fff"
          })
          marker[i].setLabel(label[i]);
          marker[i].addEventListener("click",()=>{
            let p = list[i];  //获取marker的位置
            this.handPoint(p.STCD,p.STNM,p.PARENT_TYPE);
          });
          marker[i].addEventListener("mouseover", function(){   
            let opts = {
              width : 200,     // 信息窗口宽度
              height: 200,     // 信息窗口高度
              title : `最新数据【${list[i].STNM}】` , // 信息窗口标题
              enableMessage:true,//设置允许信息窗发送短息
            };  
            let info='';
            if (list[i].REMARK) {
              info = `<p>时间：${list[i].TMSTR}</p><p>有效波高：${list[i].YXBG}m</p><p>最大波高：${list[i].ZDBG == null? '': list[i].ZDBG}m</p><p>浪级：${list[i].LJ}</p><p>经度：${list[i].LON}</p><p>纬度：${list[i].LON}</p><p>说明：${list[i].REMARK}</p><p>类型：${list[i].TYPE}</p>`;
            }else {
              info = `<p>时间：${list[i].TMSTR}</p><p>有效波高：${list[i].YXBG}m</p><p>最大波高：${list[i].ZDBG == null? '': list[i].ZDBG}m</p><p>浪级：${list[i].LJ}</p><p>经度：${list[i].LON}</p><p>纬度：${list[i].LON}</p><p>类型：${list[i].TYPE}</p>`;
            }
            let infoWindow = new BMap.InfoWindow(info, opts);  // 创建信息窗口对象     
            map.openInfoWindow(infoWindow,points[i]); //开启信息窗口
          });
          marker[i].addEventListener("mouseout",function(){
            map.closeInfoWindow()
          })
        }
      }else if (type === '5') {
        this.setState({
          name: 'wind'
        },function(){
          console.log(this.state.name)
        })
        for (let i = 0;i < list.length;i++){
          points[i] = new BMap.Point(list[i].LON, list[i].LAT);
          marker[i] = new BMap.Marker(points[i], {icon:myIcon});  // 创建标注
          map.addOverlay(marker[i]);              // 将标注添加到地图中
          let content = `${list[i].QW}`;
          label[i] = new BMap.Label(content, {offset:new BMap.Size(20,-10)});
          label[i].setStyle({
            backgroundColor: "#00A014",
            height: "18px",
            width: "24px",
            border: "1px solid #fff"
          })
          marker[i].setLabel(label[i]);
          marker[i].addEventListener("click",()=>{
            let p = list[i];  //获取marker的位置
            this.handPoint(p.STCD,p.STNM,p.PARENT_TYPE);
          });
          marker[i].addEventListener("mouseover", function(){   
            let opts = {
              width : 200,     // 信息窗口宽度
              height: 140,     // 信息窗口高度
              title : `最新数据【${list[i].STNM}】` , // 信息窗口标题
              enableMessage:true,//设置允许信息窗发送短息
            };  
            let info='';
            if (list[i].REMARK) {
              info = `<p>时间：${list[i].TMSTR}</p><p>气温：${list[i].QW}℃</p><p>经度：${list[i].LON}</p><p>纬度：${list[i].LON}</p><p>说明：${list[i].REMARK}</p><p>类型：${list[i].TYPE}</p>`;
            }else {
              info = `<p>时间：${list[i].TMSTR}</p><p>气温：${list[i].QW}℃</p><p>经度：${list[i].LON}</p><p>纬度：${list[i].LON}</p><p>类型：${list[i].TYPE}</p>`;
            }
            let infoWindow = new BMap.InfoWindow(info, opts);  // 创建信息窗口对象     
            map.openInfoWindow(infoWindow,points[i]); //开启信息窗口
          });
          marker[i].addEventListener("mouseout",function(){
            map.closeInfoWindow()
          })
        }
      }else if (type === '6') {
        this.setState({
          name: 'wind'
        },function(){
          console.log(this.state.name)
        })
        for (let i = 0;i < list.length;i++){
          points[i] = new BMap.Point(list[i].LON, list[i].LAT);
          marker[i] = new BMap.Marker(points[i], {icon:myIcon});  // 创建标注
          map.addOverlay(marker[i]);              // 将标注添加到地图中
          let content = `${list[i].SW}`;
          label[i] = new BMap.Label(content, {offset:new BMap.Size(20,-10)});
          let color = "#00A014";
          if(list[i].SW >= 25 ){
            color = "#FF0000";
          }else if(list[i].SW >= 20){
            color = "#C000E9";
          }else if(list[i].SW >= 15){
            color = "#E59400";
          }else if(list[i].SW >= 10){
            color = "#1376C2";
          }
          label[i].setStyle({
            backgroundColor: color,
            height: "18px",
            width: "24px",
            border: "1px solid #fff"
          })
          marker[i].setLabel(label[i]);
          marker[i].addEventListener("click",()=>{
            let p = list[i];  //获取marker的位置
            this.handPoint(p.STCD,p.STNM,p.PARENT_TYPE);
          });
          marker[i].addEventListener("mouseover", function(){   
            let opts = {
              width : 200,     // 信息窗口宽度
              height: 160,     // 信息窗口高度
              title : `最新数据【${list[i].STNM}】` , // 信息窗口标题
              enableMessage:true,//设置允许信息窗发送短息
            };  
            let info='';
            if (list[i].REMARK) {
              info = `<p>时间：${list[i].TMSTR}</p><p>水温：${list[i].SW}℃</p><p>经度：${list[i].LON}</p><p>纬度：${list[i].LON}</p><p>说明：${list[i].REMARK}</p><p>类型：${list[i].TYPE}</p>`;
            }else {
              info = `<p>时间：${list[i].TMSTR}</p><p>水温：${list[i].SW}℃</p><p>经度：${list[i].LON}</p><p>纬度：${list[i].LON}</p><p>类型：${list[i].TYPE}</p>`;
            }
            let infoWindow = new BMap.InfoWindow(info, opts);  // 创建信息窗口对象     
            map.openInfoWindow(infoWindow,points[i]); //开启信息窗口
          });
          marker[i].addEventListener("mouseout",function(){
            map.closeInfoWindow()
          })
        }
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
          this.handPoint(p.id,p.properties.stnm);
        });
      }
    }
  }

  handPoint =(e,name)=> {
    this.props.onPoint(e,name)
  }

  render () {
    let dom =null;
    let {type} = this.props;
    if(type==="3"){
      dom = <div className="bottom">
      <div className="mark">图例</div>
      <div className="detail">
        <div className="detail-block">
          <p className="detail-icon" style={{background: "#008000"}}></p>
          <p className="detail-font">1-3级</p>
        </div>
        <div className="detail-block">
          <p className="detail-icon" style={{background: "#13776c2"}}></p>
          <p className="detail-font">4-5级</p>
        </div>
        <div className="detail-block">
          <p className="detail-icon" style={{background: "#e59400"}}></p>
          <p className="detail-font">6-7级</p>
        </div>
        <div className="detail-block">
          <p className="detail-icon" style={{background: "#c000e9"}}></p>
          <p className="detail-font">8-9级</p>
        </div>
        <div className="detail-block">
          <p className="detail-icon" style={{background: "#ff0000"}}></p>
          <p className="detail-font">10级以上</p>
        </div>
      </div>
    </div>
    }else if(type==="4"){
      dom = <div className="bottom">
      <div className="mark">图例</div>
      <div className="detail">
        <div className="detail-block">
          <p className="detail-icon" style={{background: "#008000"}}></p>
          <p className="detail-font">轻浪以下</p>
        </div>
        <div className="detail-block">
          <p className="detail-icon" style={{background: "#13776c2"}}></p>
          <p className="detail-font">中浪</p>
        </div>
        <div className="detail-block">
          <p className="detail-icon" style={{background: "#e59400"}}></p>
          <p className="detail-font">大浪</p>
        </div>
        <div className="detail-block">
          <p className="detail-icon" style={{background: "#c000e9"}}></p>
          <p className="detail-font">巨浪</p>
        </div>
        <div className="detail-block">
          <p className="detail-icon" style={{background: "#ff0000"}}></p>
          <p className="detail-font">狂浪以上</p>
        </div>
      </div>
    </div>
    }else if(type==="6"){
      dom = <div className="bottom">
      <div className="mark">图例</div>
      <div className="detail">
        <div className="detail-block">
          <p className="detail-icon" style={{background: "#008000"}}></p>
          <p className="detail-font">10以下</p>
        </div>
        <div className="detail-block">
          <p className="detail-icon" style={{background: "#13776c2"}}></p>
          <p className="detail-font">10-15</p>
        </div>
        <div className="detail-block">
          <p className="detail-icon" style={{background: "#e59400"}}></p>
          <p className="detail-font">15-20</p>
        </div>
        <div className="detail-block">
          <p className="detail-icon" style={{background: "#c000e9"}}></p>
          <p className="detail-font">20-25</p>
        </div>
        <div className="detail-block">
          <p className="detail-icon" style={{background: "#ff0000"}}></p>
          <p className="detail-font">25以上</p>
        </div>
      </div>
    </div>
    }
    return (
      <div className="map">
        <div id="container" className={this.state.name}></div>
        {dom}
      </div>
    )
  }
}