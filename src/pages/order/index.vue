<template>
  <div class="order">
    <div class="order-tab">
      <div class="tab"
           @click="myOrder(1)">待付款<span class="one" v-if="wait_pay>0">{{wait_pay}}</span></div>
      <div class="tab two"
           @click="myOrder(2)">待入住/评价<span class="two" v-if="wait_live>0">{{wait_live}}</span></div>
      <div class="tab"
           @click="myOrder(3)">退款单<span class="three" v-if="wait_refund>0">{{wait_refund}}</span></div>
      <div class="tab four"
           @click="myOrder(0)">全部</div>
    </div>
    <EasyRefresh
      ref="easyRefresh"
      :userSelect="false"
      :autoLoad="false"
      :loadMore="loadMore">
      <div class="new-order-title">最新订单</div>
    <!--region 订单列表-->
    <v-orderList :orderList="orderData"></v-orderList>
    <!--endregion-->

    <div class="no-order" v-show="!orderData.length">
      <img src="~assets/img/no-content.png">
      <p>您还没有订单哦，快去逛逛吧!</p>
    </div>


    <template v-slot:footer>
      <BallPulseFooter :height="140"/>
    </template>
    </EasyRefresh>
    <v-footer></v-footer>
  </div>
</template>

<script>
import header from "@/components/Header/header";
import orderListTemplate from "@/components/OrderList/orderList";
import footer from "@/components/Footer";
import { Toast } from 'vant'
import {commonJs,weekDay}  from '@/commonJs/index.js'
import {orderList} from '@/api/index'


export default {
  name:'order',
  data(){
      return {
        orderList:[
          {
            name:'',
            status:0, // 待支付
          },
          {
            name:'',
            status:1, // 待确认
          },
          {
            name:'',
            status:2, // 待入住
          },
          {
            name:'',
            status:3, // 待评价
          },
          {
            name:'',
            status:4, // 已取消
          },
          {
            name:'',
            status:5, // 已退款
          },
          {
            name:'',
            status:6, // 已关闭
          },
        ],
        orderData:[],
        totalList:'',
        wait_pay:'',
        wait_live:'',
        wait_refund:'',

        last_page:'', // 最后页码
        current_page:1, // 当前第几页
      }
  },
  components: {
      "v-header": header,
      "v-footer": footer,
      "v-orderList": orderListTemplate,
  },
  mounted() {
    orderList({status:'98',page:this.current_page}).then(res=>{
      this.wait_pay = res.data.wait_pay;
      this.wait_live = res.data.wait_live;
      this.wait_refund = res.data.wait_refund;
      this.last_page = res.data.last_page;
      let dataList = res.data.data;
      dataList.forEach(item=>{
        item.status = parseInt(item.status);
      });
      this.orderData = dataList;
    })
  },
  methods:{
    myOrder(index){
      // this.$router.push({name:'myorder',params: {id: 2}})
      this.$router.push({path:'/myorder'});
      sessionStorage.setItem('orderTabId',index);
    },
    loadMore(done){
      if(this.current_page>this.last_page){
        Toast('没有更多了')
        done(true);
        return;
      }
      orderList({status:'98',page:this.current_page}).then(res=>{
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
          Toast('没有更多了')
          done(true);
        }
      })
    }
  }
}

</script>
<style lang='less' scoped>
  @import 'index';
  .child-view{
    height: 100%;
    padding: 100px 0;
  }

</style>
