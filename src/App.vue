<template>
  <div id="app">
    <!--    <transition :name="transitionName"></transition>-->
    <!--region 是否缓存当前组件-->
    <!--endregion-->

    <!--    <transition :name="transitionName">-->
    <!--      <navigation>-->
    <!--        <router-view class="child-view"></router-view>-->
    <!--      </navigation>-->
    <!--    </transition>-->
    <!--    <transition :name="transitionName">-->
    <!--      <keep-alive include = 'hotelorder'>-->
    <!--        <router-view class="child-view"></router-view>-->
    <!--      </keep-alive>-->
    <!--    </transition>-->

    <transition :name="transitionFade">
      <keep-alive>
        <router-view v-if="$route.meta.isKeepLive" class="child-view"></router-view>
      </keep-alive>
    </transition>

    <transition :name="transitionFade">
      <router-view v-if="!$route.meta.isKeepLive" class="child-view"></router-view>
    </transition>

    <!--    <van-loading v-show="loading.show"-->
    <!--                 class="loading-bg"-->
    <!--                 size="100px"-->
    <!--                 text-size="50px"-->
    <!--                 type="spinner"-->
    <!--                 vertical>{{loading.msg}}</van-loading>-->
  </div>
</template>

<script>
  import './assets/css/mintui-reset.css'

  import { Toast } from 'vant';

  export default {
    name: 'App',
    computed:{
      loading () {
        return { show:true, msg: '加载中' }
        // return this.$store.getters.loading
      },
      token(){
        return this.$store.getters.token
      }
    },
    mounted() {
      // document.addEventListener('DOMContentLoaded', function () {
      //   var deviceWidth = document.documentElement.clientWidth
      //   document.documentElement.style.fontSize = deviceWidth / 10 + 'px'
      // }, false)
      // window.onresize = function () {
      //   var deviceWidth = document.documentElement.clientWidth
      //   document.documentElement.style.fontSize = deviceWidth / 10 + 'px'
      // }
      // console.log(window.location.href)
      let dateTime = new Date().getTime();
      let expires_in = localStorage.getItem('expires_in');
      if(dateTime>parseInt(expires_in)){
        localStorage.clear();
        location = location;
      }
      if(process.env.NODE_ENV === 'development'){
        // this.$store.dispatch('setToken', {token:'712aa988-d076-4e11-8781-104460594cde',expires_in:31536000});
        this.$store.dispatch('setToken', {token:'7b97a4b6-ec85-44d2-8bfb-2be92d09c7e3',expires_in:31536000});
        console.log(this.token);
      }else{
        if(!this.token){
          let code = this.$utils.getUrlKey('code');
          if(!code){
            let invite = this.$utils.getUrlKey('invite') || '';
            location.href=`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc4c761371120fe9b&redirect_uri=${encodeURIComponent(window.location.href)}&response_type=code&scope=snsapi_userinfo&state=${invite}#wechat_redirect`;
          }else{
            let state = this.$utils.getUrlKey('state') || '';
            this.$ajax.get('api/user/third',{code:code,invite:state}).then((res)=>{
              console.log(res);
              this.$store.dispatch('setToken', {token:res.data.token,expires_in:res.data.expires_in});
              location = location;
            });
          }
        }
      }

      // window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc4c761371120fe9b&redirect_uri=${encodeURIComponent(window.location.href)}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
      // window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc4c761371120fe9b&redirect_uri=&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
      // window.location.href = `http://xt.aixingtuan.com/third/connect/wechat?url=${encodeURIComponent(window.location.href)}`;
    },
    data (){
      return {
        transitionFade: 'fade',
        // transitionName: 'slide-right',
      }
    },
    watch:{
      '$route' (to, from) {
        if(to.name === 'home'
          || to.name === 'me'
          || to.name === 'order'){
          if(from.name === 'home'
            || from.name === 'me'
            || from.name === 'order'){
            this.transitionName = 'fade';
            return;
          }
        }
        let isBack = this.$router.isBack  //  监听路由变化时的状态为前进还是后退
        if(isBack) {
          this.transitionName = 'slide-right'
        } else {
          this.transitionName = 'slide-left'
        }
        this.$router.isBack = false
      },
    },
    activated(){

    },
    beforeRouteUpdate (to, from, next) {
      let isBack = this.$router.isBack
      if (isBack) {
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = 'slide-left'
      }
      this.$router.isBack = false
      next()
    },
  }
</script>

<style lang="less">
  @import 'assets/css/main.css';

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    height: 100%;
    position: relative;
  }


  .child-view {
    position: absolute;
    width:100%;
    min-height: 100%;
    transition: all .5s cubic-bezier(.55,0,.1,1);
    /*width: 100%;*/
    /*height:100%;*/
    /*position: absolute;*/
    /*top: 0;*/
    /*bottom: 0;*/
    /*margin: 0 auto;*/
    /*overflow-y: auto;*/
    /*overflow-x: hidden;*/
    /*-webkit-overflow-scrolling: touch;*/
  }
  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
  }
  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-100%, 0);
    transform: translate(-100%, 0);
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }


  // 确认弹窗 样式修改vant
  .van-dialog__footer--buttons{
    .van-button--default{
      .van-button__text{
        color: #0778af;
      }
    }
    .van-dialog__confirm{
      .van-button__text{
        color: #ff3500;
      }
    }
  }
</style>
