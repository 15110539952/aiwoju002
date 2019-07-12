<template>
  <div class="order">
    <v-header title="订单"></v-header>
    <div class="order-tab">
      <div class="tab one"
           :class="tabId===1?'active':''"
           @click="changeTab(1)">待付款<span class="one" v-if="wait_pay>0">{{wait_pay}}</span></div>
      <div class="tab two"
           :class="tabId===2?'active':''"
           @click="changeTab(2)">待入住/评价<span class="two" v-if="wait_live>0">{{wait_live}}</span></div>
      <div class="tab three"
           :class="tabId===3?'active':''"
           @click="changeTab(3)">退款单<span class="three" v-if="wait_refund>0">{{wait_refund}}</span></div>
      <div class="tab four"
           :class="tabId===0?'active':''"
           @click="changeTab(0)">全部</div>
    </div>

    <EasyRefresh
      ref="easyRefresh"
      :userSelect="false"
      :autoLoad="false"
      :animationDuration="200"
      :loadMore="loadMore">
    <!--region 订单列表-->
    <v-orderList :orderList="orderData"></v-orderList>
    <!--endregion-->
<!--    <div class="month-list" v-if="tabId === 0">-->
<!--      <p class="month-item"><span>11</span>月订单</p>-->
<!--      <p class="month-item"><span>10</span>月订单</p>-->
<!--    </div>-->
    <p class="hotel-tip">遇到问题请拨打客服：4008525636</p>

    <div class="no-order" v-show="!orderList.length">
      <img src="~assets/img/no-content.png">
      <p>您还没有订单哦，快去逛逛吧!</p>
    </div>


    <template v-slot:footer>
      <BallPulseFooter :height="140"/>
    </template>
    </EasyRefresh>
  </div>
</template>

<script>
import header from "@/components/Header/header";
import orderListTemplate from "@/components/OrderList/orderList";
import { Toast } from 'vant'
import {commonJs,weekDay}  from '@/commonJs/index.js'
import {orderList} from '@/api/index'

export default {
  name:'order',
  data(){
      return {
        tabId:0,
        orderData:[],
        wait_pay:'',
        wait_live:'',
        wait_refund:'',

        last_page:'', // 最后页码
        current_page:1, // 当前第几页
      }
  },
  components: {
      "v-header": header,
      "v-orderList": orderListTemplate,
  },
  mounted() {
    // this.tabId = this.$route.params.id || 0;
    this.tabId = parseInt(sessionStorage.getItem('orderTabId')) || 0;
    console.log(this.tabId);
    this.getOrderList();
  },
  methods:{
    changeTab(index){
      this.tabId = index;
      sessionStorage.setItem('orderTabId',index);

      // this.orderData = [];
      this.$refs.easyRefresh.scrollTo(0,0);
      this.current_page = 1;
      this.getOrderList();
    },
    getOrderList(){
      orderList({status: this.tabId===0?'99':this.tabId,page:this.current_page}).then(res=>{
        this.wait_pay = res.data.wait_pay;
        this.wait_live = res.data.wait_live;
        this.wait_refund = res.data.wait_refund;

        this.last_page = res.data.last_page;
        this.current_page += 1;

        let dataList = res.data.data;
        dataList.forEach(item=>{
          item.status = parseInt(item.status);
        });
        this.orderData = dataList;
      })
    },
    loadMore(done){
      if(this.current_page>this.last_page){
        Toast('没有更多了')
        done(false);
        return;
      }
      orderList({status: this.tabId===0?'99':this.tabId,page:this.current_page}).then(res=>{
        this.last_page = res.data.last_page;
        let dataList = res.data.data;
        dataList.forEach(item=>{
          item.status = parseInt(item.status);
        });
        this.orderData = this.orderData.concat(dataList);
        if(this.current_page<=this.last_page){
          this.current_page += 1;
          done(false);
        }else{
          done(false);
        }
      })
    },
  },
  activated(){
    this.room_type_id = this.$route.query.id;
    if(this.$route.meta.ifDoFresh){
      //重置ifDoFresh
      this.$route.meta.ifDoFresh = false;
      //获取列表数据方法第一参数为是否重置搜索条件和页数
      this.$refs.easyRefresh.scrollTo(0,0);
      this.current_page = 1;
      this.getOrderList();
    }else{

    }
  },
  beforeRouteEnter (to, from, next) {
    if(from.name === 'evaluateAdd') {
      to.meta.ifDoFresh = true;
    }
    next();
  }
}

</script>
<style lang='less' scoped>
  @import 'index';
  .child-view{
    height: 100%;
    padding-top: 190px;
  }

</style>
