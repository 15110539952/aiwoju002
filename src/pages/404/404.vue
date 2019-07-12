<template>
  <div class="not-found-tip">
    <img class="top-right" src="~assets/img/404-top-circ.png">
    <div class="not-404">
      <img src="~assets/img/4-left.png">
      <img class="center-0" src="~assets/img/0-404.png">
      <img src="~assets/img/4-right.png">
      <p><span>404</span> 抱歉！您遇到贫瘠星球，在此一无所获</p>
    </div>
    <div class="back-home" @click="$router.push('/')">
      <p>返回首页</p>
      <img class="home-404" src="~assets/img/404-home.png">
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      title:'常用联系人'
    }
  },
  computed:{
  },
  components: {
    "v-header": header,
  },
  mounted(){
  }
};
</script>

<style scoped lang="less">
.not-found-tip {
  text-align: center;
  position: fixed;
  top:0;
  left: 0;
  width: 100%;
  height: 100%;
  .top-right{
    position: absolute;
    top: -129px;
    right: -118px;
    width: 214px;
    height: 215px;
  }
  .not-404{
    display: block;
    margin: 200px auto 120px;
    position: relative;
    p{
      position: absolute;
      bottom: 0;left: 0;
      text-align: center;
      width: 100%;
      span{
        font-family: Oswald-Regular;
      }
      font-size: 28px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 40px;
      letter-spacing: 0px;
      color: #333333;
    }
    img{
      vertical-align: middle;
    }
    .center-0{
      margin: 0 30px;
      /*width: 216px;*/
      /*height: 395px;*/
    }
  }
  .back-home{
    width: 198px;
    height: 429px;
    margin: 0 auto;
    position: relative;
    img{
      width: 100%;
      height: 100%;
    }
    p{
      position: absolute;
      left: 0;
      width: 100%;
      text-align: center;
      top: 170px;
      font-size: 24px;
      color: #333333;
    }
  }
}
</style>
