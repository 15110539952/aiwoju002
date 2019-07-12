<template>
  <div class="map">
    <v-header title="定位"></v-header>
    <div class="map-type">
      <div class="map-item one" @click="car">
        <img v-if="mapType===0" src="~assets/img/jiache-yes.png">
        <img v-else src="~assets/img/jiache-no.png">
<!--        <p :class="mapType===0?'active':''">3分钟</p>-->
      </div>
      <div class="map-item two" @click="ride">
        <img v-if="mapType===1" src="~assets/img/qiche-yes.png">
        <img v-else src="~assets/img/qiche-no.png">
<!--        <p :class="mapType===1?'active':''">3分钟</p>-->
      </div>
      <div class="map-item three" @click="walk">
        <img v-if="mapType===2" src="~assets/img/buxing-yes.png">
        <img v-else src="~assets/img/buxing-no.png">
<!--        <p :class="mapType===2?'active':''">3分钟</p>-->
      </div>
    </div>
    <div class="main">
      <div id="container"></div>
    </div>
    <van-button class="map-btn" @click="toMap">前往导航</van-button>
  </div>
</template>

<script>
  import header from "@/components/Header/header";

  export default {
    data(){
      return {
        mapType:0,
        map:null,
        lng:'',
        lat:'',
      }
    },
    created(){
    },
    computed:{
    },
    mounted(){
      this.init();
    },
    components: {
      "v-header": header,
    },
    methods:{
      init() {
        // var map = new qq.maps.Map(document.getElementById("container"), {
        //   // 地图的中心地理坐标。
        //   center: new qq.maps.LatLng(39.916527,116.397128)
        // });
        this.map = new BMap.Map("container");
        this.map.centerAndZoom(new BMap.Point(116.404, 39.915), 14);
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition((r)=>{
          if(this.getStatus() == BMAP_STATUS_SUCCESS){
            var mk = new BMap.Marker(r.point);
            map.addOverlay(mk);
            map.panTo(r.point);

            this.lng = r.point.lng;
            this.lat = r.point.lat;
          }
          else {
            console.log('failed'+this.getStatus());
          }
        },{enableHighAccuracy: true})

        this.car();
      },
      car(){
        this.mapType = 0;
        let map = new BMap.Map("container");
        map.centerAndZoom(new BMap.Point(116.404, 39.915), 14);


        // var start = "天安门";
        // var end = "百度大厦";
        // this.map.clearOverlays();

        var driving = new BMap.DrivingRoute(map,
          {
            renderOptions: {
              map: map,
              // panel : "results",
              autoViewport: true
            },
          }
        );

        // driving.search("中关村", "天安门");


        var start = new BMap.Point(116.310791, 40.003419);
        var end = new BMap.Point(116.486419, 39.877282);
        driving.search(start, end);

        let startIcon=new BMap.Icon(require('assets/img/map-end-icon.png'), new BMap.Size(64,94));
        let endIcon = new BMap.Icon(require('assets/img/map-end-icon.png'), new BMap.Size(64,94));
        driving.setMarkersSetCallback(function(result){
          result[0].marker.setIcon(startIcon);
          result[1].marker.setIcon(endIcon);
        })
      },
      ride(){
        this.mapType = 1;
        this.map = new BMap.Map("container");
        this.map.centerAndZoom(new BMap.Point(116.404, 39.915), 14);
        var riding = new BMap.RidingRoute(this.map, {
          renderOptions: {
            map: this.map,
            autoViewport: true
          }
        });
        var start = new BMap.Point(116.310791, 40.003419);
        var end = new BMap.Point(116.386419, 40.003519);
        riding.search(start, end);

        let startIcon=new BMap.Icon(require('assets/img/map-end-icon.png'), new BMap.Size(64,94));
        let endIcon = new BMap.Icon(require('assets/img/map-end-icon.png'), new BMap.Size(64,94));
        riding.setMarkersSetCallback(function(result){
          result[0].marker.setIcon(startIcon);
          result[1].marker.setIcon(endIcon);
        })
      },
      walk(){
        this.mapType = 2;
        this.map = new BMap.Map("container");
        this.map.centerAndZoom(new BMap.Point(116.404, 39.915), 14);
        var walking = new BMap.WalkingRoute(this.map, {
          renderOptions: {
            map: this.map,
            autoViewport: true
          }
        });
        var start = new BMap.Point(116.310791, 40.003419);
        var end = new BMap.Point(116.326419, 40.003519);
        walking.search(start, end);

        let startIcon=new BMap.Icon(require('assets/img/map-end-icon.png'), new BMap.Size(64,94));
        let endIcon = new BMap.Icon(require('assets/img/map-start-icon.png'), new BMap.Size(64,94));
        walking.setMarkersSetCallback(function(result){
          result[0].marker.setIcon(startIcon);
          result[1].marker.setIcon(endIcon);
        })
      },
      toMap(){

        // window.location.href = 'http://api.map.baidu.com/geocoder?address=太原市茂业天地&output=html&src=webapp.baidu.openAPIdemo';
        // window.location.href = 'http://api.map.baidu.com/marker?location=40.047669,116.313082&title=我的位置&content=百度奎科大厦&output=html&src=webapp.baidu.openAPIdemo';
        // window.location.href = 'http://api.map.baidu.com/geocoder?location=39.990912172420714,116.32715863448607&coord_type=gcj02&output=html&src=webapp.baidu.openAPIdemo';
        window.location.href = `http://api.map.baidu.com/direction?origin=latlng:${this.lng},${this.lat}|name:中南锦苑&destination=新街口&mode=driving&region=南京&output=html&src=webapp.baidu.openAPIdemo`;
      }
    }
  }
</script>

<style scoped lang="less">
  @import "index";
  .child-view{
    padding-top: 100px;
  }

</style>
