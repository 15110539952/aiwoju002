<template>
  <div class="cashqrcode">
    <p class="bg20"></p>
    <div class="date-top">
      <p>当前选择</p>
      <p>{{date}}
        <van-icon slot="right-icon" name="cross" @click="date=''"/>
      </p>
    </div>
    <van-datetime-picker
      v-model="currentDate"
      type="year-month"
      :formatter="formatter"
      :item-height="80"
      :show-toolbar="false"
      @change="changeDate"
    />
    <p class="all-detail">查看全部明细</p>
  </div>
</template>

<script>
import { Dialog } from 'vant';

export default {
  data(){
      return {
        currentDate:new Date(),
        date:'',
      }
  },
  components: {
  },
  mounted(){},
  methods:{
    formatter(type, value) {
      if (type === 'year') {
        return `${value}`;
      } else if (type === 'month') {
        return `${value}`
      }
      return value;
    },
    changeDate(picker){
      console.log(picker);
      console.log(picker.getValues());
      let date = picker.getValues();
      this.date = date[0] + '-' + date[1]
    },
  }
}

</script>
<style lang='less' scoped>
  .van-datetime-picker{
    width: 50%;
    margin: 110px auto 120px;
  }
  .date-top{
    padding: 30px 0;
    line-height: 40px;
    border-bottom: 1px solid #0778AF;
    color: #0778af;
    p:first-child{
      font-size: 20px;
    }
    p:last-child{
      height: 40px;
      font-size: 36px;
      position: relative;
      .van-icon{
        position: absolute;
        top: 0;
        right: 40px;
        color: #666;
      }
    }
  }
  .all-detail{
    font-size: 36px;
    padding: 15px 0;
    width: 40%;
    margin: 0 auto;
    border-top: 1px dotted #0778af;
    color: #0778af;
  }
  .bg20{
    width: 100%;
    height: 20px;
    background-color: #f8f8f8;
  }
</style>
