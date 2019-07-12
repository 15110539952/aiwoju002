<template>
  <div class="contacts">
    <div class="contacts-list">
      <div class="contact-item" v-for="(item,index) in checkinList">
        <div class="name-phone">
          <span class="name">{{item.name}}</span><span>{{item.phone}}</span>
        </div>
        <p class="edit"  @click="$router.push({name:'contacts-save',params: {name: 'edit',id:item.id}})">编辑</p>
      </div>
    </div>
    <div class="footer">
      <van-button class="add-contact" type="primary" size="large" @click="$router.push({name:'contacts-save',params: {name: 'add'}})">新增联系人</van-button>
    </div>
  </div>
</template>

<script>
import header from "@/components/Header/header";
import { Dialog } from 'vant';
import { Toast } from 'vant'
import {commonJs}  from '@/commonJs/index.js';
import {checkinList}  from '@/api/index';

export default {
  data(){
      return {
        checkinList:''
      }
  },
  components: {
      "v-header": header,
  },
  mounted(){
    checkinList().then(res=>{
      this.checkinList = res.data;
    });
  },
  methods:{
    changePhone(){

      Dialog.confirm({
        title: '确认更换手机号？',
        message: ''
      }).then(() => {
        // on confirm
      }).catch(() => {
        // on cancel
      });
    },
  }
}

</script>
<style lang='less' scoped>
  .contacts-list{
    font-size: 24px;
    color: #333333;
    line-height: 88px;
    padding: 0 40px 230px;
    .contact-item{
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-between;
      .name{
        display: inline-block;
        width: 100px;
        margin-right: 20px;
      }
      .edit{
        display: inline-block;
        padding: 0 20px;
        font-size: 20px;
        color: #0778af;
        &:active{
          background: #f2f3f5;
        }
      }
    }
  }
  .footer{
    background: #fff;
    position: fixed;
    height: 230px;
    width: 100%;
    bottom: 0;
    left: 0;
  }
  .add-contact{
    position: fixed;
    width: 670px;
    height: 100px;
    line-height: 100px;
    left: 40px;
    bottom: 107px;
    border-radius: 10px;
    border: solid 1px #666666;
    background: #FF8900;
    color: #fff;
    font-size: 36px;
  }
</style>
