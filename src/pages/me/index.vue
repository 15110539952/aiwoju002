<template>
  <div>
    <div class="banner">
      <i class="iconfont iconsetting" @click="$router.push('/setting')"></i>
      <div class="head-bg">
        <div class="head">
          <van-image
            width="100%"
            height="100%"
            fit="cover"
            :src="modify.avatar"
            />
        </div>
        <p class="head-bm">{{modify.gender===2?'Female':'Gentleman'}}</p>
      </div>
      <p class="username">星旅者XT01</p>
      <div class="me-type">
        <div class="item"><span>{{info.score || 0}}</span><p>我的积分</p></div>
        <div class="item" @click="$router.push('/myevaluate')"><span>{{info.comment}}</span><p>我的评价</p></div>
        <div class="item" @click="$router.push('/contacts/home')"><span>{{info.contact}}</span><p>联系人</p></div>
        <div class="item"><span>-</span><p>优惠券</p></div>
      </div>
      <div class="banner-bg-bottom"></div>
    </div>
    <div class="hotel-broker">
      <p class="title" @click="$router.push('/mehotel/home')">酒店经纪人 <i class="iconfont iconarrow-right"></i></p>
      <div class="qrcode" v-if="info.is_agent">
        <img :src="url+info.qrcode">
        <p>我的推广二维码</p>
      </div>
      <div class="broker-type" v-if="info.is_agent">
        <div class="item"><span>{{info.balance}}</span><p>当前佣金</p></div>
        <div class="item"><span>{{info.already_tixian}}</span><p>已提取</p></div>
        <div class="item"><span>{{info.tixian}}</span><p>可提取</p></div>
      </div>
      <div v-else><van-button type="primary" size="large" @click="registerAgent">注册成为酒店经纪人</van-button></div>

    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
import header from "@/components/Header/header";
import footer from "@/components/Footer";
import { Toast } from 'vant'
import {commonUrl}  from '@/commonJs/index.js'
import {user,modify,registerAgent} from '@/api/index'

export default {
  data(){
      return {
        url:commonUrl.url,
        info:'',
        modify:'',
      }
  },
  components: {
      "v-header": header,
      "v-footer": footer,
  },
  mounted(){
    user().then(res=> {
      this.info = res.data;
    });
    modify().then(res=> {
      this.modify = res.data;
    });

  },
  methods:{
    registerAgent(){
      registerAgent().then(res=>{
        Toast(res.msg);
        this.info.is_agent = 1;
      });
    }
  }
}

</script>
<style lang='less' scoped>
  @import 'index';
  .child-view{
    padding-bottom: 100px;
  }
</style>
