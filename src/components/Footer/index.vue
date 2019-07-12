<template>
  <div class="footer">
    <van-tabbar
      route
      v-model="active"
      active-color="#FF8900"
      inactive-color="#333"
    >
      <van-tabbar-item
        replace
        to="/"
      >
        <span>首页</span>
        <img
          class="home"
          slot="icon"
          slot-scope="props"
          :src="props.active ? iconList[0].active : iconList[0].normal">
      </van-tabbar-item>
      <van-tabbar-item
        replace
        to="/order">
        <span>订单</span>
        <img
          class="order"
          slot="icon"
          slot-scope="props"
          :src="props.active ? iconList[1].active : iconList[1].normal">
      </van-tabbar-item>
      <van-tabbar-item
        replace
        to="/me">
        <span>个人中心</span>
        <img
          class="me"
          slot="icon"
          slot-scope="props"
          :src="props.active ? iconList[2].active : iconList[2].normal">
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name:'Footer',
  data() {
    return {
      active: 0,
      iconList:[
        {
          normal: require('assets/img/home.png'),
          active: require('assets/img/home-active.png')
        },
        {
          normal: require('assets/img/order.png'),
          active: require('assets/img/order-active.png')
        },
        {
          normal: require('assets/img/me.png'),
          active: require('assets/img/me-active.png')
        }
      ],
    }
  }
}

</script>
<style lang='less' scoped>
  .footer{
    position: fixed;
    width: 100%;
    height: 100px;
    left: 0;
    bottom: 0;
  }
  img{
    &.home{
      width: 57px;
      height: 56px;
    }
    &.order{
      width: 54px;
      height: 56px;
    }
    &.me{
      width: 54px;
      height: 56px;
    }
  }
</style>
