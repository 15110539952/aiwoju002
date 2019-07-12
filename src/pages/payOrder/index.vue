<template>
  <div class="pay-order">
    <v-header title="订单支付"></v-header>
    <div class="order-detail">
      <p class="room-name">{{orderInfor.hotel_room_type_name}}</p>
      <div class="room-info">
        <p class="left">
          <span v-for="item in orderInfor.itemlist">{{item}} <i>·</i></span>
          <span>{{orderInfor.breakfast}}</span>
        </p>
        <span>{{startDateText}}-{{endDateText}} 共{{orderInfor.day_count}}晚</span>
      </div>
    </div>
    <div class="time">支付剩余时间  {{arrTime[0]+':'+arrTime[1]+':'+arrTime[2]}}</div>
    <div class="price">￥<span>{{orderInfor.total_amount}}</span></div>
    <div class="room-tip">
      <p>{{orderInfor.hotel_room_type_id}}·{{orderInfor.breakfast}}·{{startDateText}}入住</p>
      <!--      <i class="iconfont iconarrow-right"></i>-->
    </div>
    <div class="price-type">
      <div class="weixin" @click="priceId = 1">
        <p class="left">
          <i class="iconfont iconweixin"></i>
          <span>微信支付</span>
        </p>
        <i class="iconfont iconxuanze-duoxuan" :class="priceId===1?'active':''"></i>
      </div>
<!--      <div class="alipay" @click="priceId = 2">-->
<!--        <p class="left">-->
<!--          <i class="iconfont iconzhifubao"></i>-->
<!--          <span>支付宝支付</span>-->
<!--        </p>-->
<!--        <i class="iconfont iconxuanze-duoxuan" :class="priceId===2?'active':''"></i>-->
<!--      </div>-->
    </div>
    <van-button type="primary" size="large" @click="pay">确认支付</van-button>
    <van-popup v-model="isPay">
      <div class="is-pay">
        <p class="title-tip">支付未完成</p>
        <p class="price">￥<span>{{orderInfor.total_amount}}</span></p>
        <p class="tip-content">如已扣款，但订单未能完成请及时联系客服</p>
        <div class="btn van-hairline--top">
          <b></b>
          <p class="left" @click="pay('1')">稍后支付</p>
          <p class="right" @click="pay('2')">重新支付</p>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import wx from 'weixin-jsapi'
import header from "@/components/Header/header";
import { Toast } from 'vant'
import {commonUrl,isten,countDown}  from '@/commonJs/index.js'
import {orderInfor,getSign,payOrder,cancelTransaction} from '@/api/index'
let moment = require('moment');

export default {
  data(){
      return {
        id:'',
        priceId:1,
        isPay:false,
        orderInfor:'',
        startDateText:'',
        endDateText:'',
        createtime:'',
        arrTime:['00','00','00'],
        wxSign:'',
      }
  },
  components: {
      "v-header": header,
  },
  created(){
    getSign().then(res=>{
      let data = res.data;
      this.wxSign = data;
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: data.appId, // 必填，公众号的唯一标识
        timestamp: data.timestamp, // 必填，生成签名的时间戳
        nonceStr: data.nonceStr, // 必填，生成签名的随机串
        signature: data.signature,// 必填，签名，见附录1
        jsApiList: ['chooseWXPay']
      });
    });
  },
  mounted(){
    this.id = this.$route.query.id || '';
    // console.log(this.id);
    if(!this.id){
      this.$router.goBack(-1);
    }
    orderInfor({order_id:this.id}).then(res=>{
      if(res.code === 4000){
        this.$router.goBack();
        Toast('订单失效');
      }
      this.orderInfor = res.data;
      let s = moment(res.data.predict_begin_time).toArray();
      let e = moment(res.data.predict_end_time).toArray();
      this.startDateText = isten(s[1]+=1)+'月'+isten(s[2])+'日';
      this.endDateText = isten(e[1]+=1)+'月'+isten(e[2])+'日';

      this.createtime = res.data.createtime.length === 13?res.data.createtime.length:res.data.createtime*1000;
    })
    setInterval(() => {
      let endTime = this.createtime+30*60*1000;
      let nowTime = new Date().getTime();
      this.arrTime = countDown(endTime-nowTime);
    },1000);
  },
  methods:{
    pay(index){
      if(index === '1'){
        this.isPay = false;
        this.$router.push({path:'/orderDetail',query:{id:this.id}});
        return;
      }else if(index === '2'){
        this.isPay = false;
        return;
      }else{
        this.isPay = true;
      }
      payOrder({amount:this.orderInfor.total_amount,id:this.id}).then(res=>{
        console.log(res);
        if(res.code === 2000){
          let data = res.data;
          wx.ready(()=>{
            wx.chooseWXPay({
              timestamp: data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
              nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
              package: data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
              signType: data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
              paySign: data.paySign, // 支付签名
              success: (res)=> {
// 支付成功后的回调函数
                console.log('succ',res)
                this.$router.replace({path:'/orderDetail',query:{id:this.id}});
              },
              fail:(res)=>{
                console.log('fail',res)
              },
              cancel:(res)=>{
                cancelTransaction({id:this.id}).then(res=>{

                });
              },
              complete:(res)=>{
                console.log('complete',res)
              }
            });
          });

        }
      });
    },
  }
}

</script>
<style lang='less' scoped>
@import "index";
  .child-view{
    padding-top: 100px;
  }
</style>
