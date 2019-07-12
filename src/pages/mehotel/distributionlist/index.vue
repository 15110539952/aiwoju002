<template>
  <div class="distributionlist">
    <div class="top-fixed">
      <div class="top-info">
        <p class="left">查看<span @click="$router.push('/mehotel/recordingtime')">本月 <i class="iconfont iconarrow-right"></i></span></p>
        <div class="right">
          <p>历史累计收入:</p>
          <p>￥<span>123456</span></p>
        </div>
      </div>
      <div class="cashtotal">1月共<span>10</span>单，合计<span>200</span>元</div>
    </div>

    <div class="list">
      <div class="item" v-for="(item,index) in 30">
        <p class="one">{{index+=1}}</p>
        <p class="two">2019-01-01</p>
        <p class="three">23:00</p>
        <p class="four">￥20</p>
      </div>
    </div>
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
    changeSocial(){
      Dialog.confirm({
        title: '确认更换手机号？',
        message: '解除绑定后将退出登录，下次登录需重新获取微信授权',
        confirmButtonText:'解除绑定',
      }).then(() => {
        // on confirm
      }).catch(() => {
        // on cancel
      });
    }
  }
}

</script>
<style lang='less' scoped>
  .list{
    margin-top: 160px;
    padding: 20px 0;
    text-align: center;
    .item{
      display: flex;
      justify-content: space-between;
      line-height: 60px;
      color: #333333;
      font-size: 24px;
      .one{
        width: 100px;
      }
      .two{
        width: 240px;
      }
      .three{
        width: 180px;
      }
      .four{
        width: 230px;
        padding-right: 40px;
        text-align: right;
      }
    }
  }
  .top-fixed{
    position: fixed;
    top: 100px;
    left: 0;
    width: 100%;
    background-color: #fff;
  }
  .top-info{
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 70px 0 40px;
    height: 80px;
    background-color: #f8f8f8;
    position: relative;
    color: #333;
    .left{
      line-height: 80px;
      font-size: 24px;
      color: #333;
      text-align: left;
      span{
        color: #0778af;
        margin-left: 20px;
      }
    }
    .right{
      display: flex;
      justify-content: center;
      flex-direction: column;
      text-align: right;
      p:first-child{
        font-size: 18px;
      }
      p:last-child{
        color: #ff000c;
        font-size: 20px;
        span{
          font-size: 28px;
        }
      }
    }
    &:after{
      position: absolute;
      content:'';
      width: 2px;
      height: 40px;
      top: 20px;
      left: 50%;
      background-color: #c1bdb2;
    }
  }
  .cashtotal{
    text-align: left;
    height: 80px;
    line-height: 80px;
    font-size: 24px;
    color: #333333;
    padding: 0 40px;
    span{
      color: #ff0000;
    }
    border-bottom: 1px solid #eee;
  }
</style>
