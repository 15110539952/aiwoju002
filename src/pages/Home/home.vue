<template>
  <div>
<!--      <v-header title="solr测试"></v-header>-->
    <div class="banner">
      <van-swipe :autoplay="5000" indicator-color="white">
        <van-swipe-item v-for="(item,index) in images" :key="'img_'+index">
          <van-image
            width="100%"
            height="100%"
            fit="cover"
            :src="url+item"
          />
<!--          <img class="banner-img" :src="item">-->
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="hotel-name">{{hotel.name}}</div>
    <div class="hotel-select-block">
      <div class="date-select van-hairline--top" @click="showCalendar = true;nowDate = new Date()">
        <img src="~assets/img/date-time.png" alt="">
        <div class="content">
          <p class="font55">{{startDateText}}</p>
          <p class="column">
            <span><span class="font24">{{startMonthText}}</span><span class="font20">月</span></span>
            <span class="font24">周{{startDate | week}}</span>
          </p>
          <p>入住</p>
          <p>—</p>
          <p>离店</p>
          <p class="font55">{{endDateText}}</p>
          <p class="column">
            <span><span class="font24">{{endMonthText}}</span><span class="font20">月</span></span>
            <span class="font24">周{{endDate | week}}</span>
          </p>
          <p><span class="font36">{{day}}</span><span class="font24">晚</span></p>
        </div>
        <img src="~assets/img/arrow-right.png" alt="">
      </div>
      <div class="hour-home van-hairline--top"
           @click="is_hour_home=!is_hour_home">
        <img :src="is_hour_home?require('assets/img/select-yes.png'):require('assets/img/select-no.png')" alt="">
        <span>钟点房</span>
      </div>
      <div class="btn-block van-hairline--top">
        <van-button type="primary" size="large" @click="go()">订房间</van-button>
      </div>
    </div>
<!--    <div class="notice-tip">-->
<!--      <img src="~assets/img/notice.png">-->
<!--      <span></span>-->
<!--    </div>-->
    <van-notice-bar
      class="notice-tip"
      :speed="80"
      :text="notice"
      :left-icon="require('assets/img/notice.png')"
    />
    <div class="integral">
      <div class="left">
        <span class="big">每日积分</span>
        <span class="small">累计{{all_score}}分</span>
      </div>
      <div class="content">
        <div :class="continuity === 1?'two':'side'" @click="addScore(continuity === 1)">
          <p class="integral-bg"><span>+</span><span>{{continuity===1?continuity:continuity===7?continuity-2:continuity-1}}</span></p>
          <p class="bottom">第{{continuity===1?continuity:continuity===7?continuity-2:continuity-1}}天</p>
          <p class="get" v-show="continuity === 1 && already === 2">点击领取</p>
        </div>
        <div :class="continuity !== 1&&continuity!==7?'two':'side'" @click="addScore(continuity !== 1&&continuity!==7)">
          <p class="integral-bg"><span>+</span><span>{{continuity===1?continuity+1:continuity===7?continuity-1:continuity}}</span></p>
          <p class="bottom">第{{continuity===1?continuity+1:continuity===7?continuity-1:continuity}}天</p>
          <p class="get" v-show="continuity !==1 && continuity !== 7  && already === 2">点击领取</p>
        </div>
        <div :class="continuity === 7?'two':'side'" @click="addScore(continuity === 7)">
          <p class="integral-bg"><span>+</span><span>{{continuity===7?continuity:continuity===1?continuity+2:continuity+1}}</span></p>
          <p class="bottom">第{{continuity===7?continuity:continuity===1?continuity+2:continuity+1}}天</p>
          <p class="get" v-show="continuity === 7 && already === 2">点击领取</p>
        </div>
      </div>
      <div class="right">每七日一轮</div>
    </div>
    <v-footer></v-footer>
    <van-popup v-model="showCalendar" position="right" style="height:100%;width:100%;">
      <calender
        :date="nowDate"
        :monthNumber="4"
        @closeProp="showCalendar=false"
        v-on:asureEvent="asureClick"
        :onlyOne="roomType === 1 ? false : true"
        :isShowDatePicker="isShowDatePicker"
      ></calender>
