<template>
  <div class="evaluate-add">
    <v-header title="评价"></v-header>
    <div class="room-info">
      <div class="room">
        <p class="name">{{orderCommentDetail.name}}</p>
        <p class="to-detail" @click="$router.push('/hotelDetail')">
          房间详情<i class="iconfont iconarrow-right"></i>
        </p>
      </div>
      <p class="date">{{orderCommentDetail.predict_begin_time}}-{{orderCommentDetail.predict_end_time}} <span>|</span> 共1晚</p>
      <p class="info">大床·不含早·有wifi</p>
      <p class="price">￥<span>{{orderCommentDetail.amount}}</span></p>
    </div>
    <p class="pingfen">评分</p>
    <div class="room-score"><span>{{score}}</span>分</div>
    <div class="set-score van-hairline--top">
      <p class="score-item" v-for="(scoreItem,indexS) in scoreList" :key="'setscore'+indexS">
        <span class="label">设施：</span>
        <i class="iconfont iconpinglun2"
           @click="scoreChange(indexS,index)"
           v-for="(item,index) in scoreItem.score"
           :key="'facilities-yes'+index"></i><i class="iconfont iconshoucang_shoucang"
           @click="scoreChange(indexS,scoreItem.score+index+1)"
           v-for="(item,index) in 5-scoreItem.score"
           :key="'facilities-no'+index"></i>
      </p>
    </div>
    <p class="pingfen">评分</p>
    <div class="evaluate-content">
      <textarea class="content" v-model="content" placeholder="请输入你想说的话"></textarea>
    </div>
    <p class="bg20"></p>
    <p class="pingfen">照片</p>
    <van-uploader
      :after-read="afterRead"
      v-model="fileList"
      multiple
      @delete="imgDelete"
      :preview-image="true"
      :max-count="9"
      :max-size="1024*1024*5"
      @oversize="oversize"
    />
    <div class="evaluate-img-box">
<!--      <img class="img" src="assets/img/dear.png">-->
<!--      <div class="add"></div>-->
    </div>

    <van-button class="submit-img" type="primary" size="large" @click="submit">提交</van-button>
  </div>
</template>

<script>
import header from "@/components/Header/header";
import { Toast } from 'vant'
import {commonUrl,strMonDate,countDown}  from '@/commonJs/index.js'
import {orderComment,orderCommentPost} from '@/api/index'


export default {
  data(){
      return {
        scoreList:[
          {
            name:'设施：',
            score:0
          },
          {
            name:'服务：',
            score:0
          },
          {
            name:'卫生：',
            score:0
          },
          {
            name:'位置：',
            score:0
          },
        ],
        fileList:[],
        content:'',
        orderCommentDetail:'',
        score:'0.0',
        id:'',
      }
  },
  computed:{
  },
  components: {
      "v-header": header,
  },
  mounted(){
    this.id = this.$route.query.id;
    orderComment({id:this.id}).then(res=>{
      this.orderCommentDetail = res.data;
      this.orderCommentDetail.predict_begin_time = strMonDate(res.data.predict_begin_time);
      this.orderCommentDetail.predict_end_time = strMonDate(res.data.predict_end_time);
    });
  },
  methods:{
    scoreChange(indexS,index){
      this.scoreList[indexS].score = index;
      let score = 0;
      this.scoreList.forEach(item=>{
        score += item.score;
      })
      this.score = (score/4).toFixed(1);
    },
    afterRead(file){
      console.log(file);
      // console.log(this.fileList);
    },
    imgDelete(file){
      console.log(file);
    },
    oversize(res){
      console.log(res);
      Toast('请上传5M以内的照片');
    },
    submit(){
      // console.log({
      //   id:this.id,
      //   content:this.content,
      //   images:this.fileList,
      //   score:this.score,
      //   score_facilities:this.scoreList[0].score,
      //   score_service:this.scoreList[1].score,
      //   score_sanitation:this.scoreList[2].score,
      //   score_location:this.scoreList[3].score,
      // })
      // return;
      // let images = [];
      // this.fileList.forEach(item=>{
      //   images.push(item.file);
      // });
      // console.log(images);
      // return;


      let formData = new FormData();

      this.fileList.forEach((item,index)=>{
        formData.append(`images[${index}]`, item.file)
      });
      formData.append('content',this.content);
      formData.append('score',this.score);
      formData.append('score_facilities',this.scoreList[0].score);
      formData.append('score_service',this.scoreList[1].score);
      formData.append('score_sanitation',this.scoreList[2].score);
      formData.append('score_location',this.scoreList[3].score);

      // {
      //   content:this.content,
      //   images:images,
      //   score:this.score,
      //   score_facilities:this.scoreList[0].score,
      //   score_service:this.scoreList[1].score,
      //   score_sanitation:this.scoreList[2].score,
      //   score_location:this.scoreList[3].score,
      // }

      orderCommentPost(formData,this.id).then(res=>{
        Toast(res.msg);
        if(res.code === 2000){
          this.$router.goBack();
        }
      });
    }
  }
}

</script>
<style lang='less' scoped>
  @import 'index';
  .child-view{
    padding-top: 100px;
    padding-bottom: 130px;
  }
</style>
