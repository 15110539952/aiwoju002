<template>
  <div class="setting">
    <v-header title="设置"></v-header>
    <div class="set-list">
      <div class="item bg-active">
        <p>头像</p>
        <p><span class="head"><van-image
        width="100%"
        height="100%"
        fit="cover"
        :src="modify.avatar"
      /></span><i class="iconfont iconarrow-right"></i></p>
      </div>
      <div class="item bg-active" @click="datePopup = true">
        <p>生日</p>
        <p><span class="item-text">{{birthday}}</span><i class="iconfont iconarrow-right"></i></p>
      </div>
      <div class="item">
        <p>性别</p>
        <div class="sex-type">
          <p :class="gender === 1?'active':''" @click="bindSex(1)">
            <img v-if="gender === 1" class="select-img" src="~assets/img/carcle-select-yes.png">
            <img v-else class="select-img" src="~assets/img/carcle-select-no.png">
            <span>男神</span></p>
          <p :class="gender === 2?'active':''" @click="bindSex(2)">
            <img v-if="gender === 2" class="select-img" src="~assets/img/carcle-select-yes.png">
            <img v-else class="select-img" src="~assets/img/carcle-select-no.png">
            <span>女神</span></p>
        </div>
      </div>
    </div>

    <van-popup class="date-popup" v-model="datePopup" position="right">
      <van-datetime-picker
        title="设置生日"
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        :item-height="88"
        :visible-item-count="5"
        @cancel="datePopup=false"
        @confirm="birthdayConfirm"
        :formatter="formatter"
      />
    </van-popup>
  </div>
</template>

<script>
import header from "@/components/Header/header";
import montent from 'moment'
import { Toast } from 'vant'
import {commonUrl}  from '@/commonJs/index.js'
import {modify,modifySubmit} from '@/api/index'

export default {
  data(){
      return {
        datePopup:false,
        currentDate: new Date(),
        minDate: new Date('1950-01-01'),
        maxDate: new Date(),
        birthday: '',
        gender:0, // 1男，2女
        modify:'',
      }
  },
  components: {
      "v-header": header,
  },
  mounted(){
    modify().then(res=> {
      this.modify = res.data;
      this.birthday = res.data.birthday;
      this.gender = res.data.gender;
    });
  },
  methods:{
    birthdayConfirm(){
      this.birthday = montent(this.currentDate).format('YYYY-MM-DD');
      console.log(this.birthday)
      this.datePopup = false; // 关闭生日选择
      modifySubmit({birthday:this.birthday}).then(res=> {
        Toast(res.msg);
      });
    },
    bindSex(i){
      this.gender = i;
      modifySubmit({gender:this.gender}).then(res=> {
        Toast(res.msg);
      });
    },
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`
      }else if (type === 'day'){
        return `${value}日`
      }
      return value;
    }
  }
}

</script>
<style lang='less' scoped>
  /deep/ .date-popup{
    width: 100%;
    height: 100%;
    .van-picker__columns{
      margin-top: 200px;
    }
    .van-picker__cancel, .van-picker__confirm{
      color: #ff8900;
    }
    .van-picker{
      width: 100%;
      top: 0;
      position: absolute;
    }
    .van-picker__title{
      color: #666;
      font-weight: inherit;
    }
  }
  .sex-type{
    display: flex;
    justify-content: flex-end;
    p{
      .select-img{
        width: 23px;
        height: 23px;
        vertical-align: middle;
        margin-right: 15px;
      }
      &:first-child{
        margin-right: 50px;
      }
      width: 100px;
      text-align: center;
      color: #333;
      &:active{
        /*background: #f2f3f5;*/
      }
      &.active{
        color: #ff3500;
      }
    }
  }
  .set-list{
    font-size: 24px;
    color: #333333;
    line-height: 90px;
    padding: 0 40px;
    .head{
      vertical-align: middle;
      margin-right: 20px;
      display: inline-block;
      border-radius: 50%;
      width: 58px;
      height: 58px;
      /deep/ img{
        border-radius: 50%;
      }
    }
    .item{
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-between;
      &.bg-active:active{
        background: #f2f3f5;
      }
      .iconfont:before{
        color: #086fa1;
        font-size: 20px;
      }
      .item-text{
        margin-right: 20px;
      }
    }
  }
</style>