<!--      <inlineCalendar />-->
    </van-popup>
    <div></div>
  </div>
</template>

<script>
import footer from "@/components/Footer";
import Calender from '@/components/Calender/calender.vue'
import { Toast } from 'vant'
import {isten,commonJs,weekDay}  from '@/commonJs/index.js'
import {home,homeAddScore,timeLimit} from '@/api/index'


var moment = require('moment');
// console.log(moment().format('l'));
// console.log(moment().date());
// console.log(moment().toArray());
// console.log(moment().format('YYYY-MM-DD'));
let startDate = moment().format('YYYY-MM-DD');

let startMonthText = moment().month();
let startDateText = moment().date();
let endDate = moment().add(1, 'd');
let endMonthText = moment(endDate).month();
let endDateText = moment(endDate).date();
startMonthText++;
endMonthText++;

endDate = moment(endDate).format('YYYY-MM-DD');

// console.log(startDateText)
// console.log(startMonthText)
// console.log(endDateText)
// console.log(endMonthText)




export default {
    data(){
        return {
          images: [],
          dateTime:require('assets/img/date-time.png'),
          is_hour_home: false, // 钟点房选择
          showCalendar: false, // 是否现实日期选择
          nowDate: new Date(),
          roomType:1, // 组件中的房间类型
          isShowDatePicker:true,
          hotel:'',
          notice:'',
          continuity:'',
          all_score:'',
          already:1,
          url:commonJs.url,
          startDate:startDate,
          endDate:endDate,

          startMonthText:isten(startMonthText),
          startDateText:isten(startDateText),
          endMonthText:isten(endMonthText),
          endDateText:isten(endDateText),
          day:1,
          timelimit:'',
        }
    },
    components: {
        "v-footer": footer,
        "Calender":Calender
    },
    mounted(){
      home().then((res)=>{
        this.all_score = res.data.all_score;
        this.continuity = res.data.continuity+=1;
        this.notice = res.data.notice[0].title;
        this.hotel = res.data.hotel;
        this.already = res.data.already;
        this.images = this.hotel.image;
        let index = 0;
        setInterval(()=>{
          index++;
          if(index < res.data.notice.length){
            this.notice = res.data.notice[index].title;
          }else{
            this.notice = res.data.notice[0].title;
            index = 0;
          }
        },8000)
        this.$store.dispatch('setStartEndDate',{start:this.startDate,end:this.endDate});
      });
      timeLimit().then(res=>{
        this.timeLimit = res.data.timelimit;
      });
    },
    methods:{
      // 领取积分
      addScore(is_click){
        if(is_click&&this.already===2){
          homeAddScore({send_score:this.continuity}).then((res)=>{
            this.already = 1;
            this.all_score = this.all_score + this.continuity;
            Toast(res.msg);
          });
        }
      },
      asureClick (dateList) {
        console.log(dateList)
        this.showCalendar = false;
        this.startMonthText = dateList.startDate.format.slice(5,7);
        this.endMonthText = dateList.endDate.format.slice(5,7);
        this.startDateText = dateList.startDate.day;
        this.endDateText = dateList.endDate.day;

        this.startDate = dateList.startDate.format;
        this.endDate = dateList.endDate.format;

        this.$store.dispatch('setStartEndDate',{start:this.startDate,end:this.endDate});

        this.day = moment(dateList.endDate.format).diff(moment(dateList.startDate.format), 'days')
      },
      go(){
        console.log(this.startDate);
        console.log(this.endDate);
        if(this.day>this.timeLimit){
          Toast(`最多可选择${this.timeLimit}天,请重新选择`);
          return;
        }
        this.$router.push({ path: '/hotel',query:{
          is_hour_home:this.is_hour_home?1:0,startDate:this.startDate,endDate:this.endDate
        } });
      }
    }
}

</script>
<style lang='less' scoped>
  @import "index";
  .child-view{
    padding-bottom: 100px;
  }
</style>
