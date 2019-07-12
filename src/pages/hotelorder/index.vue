<template>
  <div class="hotelorder">
    <v-header title="酒店下单"></v-header>
    <div class="top-bg"></div>
    <div class="room-info" v-if="hotelorder">
      <div class="room-name">
        <p>{{hotelorder.hotel_room_type.name}}</p>
        <p @click="$router.push('/hotelDetail')">房间详情<i class="iconfont iconarrow-right"></i></p>
      </div>
      <p class="address">{{hotelorder.hotel.address}}</p>
      <div class="date"><span>{{startDateText}}-{{endDateText}}</span><b></b><span>共{{hotelorder.night}}晚</span></div>
      <p class="room-on">
        <span v-for="item in hotelorder.hotel_room_type.list">{{item}}<i>·</i></span>
      </p>
      <div class="on-tip"><i class="iconfont iconorder-jinggao"></i>入住前可免费取消</div>
    </div>

    <div class="info-list">
      <div class="info-item van-hairline--bottom" @click="actionRoomShow=true">
        <p class="label">房间数:</p>
        <p class="content">{{actionRoomId}}间</p>
        <i class="iconfont iconarrow-right"></i>
      </div>
      <div class="info-item input-list van-hairline--bottom"
           v-for="(item,index) in actionRoomId"
           :key="index">
        <div class="input-box">
          <div class="info-item van-hairline--bottom">
            <p class="label">入住人:</p>
            <input type="text" v-model="users[index].name" placeholder="入住人姓名">
          </div>
          <div class="info-item">
            <p class="label">联系方式:</p>
            <input type="text" v-model="users[index].phone" placeholder="大陆手机号码，用于接收通知" maxlength="11">
          </div>
        </div>
        <img src="~assets/img/user-icon.png" @click="selectPeople(index)">
      </div>
      <div class="info-item van-hairline--bottom" @click="actionTimeShow=true">
        <p class="label">预计到店:</p>
        <p class="content"><span class="time">{{timeList[actionTimeId]}}</span>(整晚保留)</p>
        <i class="iconfont iconarrow-right"></i>
      </div>
<!--      <div class="info-item">-->
<!--        <p class="label">优惠券:</p>-->
<!--        <p class="content">节日优享20元券</p>-->
<!--        <i class="iconfont iconarrow-right"></i>-->
<!--      </div>-->
    </div>


    <div class="info-list noactive" style="margin-top: 20px;">
      <div class="info-item noactive">
        <p class="label">发票:</p>
        <p class="content">请咨询前台客服开具</p>
        <i style="width: 24px"></i>
      </div>
    </div>

    <div class="hotel-tip">
      <p class="title">温馨提示：</p>
      <p class="content">取消规则：入住前可以免费取消</p>
      <p class="content">入离时间：08：00以后入住，14：00以前离店</p>
    </div>

    <div class="footer-order">
      <div class="left">
        <span class="text">总计</span><span class="price">￥{{total}}</span>
      </div>
      <div class="right">
        <p class="info" @click="coseShow=!coseShow">明细</p>
        <van-button
          :loading="is_loading"
          type="warning"
          loading-text="提交中"
          @click="order"
        >支付</van-button>
      </div>
    </div>

    <van-action-sheet v-model="actionSheetShow" :title="actionSheetTitle">
      <div class="action-room" v-show="actionRoomShow">
        <p class="item" :class="item===actionRoomId?'active':''" v-for="item in 10" @click="actionRoomId=item">{{item}}间</p>
      </div>
      <div class="action-time" v-show="actionTimeShow">
        <p class="item" :class="index===actionTimeId?'active':''" v-for="(item,index) in timeList" @click="actionTimeId=index">{{item}}</p>
      </div>

      <div class="peopleList" v-show="actionPeopleShow">
        <div class="item"
             v-for="(item,index) in peopleList">
          <div class="left" @click="selectPeopleList(index)">
            <img src="~assets/img/select-yes.png" v-if="item.status">
            <img v-else src="~assets/img/select-no.png">
            <span class="name">{{item.name}}</span>
            <span class="phone">{{item.phone}}</span>
          </div>
          <div class="right">编辑</div>
        </div>
      </div>
    </van-action-sheet>
    <van-action-sheet class="cosePopup"
                      v-model="coseShow"
                      title="费用明细">
      <div class="coseBox">
        <div class="one"><p class="left">在线支付</p><p class="right">￥{{total}}</p></div>
        <div class="two"><p class="left">房费</p><p class="right">{{hotelorder.night}}晚{{actionRoomId}}间 共 ￥{{total}}</p></div>
        <div class="coseList">
          <div class="item" v-for="(item,index) in hotelorder.mingxi" :key="index">
            <p class="left"><span>{{item.day}}-{{item.day_two}}</span>{{item.breakfast}}</p>
            <p class="right">{{actionRoomId}} X ￥{{(actionRoomId*item.price).toFixed(2)}}</p>
          </div>
<!--          <div class="item"><p class="left"><span>12月01日-12月02日</span>单早</p><p class="right">1X ￥200</p></div>-->
        </div>
      </div>
    </van-action-sheet>

  </div>
</template>

<script>
import header from "@/components/Header/header";
import { Toast } from 'vant'
import {commonJs,isten}  from '@/commonJs/index.js';
import {hotelOrder,orderCreate} from '@/api/index'

let moment = require('moment');

