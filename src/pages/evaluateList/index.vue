<template>
  <div class="evaluate">
    <v-header title="评价"></v-header>
    <div class="fixed-top">
      <div class="evaluate-top">
        <div class="left">
          <p class="score"><span class="num">{{score.score}}</span><span class="text">分</span><span>{{score.score_info}}</span></p>
          <p class="eva-num">当前共有{{total}}条评论</p>
        </div>
        <div class="right">
          <div class="room-info"><p class="label">设施配套</p><p class="score">{{score.score_facilities}}.0分</p></div>
          <div class="room-info"><p class="label">卫生状况</p><p class="score">{{score.score_sanitation}}.0分</p></div>
          <div class="room-info"><p class="label">服务态度</p><p class="score">{{score.score_service}}.0分</p></div>
          <div class="room-info"><p class="label">地理位置</p><p class="score">{{score.score_location}}.0分</p></div>
        </div>
      </div>
      <p class="bg20"></p>
      <div class="evaluate-tab van-hairline--bottom">
        <p class="tab" @click="tabChange(0)" :class="tabIndex===0?'active':''">全部</p>
        <p class="tab" @click="tabChange(1)" :class="tabIndex===1?'active':''">有图({{num_img}})</p>
        <p class="tab" @click="tabChange(2)" :class="tabIndex===2?'active':''">差评({{num_sta}})</p>
      </div>
    </div>

    <div class="evaluate-list" v-if="evaluateList">
      <EasyRefresh
        ref="easyRefresh"
        :userSelect="false"
        :autoLoad="false"
        :loadMore="loadMore">

      <div class="evaluate-item"
           :key="'eva_'+index"
           v-for="(item,index) in evaluateList">
        <div class="head">
          <img v-if="item.user_id.length>0" :src="item.user_id[0].avatar">
        </div>
        <div class="content">
          <div class="one">
            <p>{{item.user_id.length?item.user_id[0].nickname:''}}</p><p>{{item.room_type_id}}</p>
          </div>
          <div class="score-box">
            <i class="iconfont iconpinglun2"
               v-for="(item,yes_index) in parseInt(item.score)"
               :key="'facilities-yes'+yes_index"></i>
            <i class="iconfont iconshoucang_shoucang"
               v-for="(item,no_index) in 5-parseInt(item.score)"
               :key="'facilities-no'+no_index"></i>
          </div>
          <div class="time-block">
            <p><span>{{item.start_time}}</span>入住</p><p><span>{{item.creatime}}</span>  发表</p>
          </div>
          <div class="detail">{{item.content}}</div>
          <div class="img-box">
            <!--            style="background-image: url('')"-->
            <div class="evaluate-img" v-for="img in item.images">
              <van-image
                width="100%"
                height="100%"
                fit="cover"
                :src="commonJs.url+img"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="no-list" v-if="!evaluateList.length">
        <img src="~assets/img/evaluate-no-list.png">
        <p>暂无评论</p>
        <p>这么好的酒店，么人“到此一游”吗？</p>
      </div>

      <template v-slot:footer>
        <BallPulseFooter/>
      </template>
      </EasyRefresh>
    </div>
  </div>
</template>

<script>
import header from "@/components/Header/header";
import { Toast } from 'vant'
import {commonJs,toFixedChange}  from '@/commonJs/index.js';
import {hotelComment} from '@/api/index'

export default {
  data(){
      return {
        commonJs:commonJs,
        tabIndex: 0,
        total:'',
        score:'',
        num_sta:'',
        num_img:'',
        evaluateList:null,

        current_page:1,
        last_page:1,
        title:1,
        isRefresh:false,
      }
  },
  computed:{
  },
  components: {
      "v-header": header,
  },
  mounted(){
    hotelComment().then(res=>{
      this.score = res.data.score;
      this.score.score = toFixedChange(this.score.score);
      this.num_img = res.data.comment.num_img;
      this.num_sta = res.data.comment.num_sta;
      this.total = res.data.comment.total;
      this.evaluateList = res.data.comment.data;
      this.last_page = res.data.comment.last_page;
      this.current_page += 1;
    })
  },
  methods:{
    tabChange(index){
      this.tabIndex = index;
      if(index === 0){
        this.title = 1;
      }
      if(index === 1){
        this.title = 3
      }
      if(index === 2){
        this.title = 2
      }
      // this.evaluateList = [];
      this.$refs.easyRefresh.scrollTo(0,0);
      this.current_page = 1;
      hotelComment({page:1,title:this.title}).then(res=>{
        this.evaluateList = res.data.comment.data;
        this.last_page = res.data.comment.last_page;
        this.current_page += 1;
      })
      document.documentElement.scrollTop = 0;
    },
    loadMore(done){
      console.log(this.current_page,this.last_page);
      if(this.current_page>this.last_page){
        Toast('没有更多了')
        done(false);
        return;
      }
      hotelComment({page:this.current_page,title:this.title}).then(res=>{
        // console.log(res);
        this.evaluateList = this.evaluateList.concat(res.data.comment.data);
        this.last_page = res.data.comment.last_page;
        if(this.current_page<=this.last_page){
          this.current_page += 1;
          done(false);
        }else{
          Toast('没有更多了')
          done(false);
        }
      })
    },
  }
}

</script>
<style lang='less' scoped>
  @import 'index';
  .child-view{
    height: 100%;
  }
</style>
