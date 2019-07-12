<template>
  <div class="order">
    <v-header title="我的评价"></v-header>
    <p class="bg20"></p>

    <EasyRefresh
      :userSelect="false"
      :animationDuration="200"
      :loadMore="loadMore">
    <!--region 订单列表-->
    <div class="evaluate-list">
      <div class="evaluate-item" v-for="(item,index) in comment" @click="$router.push({path:'/myevaluateDetail',query:{id:item.id}})">
        <div class="content">
          <p class="room-name">{{item.time.hotel_room_type_id}}·{{item.time.num}}间</p>
          <p class="room-date"><span>{{item.time.actural_end_time}} 离店</span><span>{{strDate(item.creatime)}} 评论</span></p>
          <div class="score-box">
            <span class="score"><span>{{item.score}}</span>分</span>
            <i class="iconfont iconpinglun2"
               v-for="(item,index) in parseInt(item.score)"
               :key="'facilities-yes'+index"></i>
            <i class="iconfont iconshoucang_shoucang"
               v-for="(item,index) in 5-parseInt(item.score)"
               :key="'facilities-no'+index"></i>
          </div>
          <p class="img-num">{{item.images}}张照片·留言</p>
        </div>
        <b class="right-bg"></b>
      </div>
    </div>
    <!--endregion-->

    <div class="no-order" v-show="!evaluateList.length">
      <img src="~assets/img/no-content.png">
      <p>您还没有评价哦，快去评价吧!</p>
    </div>

    <template v-slot:footer>
      <BallPulseFooter :height="140"/>
    </template>
    </EasyRefresh>
  </div>
</template>

<script>
import header from "@/components/Header/header";
import { Toast } from 'vant'
import {commonJs,strDate,weekDay}  from '@/commonJs/index.js'
import {myComment} from '@/api/index'
export default {
  name:'order',
  data(){
      return {
        evaluateList:[
          {score:4},
          {score:4},
          {score:4},
          {score:4},
          {score:4},
          {score:4},
          {score:4},
        ],
        strDate:strDate,
        comment:[],
        current_page:1, // 当前第几页
        per_page:'', // 每页几条
      }
  },
  components: {
      "v-header": header,
  },
  mounted() {
    // this.tabId = this.$route.params.id;
    // console.log(this.tabId);
    myComment({page:this.current_page}).then(res=>{
      this.last_page = res.data.last_page;
      this.comment = res.data.data;
      this.comment.forEach(item=>{
        item.score = parseInt(item.score).toFixed(1);
      })
      this.current_page +=1 ;
    });
  },
  methods:{
    changeTab(index){
      this.tabId = index;
    },
    loadMore(done){
      if(this.current_page>this.last_page){
        Toast('没有更多了')
        done(true);
        return;
      }
      myComment({page:this.current_page}).then(res=>{
        // console.log(res);
        let comment = res.data.data;
        comment.forEach(item=>{
          item.score = parseInt(item.score).toFixed(1);
        })
        this.comment = this.comment.concat(comment);
        if(this.current_page<=this.last_page){
          this.current_page += 1;
          done(false);
        }else{
          Toast('没有更多了')
          done(true);
        }
      })
    }
  },
  beforeDestroy() {
  },
}

</script>
<style lang='less' scoped>
  @import 'index';
  .child-view{
    height: 100%;
    padding-top: 120px;
  }

</style>
