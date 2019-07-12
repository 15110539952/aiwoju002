<template>
  <div class="hotel-detail">
    <v-header title="酒店详情"></v-header>
    <div class="tab-box">
      <p @click="goAnchor('oneId',0)" :class="tabId===0?'active':''" class="tab-title">设施详情 <b></b></p>
      <p @click="goAnchor('twoId',1)" :class="tabId===1?'active':''" class="tab-title">酒店介绍 <b></b></p>
      <p @click="goAnchor('',2)" :class="tabId===2?'active':''" class="tab-title">交通信息 <b></b></p>
    </div>
    <div class="content">
      <div class="list-box oneId" v-if="peitao">
        <p class="title">{{peitao.name}}</p>
        <div class="item" v-for="(item,index) in peitao.erji" :key="'erji'+index">
          <p class="item-title">
            <img class="labe_icon" :src="commonJs.url+item.image">
<!--            <i class="iconfont iconpeizhi_wangluo"></i>-->
            {{item.name}}
          </p>
          <div class="type-list">
            <div class="label" v-for="(itemLabel,label_index) in item.sanji" :key="'label_'+label_index">{{itemLabel.name}}</div>
          </div>
        </div>
      </div>
      <div class="list-box guize">
        <p class="title">订房必读</p>
        <div class="item hotel_description" v-html="hotel_infor.description"></div>
      </div>
      <div class="list-box twoId">
        <p class="title">酒店详情</p>
        <div class="room-type">
          <p><span>装修时间：</span>{{hotel_infor.renovate_time}}年</p>
          <p><span>开业时间：</span>{{hotel_infor.opeen_time}}年</p>
          <p><span>楼层高度：</span>{{hotel_infor.floor_num}}</p>
          <p><span>房间数：</span>{{hotel_infor.room_num}}</p>
        </div>
<!--        <div class="hotel_description" v-html="hotel_infor.remark"></div>-->
        <div class="room-content">{{hotel_infor.introduce}}</div>
      </div>
      <div class="list-box">
        <p class="title">交通信息</p>

        <div class="hotel_description" v-html="hotel_infor.traffic"></div>

      </div>
    </div>
  </div>
</template>

<script>
import header from "@/components/Header/header";
import { Toast } from 'vant'
import {commonJs}  from '@/commonJs/index.js';
import {hotelDetail} from '@/api/index'

export default {
  data(){
      return {
        commonJs:commonJs,
        tabId:0,
        peitao:'',
        hotel_infor:'',
      }
  },
  components: {
      "v-header": header,
  },
  mounted(){
    document.documentElement.scrollTop = -240;
    hotelDetail().then(res=>{
      this.peitao = res.data.peitao;
      this.hotel_infor = res.data.hotel_infor[0];
    })
  },
  methods:{
    goAnchor(selector, index) {
      this.tabId = index;
      if(index === 2){
        this.$router.push('/map');
      }
      if(selector){
        // console.log(document.querySelector("."+selector).offsetTop)
        let top = document.querySelector("."+selector).offsetTop -287;
        document.documentElement.scrollTop = top;
      }
    }
  }
}

</script>
<style lang='less' scoped>
  @import 'index';
  .child-view{
    padding-top: 100px;
  }
</style>


<!--        <div class="item">-->
<!--          <p class="item-title"><i class="iconfont iconpeizhi_wangluo"></i>网络</p>-->
<!--          <div class="type-list">-->
<!--            <div class="label">免费WIFI</div>-->
<!--            <div class="label">美容美发</div>-->
<!--            <div class="label">室内游泳池</div>-->
<!--            <div class="label">24小时前台服务</div>-->
<!--            <div class="label">西式餐厅</div>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="item">-->
<!--          <p class="item-title"><i class="iconfont iconpeizhi_wangluo"></i>网络</p>-->
<!--          <div class="type-list">-->
<!--            <div class="label">免费WIFI</div>-->
<!--            <div class="label">美容美发</div>-->
<!--            <div class="label">免费WIFI</div>-->
<!--            <div class="label">室内游泳池</div>-->
<!--            <div class="label">24小时前台服务</div>-->
<!--            <div class="label">西式餐厅</div>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="item">-->
<!--          <p class="item-title"><i class="iconfont iconpeizhi_wangluo"></i>网络</p>-->
<!--          <div class="type-list">-->
<!--            <div class="label">免费WIFI</div>-->
<!--            <div class="label">美容美发</div>-->
<!--            <div class="label">免费WIFI</div>-->
<!--            <div class="label">室内游泳池</div>-->
<!--            <div class="label">24小时前台服务</div>-->
<!--            <div class="label">24小时前台服务</div>-->
<!--            <div class="label">西式餐厅</div>-->
<!--          </div>-->
<!--        </div>-->

<!--        <div class="item">-->
<!--          <p class="item-title">入离时间</p>-->
<!--          <div class="type-list">不接受儿童预订</div>-->
<!--        </div>-->
<!--        <div class="item">-->
<!--          <p class="item-title">儿童政策</p>-->
<!--          <div class="type-list">不接受儿童预订</div>-->
<!--        </div>-->
<!--        <div class="item">-->
<!--          <p class="item-title">宠物政策</p>-->
<!--          <div class="type-list">不允许携带宠物</div>-->
<!--        </div>-->

<!--        <div class="room-content">铂涛集团位居全国酒店业前列,旗下近20个品牌,超1亿会员,门店总数超5000家.铂涛集团 诚邀您加盟实现合作共赢铂涛集团位居全国酒店业前列,旗下近20个品牌,超1亿会员</div>-->
<!--        <div class="road-item">-->
<!--          <p class="road-title">王府井地铁站</p>-->
<!--          <p class="road-detail">相距124米，步行约12分钟</p>-->
<!--        </div>-->
<!--        <div class="road-item">-->
<!--          <p class="road-title">王府井地铁站</p>-->
<!--          <p class="road-detail">相距124米，步行约12分钟</p>-->
<!--        </div>-->
