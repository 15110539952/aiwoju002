<template>
  <div class="orderdetail">
    <v-header title="订单详情">
      <i slot="right-icon" class="iconfont iconfenxiang"></i>
    </v-header>
    <div class="top-bg"></div>

    <div class="pay-type-top-box">
      <!--region 待支付-->
      <div class="no-pay" v-if="orderDetail.status === 0">
        <div class="title">
          <p class="left">待支付</p>
          <p class="right">支付倒计时：：<span>00：29：59</span></p>
        </div>
        <div class="content">
          <div><p class="label">取消规则：</p><p class="text-detial">入住前可免费取消</p></div>
        </div>
        <van-button class="to-pay" type="default" @click="$router.push({path:'/payOrder',query:{id:orderDetail.id}})">
          去支付<span>￥</span><span class="number">456</span>
        </van-button>
      </div>
      <!--endregion-->
      <!--region 支付成功-->
      <div class="paySuccess" v-if="orderDetail.status === 1">
        <div class="title">
          <p class="left">支付成功</p>
<!--          <p class="right">确认倒计时：<span>00：29：59</span></p>-->
        </div>
        <div class="content">
          <div><p class="label">取消规则：</p><p class="text-detial">入住前可免费取消</p></div>
          <div><p class="label">入住说明：</p><p class="text-detial">入住人携带好个人身份证酒店前台办理入住
            不可携带宠物入住
          </p></div>
        </div>
      </div>
      <!--endregion-->
      <div class="title" v-if="orderDetail.status === 2">
        <p class="left">已入住</p>
      </div>
      <div class="title" v-if="orderDetail.status === 3">
        <p class="left">待入住</p>
      </div>
      <!--region 待评价-->
      <div class="no-evaluate" v-if="orderDetail.status === 4">
        <div class="title">
          <p class="left">待评价</p>
          <p class="right"></p>
        </div>
        <div class="evaluate-btn">
          <van-button class="repeat-order" type="default" @click="$router.push('/')">再次预定</van-button>
          <van-button class="to-evaluate" type="default" @click="$router.push({path:'/evaluateAdd',query:{id:orderDetail.id}})">去评价</van-button>
        </div>
      </div>
      <!--endregion-->
      <div class="title" v-if="orderDetail.status === 5">
        <p class="left">已完成</p>
      </div>
      <!--region 已取消-->
      <div class="order-close" v-if="orderDetail.status === 6 || orderDetail.status === 7">
        <div class="title">
          <p class="left">已取消</p>
          <p class="right"></p>
        </div>
        <div class="content" v-if="orderDetail.status === 6">
          <div class="close">
            <p>退款进度</p>
            <p>退款中</p>
          </div>
        </div>
      </div>
      <!--endregion-->
      <!--region 已退款-->
      <div class="order-close" v-if="orderDetail.status === 8">
        <div class="title">
          <p class="left">已退款</p>
          <p class="right"></p>
        </div>
        <div class="content">
          <div class="close">
            <p>退款进度</p>
            <p>已退款</p>
          </div>
        </div>
      </div>
      <!--endregion-->


    </div>

    <!--region 价格模块-->
    <div class="price-list">
<!--      <div class="item">-->
<!--        <p>使用优惠券：</p>-->
<!--        <p>-￥<span></span></p>-->
<!--      </div>-->
      <div class="item">
        <p>在线支付：</p>
        <p>￥<span>{{orderDetail.amount}}</span></p>
      </div>
    </div>
    <!--endregion-->
    <div class="hotel-info">
      <div class="address active-bg">
        <p>{{orderDetail.address}}</p><i class="iconfont iconarrow-right"></i>
      </div>
      <div class="hotel-tab" @click="$router.push({path:'/map',query:{lat:orderDetail.lat,lng:orderDetail.lng}})">
        <div class="hotel-address">
          <i class="iconfont iconorder-weizhi"></i>
          <p>地图定位</p>
        </div>
        <div class="hotel-set" @click="$router.push('hotelDetail')">
          <i class="iconfont iconorder-shebei"></i>
          <p>设施配置</p>
        </div>
        <a class="hotel-tel" :href="'tel:'+orderDetail.telphone">
          <i class="iconfont iconorder-dianhua"></i>
          <p>酒店前台</p>
        </a>
      </div>
      <div class="room-info">
        <p class="title">{{orderDetail.name}}·{{orderDetail.num}}间</p>
        <p class="room-type">
          <span v-for="item in orderDetail.itemlist">{{item}}</span>
<!--          <span>1.8X2m大床</span>-->
<!--          <span>2人入住</span>-->
<!--          <span>有窗</span>-->
        </p>
        <div class="room-time"><span>{{orderDetail.predict_begin_time}}</span> 至 <span>{{orderDetail.predict_end_time}}</span> {{orderDetail.day_count}}晚</div>
      </div>
    </div>

    <div class="user-info">
      <div class="user-list" v-for="item in orderDetail.contant">
        <div class="item"><span class="label">入住人：</span><span class="content">{{item.checkname}}</span></div>
        <div class="item"><span class="label">联系电话：</span><span class="content number">{{item.phone}}</span></div>
      </div>
      <div class="item"><span class="label">预计到店：</span><span class="content number">{{orderDetail.predict_coming_time}}</span></div>
    </div>

    <div class="orderid">
      <p class="label">订单号：</p>
      <p class="content"><span class="number">{{orderDetail.order_code}}</span>
        <van-button type="default"
                    v-clipboard:copy="orderDetail.order_code"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onCopy">复制</van-button>
      </p>
    </div>



    <!--region 取消订单-->
    <van-button v-if="orderDetail.status<3" class="footer" type="default" @click="isCloseOrder= true">取消订单</van-button>
    <!--endregion-->

    <!--region  取消订单弹出框-->
