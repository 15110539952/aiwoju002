<template>
  <div id="header">
    <p class="back" @click="back"><i class="iconfont iconarrow-left"></i></p>
    <div class="title">{{title}}</div>
    <slot class="right" name="right-icon"><i></i></slot>
  </div>
</template>
<script>
export default {
  props: ["title",'img'],
  methods:{
    back(){
      this.$router.goBack(-1);
    }
  }
};
</script>
<style lang="less" scoped>
#header {
  display: flex;
  justify-content: space-between;
  height: 100px;
  line-height: 100px;
  text-align: center;
  color: #333;
  font-size: 36px;
  position: fixed;
  top:0;
  left: 0;
  width: 100%;
  z-index: 9;
  background: #fff;
  .iconfont:before{
    font-size: 36px;
  }
  i{
    font-size: 36px;
    display: inline-block;
    width: 100px;
  }
  .title {
    line-height: 100px;
    //@include border-1px(#ccc);
  }
}
</style>
