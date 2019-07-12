<template>
  <div class="set-phone">
    <div class="input-phone" v-if="!verifyShow">
      <p class="title">输入新手机号</p>
      <p class="phone-small-title">手机号</p>
      <van-field
        label-align="left"
        v-model="phone"
        label="+86："
        maxlength="11"
        label-width="100px"
        placeholder="请输入联系人手机号码"
      />

      <van-button :disabled="verifyDisabled"
                  class="outLogin"
                  :class="verifyDisabled?'':'active'"
                  size="large"
                  @click="verifyShow=true">获取验证码</van-button>

    </div>
    <div v-else class="input-verify">
      <p class="verify-title">请输入验证码</p>
      <p class="verify-small-title">手机号 12345678901</p>
      <van-password-input
        :mask="false"
        :value="value"
        gutter="20px"
        @focus="showKeyboard = true"
      />
      <p class="repeat-verify" :class="'active'">发送验证码 30s后重新发送验证码</p>

      <van-button class="verify-btn"
                  size="large"
                  @click="verifyShow=true">确认</van-button>
    </div>

    <van-number-keyboard
      :show="showKeyboard"
      close-button-text="关闭"
      theme="custom"
      @input="onInput"
      @delete="onDelete"
      @blur="showKeyboard = false"
    />
  </div>
</template>

<script>
import header from "@/components/Header/header";

export default {
  data(){
      return {
        phone:'',
        verifyDisabled:!true,
        verifyShow:false,
        value:'',
        showKeyboard: false
      }
  },
  components: {
      "v-header": header,
  },
  mounted(){},
  methods:{
    onInput(key) {
      this.value = (this.value + key).slice(0, 6);
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    },
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
  .van-password-input{
    margin: 40px 0 0;
    li{
      border-radius: 10px;
      border: solid 3px #bfbfbf;
    }
  }
  /deep/ .van-cell {
    font-size: 24px;
    padding: 20px 0;
    .van-field__label {
      text-align: left;
      color: #666;
    }
    .van-cell__value{
      color: #333;
    }
  }
  .repeat-verify{
    margin-top: 40px;
    font-size: 24px;
    line-height: 40px;
    color: #ff3500;
    text-align: right;
    &.active{
      color: #086fa1;
      &:active{
        text-decoration: underline;
      }
    }
  }
  .set-phone{
    padding: 40px ;
    text-align: left;
  }
  .input-phone{
    .phone-small-title{
      font-size: 28px;
      color: #333333;
      margin-top: 80px;
    }
  }
  .input-verify{
    .verify-title{
      margin: 40px 0 30px;
      font-size: 50px;
      color: #666666;
    }
    .verify-small-title{
      font-size: 26px;
      color: #383838;
      margin-top: 30px;
    }
  }
  .title{
    font-size: 36px;
    text-align: left;
  }

  .outLogin{
    position: fixed;
    width: 670px;
    left: 40px;
    bottom: 107px;
    border-radius: 10px;
    background: #fff;
    border: 1px solid #999 !important;
    color: #666;font-size: 36px;
    &.active{
      background: #ff8900;
      color: #fff;
    }
  }
  .verify-btn{
    width: 670px;
    margin: 200px auto 0;
    background: #FF8900;
    color: #fff;
    border: 0;
    border-radius: 10px;
  }
</style>
