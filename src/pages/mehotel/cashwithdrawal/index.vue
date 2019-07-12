<template>
  <div class="cashwithdrawal">
    <p class="bg20"></p>
    <div class="title">提现金额：</div>
<!--    <div class="input-box">-->
<!--      <span class="label">￥</span>-->
<!--    </div>-->
    <van-field
      readonly
      clickable
      :value="value"
      label="￥"
      label-width="50px"
      label-align="left"
      placeholder="请输入金额"
      class="price-input"
      @touchstart.native.stop="keyboard = true"
    ><van-icon slot="right-icon" name="cross"
               v-show="value"
               @click="deleteValue"/></van-field>
    <p class="bottom-tip">可提现余额：123元
      <span class="allGet"
            @click="value = total"
            v-show="total !== value">全部提取</span>
    </p>

    <van-button :disabled="!is_btn" class="get-price" type="primary" size="large" @click="getPrice">确认提取</van-button>

    <van-number-keyboard
      v-model="value"
      :show="keyboard"
      :maxlength="8"
      theme="custom"
      extra-key="."
      close-button-text="完成"
      @blur="keyboard = false"
      @input="onInput"
      @delete="onDelete"
    />
  </div>
</template>

<script>
import { Dialog } from 'vant';

export default {
  data(){
      return {
        value:'',
        keyboard:false,
        total:'123',
        is_btn:false,
      }
  },
  components: {
  },
  watch:{
    'value'(val){
      if(val){
        this.is_btn = true;
      }else{
        this.is_btn = false;
      }
    }
  },
  mounted(){},
  methods:{
    allGet(){
      this.value = this.total;
    },
    deleteValue(){
      this.value = '';
    },
    getPrice(){

    },
    onDelete(){
      // this.keyboard = false;
    },
    onInput(){

    }
  }
}

</script>
<style lang='less' scoped>
  .bg20{
    width: 100%;
    height: 20px;
    background-color: #f8f8f8;
  }
  .title{
    padding: 30px 40px;
    font-size: 24px;
    line-height: 40px;
    color: #333333;
    text-align: left;
  }
  .input-box{
    padding: 0 40px;
    line-height: 70px;
    border-bottom: 1px solid #eee;
    text-align: left;
    display: flex;
    justify-content: flex-start;
    .label{
      font-size: 24px;
      color: #333;
    }
  }
  /deep/ .price-input{
    margin: 0;
    padding: 0 40px;
    height: 80px;
    line-height: 80px;
    &:after{
      left: 0 !important;
    }
    color: #333;
    .van-field__label{
      font-size: 24px;
      text-align: left;
      span{
        line-height: 60px;
        vertical-align: bottom;
      }
    }
    .van-field__control{
      font-size: 50px;
      &::-webkit-input-placeholder{
        font-size: 30px;
      }
    }
  }
  .bottom-tip{
    line-height: 60px;
    font-size: 24px;
    color: #333333;
    text-align: left;
    padding: 0 40px;
    span{
      color: #0778af;
      margin-left: 20px;
    }
  }
  .get-price{
    width: 670px;
    height: 100px;
    background-color: #ff8900;
    border-radius: 10px;
    color: #fff;
    font-size: 36px;
    margin: 400px auto 0;
  }
</style>