export default {
  name:'hotelorder',
  data(){
      return {
        startDateText:'',
        endDateText:'',
        hotelorder:'',
        room_type_id:this.$route.query.id || '',
        is_loading:false,
        actionSheetTitle:'',
        actionSheetShow:false, // 弹出选择内容
        actionRoomId:1, // 房间id
        actionTimeId:1, // 时间id
        actionPeopleId:'', // 选择好的入住人列表id
        actionRoomShow:false, // 选择房间
        actionTimeShow:false, // 选择时间
        actionPeopleShow:false, // 选择联系人
        peopleId:0, // 入住人id
        timeList:[
          '13:00',
          '14:00',
          '15:00',
          '16:00',
          '17:00',
          '18:00',
          '19:00',
          '20:00',
          '21:00',
          '22:00',
          '23:00',
          '0点以后',
        ],
        users:[{name:'',phone:''}],
        user:{
          name:'',
          phone:''
        },
        peopleList:[],
        coseShow:false,
        total:'',
      }
  },
  computed:{
    'startDate'(){
      return this.$store.getters.startendDate.start || moment().format('YYYY-MM-DD');
    },
    'endDate'(){
      return this.$store.getters.startendDate.end || moment(moment().add(1, 'd')).format('YYYY-MM-DD');
    }
  },
  watch:{
    'actionRoomId'(val,oldVal){
      let total = 0;
      this.hotelorder.mingxi.forEach(item=>{
        total+=item.price*this.actionRoomId;
      });
      this.total = total;
      // console.log(this.total);
      let count = val - oldVal;
      if(val>oldVal){
        for(let i=1;i<=count;i++){
          this.users.push({name: '', phone: ''})
        }
        // console.log(this.users);
      }else{
        this.users = this.users.slice(0,val);
        // console.log(this.users)
      }

    },
    // 选择入住人改变同时改变对应的值
    'actionPeopleId'(i){
      // this.peopleList.forEach((data,index)=>{
      //   data.status = false;
      // })
      // this.peopleList[i].status = true;
      // this.$set(this.peopleList,this.peopleList);
      // this.users[this.peopleId] = this.peopleList[i];
      // this.actionSheetShow = false;
      // setTimeout(()=>this.actionSheetShow = false,500)
    },
    'actionSheetShow'(val){
      if(!val){
        this.actionRoomShow = false;
        this.actionTimeShow = false;
        this.actionPeopleShow = false;
      }
    },
    'actionRoomShow'(val){
      this.actionSheetShow = val;
      if(val){
        this.actionSheetTitle = '预定数量';
      }
    },
    'actionTimeShow'(val){
      this.actionSheetShow = val;
      if(val){
        this.actionSheetTitle = '预定时间';
      }
    },
    'actionPeopleShow'(val){
      this.actionSheetShow = val;
      if(val){
        this.peopleList.forEach((data,index)=>{
          data.status = false;
        })
        this.actionSheetTitle = '选择入住人';
      }
    }
  },
  components: {
      "v-header": header,
  },
  mounted(){
    this.getDetail();
    this.$nextTick(() => {

    })
  },
  methods:{
    // 点击入住人图标弹出入住人列表
    selectPeople(index){
      this.peopleId = index;
      this.actionPeopleShow=true;
    },
    // 点击入住人列表选择入住人
    selectPeopleList(index){
      this.users[this.peopleId] = this.peopleList[index];
      this.actionPeopleShow=false;
    },
    getDetail(){
      // console.log(this.startDate)
      // console.log(this.endDate)
      // console.log(moment(this.startDate).toArray())
      // console.log(moment(this.endDate).toArray())
      let s = moment(this.startDate).toArray();
      let e = moment(this.endDate).toArray();

      this.startDateText = isten(s[1]+=1)+'月'+isten(s[2])+'日';
      this.endDateText = isten(e[1]+=1)+'月'+isten(e[2])+'日';

      console.log(this.room_type_id)
      hotelOrder({start_time: this.startDate,end_time:this.endDate,room_type_id:this.room_type_id,}).then(res=>{
        console.log(res.data)
        this.hotelorder = res.data;
        this.peopleList = res.data.user;
        this.total = (this.hotelorder.night*this.actionRoomId*this.hotelorder.tot_price).toFixed(2);
      });
    },
    order(){
      // console.log(this.users)
      if(!this.isNoStr(this.users)){
        return;
      }
      let name = [],phone = [];
      this.users.forEach(item=>{
        name.push(item.name);
        phone.push(item.phone);
      });
      let nameStr = name.join(',');
      let phoneStr = phone.join(',');
      // console.log(nameStr,phoneStr);
      // return;
      this.is_loading = true;
      orderCreate({
        room_type_id:this.room_type_id,
        num:this.actionRoomId,
        start_time:this.startDate,
        end_time:this.endDate,
        look_time:this.timeList[this.actionTimeId],
        user_name: nameStr,
        user_phone: phoneStr,
        price:this.total
      }).then(res=>{
        // console.log(res);
        this.is_loading = false;
        this.$router.replace({path:'/payOrder',query:{id: res.data.data.order_id}});
      });
      // setTimeout(()=>{
      // },1000);
    },
    // 判断是否为空
    isNoStr(item){
      for(let i of item){
        if(!i.name.trim()){
          Toast('请输入入住人');
          return false;
        }
        if(!i.phone.trim()){
          Toast('请输入入住人手机号');
          return false;
        }
      }
      return true;
    }
  },
  activated(){
    this.room_type_id = this.$route.query.id;
    if(this.$route.meta.ifDoFresh){
      //重置ifDoFresh
      this.$route.meta.ifDoFresh = false;
      //获取列表数据方法第一参数为是否重置搜索条件和页数
      this.getDetail();
      this.actionRoomId = 1;
      this.actionTimeId = 1;
    }else{

    }
  },
  beforeRouteEnter (to, from, next) {
    if(from.name === 'hotel') {
      to.meta.ifDoFresh = true;
    }
    next();
  }
}

</script>
<style lang='less' scoped>
  @import 'index';

  .child-view{
    padding-top: 100px;
    padding-bottom: 100px;
  }
</style>