<!--    <van-popup v-model="isCloseOrder">-->
<!--      <div class="is-pay">-->
<!--        <p class="title-tip">取消订单</p>-->
<!--        <div class="tip-content">-->
<!--          <p>·已支付订单，取消订单将在3个工作日内原账户返还</p>-->
<!--          <p>·未支付订单，取消后将删除订单</p>-->
<!--        </div>-->
<!--        <div class="btn van-hairline&#45;&#45;top">-->
<!--          <b></b>-->
<!--          <p class="left" @click="closeOrder(1)">取消订单</p>-->
<!--          <p class="right" @click="closeOrder(0)">退出</p>-->
<!--        </div>-->
<!--      </div>-->
<!--    </van-popup>-->

    <van-dialog
      v-model="isCloseOrder"
      title="取消订单"
      showCancelButton
      @confirm="closeOrder(1)"
      @cancel="closeOrder(0)"
      :before-close="beforeClose"
      :cancelButtonText="closeText"
      :confirmButtonText="confirmText">
      <div class="is-pay">
        <div class="close-room-select" v-if="!isCloseSelect">
          <div class="item" v-for="(item,index) in sub_order" :key="index">
            <div class="room" @click="closeSelect(item,index)">
              <p>{{item.type_name}}</p><i class="iconfont iconxuanze-duoxuan" :class="item.active?'active':''"></i>
            </div>
            <div class="date">
              <p>{{item.begin}} - {{item.end}}    {{orderDetail.day_count}}晚</p><p>￥{{item.price}}</p>
            </div>
          </div>
        </div>
        <div class="confirm-select" v-else>
          <p class="close-num">取消{{close_order.length}}间</p>
          <div class="item" v-for="(item,index) in close_order" :key="'close_order_'+index">
            <p>{{item.type_name}}    {{item.begin}} - {{item.end}}    {{orderDetail.day_count}}晚</p>
            <p>￥{{item.price}}</p>
          </div>
        </div>
        <div class="tip-content" v-show="isCloseSelect">
          <p>·已支付订单，取消订单将在3个工作日内原账户返还</p>
          <p>·未支付订单，取消后将删除订单</p>
        </div>
      </div>
    </van-dialog>
    <!--endregion-->
  </div>
</template>

<script>
import header from "@/components/Header/header";
import { Toast } from 'vant'
import {commonUrl,strDate,countDown}  from '@/commonJs/index.js'
import {orderDetail,orderCancel} from '@/api/index'

// let moment = require('moment');

export default {
  name:'orderDetail',
  data(){
      return {
        isCloseOrder:false, // 弹出取消订单
        isCloseSelect:false, // 选择好取消的订单
        closeText:'取消',
        confirmText: '确认选择',
        orderDetail:'',
        sub_order:[], // 可以取消的子订单列表
        close_order:[], // 选择好要取消的子订单列表
        close_orderIds:[] // 选择好要取消的子订单id
      }
  },
  watch:{
    'isCloseOrder'(val){
      if(!val){
        this.isCloseSelect = false;
        this.closeText = '取消';
        this.confirmText = '确认选择';
      }
    }
  },
  components: {
      "v-header": header,
  },
  mounted(){
    this.id = this.$route.query.id || '';
    if(!this.id){
      this.$router.goBack(-1);
    }
    this.getDetail();
  },
  methods:{
    getDetail(){
      orderDetail({id: this.id}).then(res=>{
        this.orderDetail = res.data;
        this.orderDetail.status = parseInt(this.orderDetail.status);
        this.orderDetail.predict_begin_time = strDate(res.data.predict_begin_time);
        this.orderDetail.predict_end_time = strDate(res.data.predict_end_time);
        this.sub_order = res.data.sub_order.filter(res=>res.status<2);
        this.sub_order.forEach(item=>{
          item.active = false;
        });
      });
    },
    closeSelect(item,index){
      item.active = !item.active;
      this.$set(this.sub_order,index,item) ;
    },
    closeOrder(i){
      // 点击取消订单
      if(i&&!this.isCloseSelect){
        this.close_order = this.sub_order.filter(res=>res.active);
        this.close_orderIds = [];
        this.close_order.forEach(item=>{
          this.close_orderIds.push(item.id);
        });
      }
    },
    beforeClose(action, done){
      // console.log(action)
      if(!this.isCloseSelect){
        if(action==='confirm'){
          if(this.sub_order.filter(res=>res.active).length<1){
            Toast('请选择需要取消的房间');
            done(false);
            return;
          };
          Toast.clear();
          this.isCloseSelect = true;
          this.closeText = '取消订单';
          this.confirmText = '退出';
          done(false);
        }else{
          done();
        }
      }else{
        if(action==='confirm'){
          done()
        }else{
          orderCancel({ids:this.close_orderIds.join(',')}).then(res=>{
            // console.log(res.data);
            Toast(res.msg);
            if(res.code === 2000){
              this.getDetail();
            }
          });
          done();
        }

      }
    },
    onCopy(e){
      if(e.action === 'copy'){
        Toast('复制成功');
      }else{
        Toast('复制失败')
      }
    }
  }
}

</script>
<style lang='less' scoped>
@import "index";

  .child-view{
    padding-top: 100px;
    /*padding-bottom: 100px;*/
  }
</style>
