<template>
  <div class="bottomTab">
    <!-- 底部菜单栏 -->
    <div class="head-part">
      <div class="tab-group">
        <!-- <router-link to="/home" class="tab"><i classiconfont icon-msg"></i></router-link> -->
        <router-link to="/MessageList" class="tab">
          <i class="iconfont icon-comment"></i>
        </router-link>
        <!-- <router-link to="/message" class="tab"><i class="iconfont icon-compose"></i></router-link> -->
        <router-link to="/sinaRele" class="tab">
          <span class="icon iconfont icon-add"></span>
        </router-link>
        <router-link to="/me" class="tab">
          <span class="icon iconfont icon-xin"></span>
        </router-link>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.bottomTab {
    
  .head-part {
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    z-index: 20;
    display: flex;
    background: #ccc;
    justify-content: space-around;
  }

  .tab-group {
    width: 100%;
    max-width: 100%;
    background-color: #f5f5f5;
    -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
    display: flex;
    z-index: 1;
    overflow: hidden;
  }

  .tab {
    flex: 1;
    display: block;
    font-size: 0.875rem;
    font-weight: 700;
    text-align: center;
    line-height: 100px;
    height: 100px;
    color: #5d5d5d;
    position: relative;
    .active-tab {
      color: #ff8200;
      font-size: 0.9275rem;
      &:before {
        content: " ";
        width: 100%;
        height: 2px;
        background-color: #ff8200;
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 2;
      }
    }
  }
}
</style>
