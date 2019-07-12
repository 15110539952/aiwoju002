<template>
  <div class="setting">
    <div class="set-list">
      <div class="item" @click="changeSocial">
        <p>微信</p>
        <p><span class="item-text">绑定</span><i class="iconfont iconarrow-right"></i></p>
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
  .set-list{
    font-size: 24px;
    color: #333333;
    line-height: 90px;
    padding: 0 40px;
    .item{
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-between;
      &:active{
        background: #f2f3f5;
      }
      .iconfont:before{
        color: #086fa1;
        font-size: 20px;
      }
      .item-text{
        margin-right: 20px;
      }
      //position: relative;
      //&:after{
      //  content: '';
      //  width: 670px;
      //  position: absolute;
      //  bottom: 0;
      //  left: 40px;
      //  height: 1px;
      //  background: #eee;
      //}
    }
  }
  .outLogin{
    position: fixed;
    width: 670px;
    left: 40px;
    bottom: 107px;
    border-radius: 10px;
    border: solid 1px #666666;
    background: #fff;
    color: #666;font-size: 36px;

  }
</style>
