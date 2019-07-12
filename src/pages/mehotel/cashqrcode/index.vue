<template>
  <div class="cashqrcode">
    <p class="bg20"></p>
    <div class="qrcode">
      <img class="qrcode-img" src="~assets/img/dear.png">
    </div>
    <img class="qrcode-tip" src="~assets/img/qrcode-tip.png">
    <p class="line"></p>
    <p class="tip">分享二维码赚佣金</p>
  </div>
</template>

<script>
import { Dialog } from 'vant';

export default {
  data(){
      return {

      }
  },
  components: {
  },
  mounted(){},
  methods:{

  }
}

</script>
<style lang='less' scoped>
  .bg20{
    width: 100%;
    height: 20px;
    background-color: #f8f8f8;
  }
  .qrcode{
    display: block;
    margin: 104px auto 134px;
    width: 428px;
    height: 428px;
    border: 5px solid #c1bdb2;
    padding: 40px;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .qrcode-tip{
    display: block;
    margin: 0 auto;
    width: 189px;
    height: 217px;
  }
  .line{
    width: 270px;
    margin: 0 auto 20px;
    border-bottom: 1px dashed #0778AF;
  }
  .tip{
    font-size: 36px;
    line-height: 40px;
    color: #0778af;
  }
</style>
