<template>
  <div class="home">
    <div class="banner">
      <div class="head-bg">
        <div class="head">
          <van-image
            width="100%"
            height="100%"
            fit="cover"
            :src="require('assets/img/dear.png')"
          />
        </div>
        <p class="head-bm">Handsome</p>
      </div>
      <p class="username">星旅者XT01</p>
    </div>
    <div class="me-type">
      <div class="item one"><span>99999999</span><p>当前佣金</p></div>
      <div class="item two"><span>99999999</span><p>已提取</p></div>
      <div class="item three"><span>99999999</span><p>可提取</p></div>
    </div>
    <div class="draw-commission" @click="$router.push('/mehotel/cashwithdrawal')">提取佣金</div>

    <div class="distribution">
      <div class="item" @click="$router.push('/mehotel/cashdetail')">
        <p><img src="~assets/img/tixianmingxi.png"></p>
        <p>提现明细</p>
      </div>
      <div class="item" @click="$router.push('/mehotel/distributionlist')">
        <p><img src="~assets/img/fenxiaoshouru.png"></p>
        <p>分销收入</p>
      </div>
      <div class="item" @click="$router.push('/mehotel/cashorder')">
        <p><img src="~assets/img/fenxiaodingdan.png"></p>
        <p>分销订单</p>
      </div>
      <div class="item" @click="$router.push('/mehotel/cashqrcode')">
        <p><img src="~assets/img/fenxiaoma.png"></p>
        <p>我的分销码</p>
      </div>
    </div>
    <div class="get-commission">赚佣金</div>

  </div>
</template>

<script>
import header from "@/components/Header/header";
import { Dialog } from 'vant';

export default {
  data(){
      return {

      }
  },
  components: {
      "v-header": header,
  },
  mounted(){},
  methods:{

  }
}

</script>
<style lang='less' scoped>
  @import 'index';
</style>
