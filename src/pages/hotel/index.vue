<template>
  <div class="hotel">
    <v-header title="酒店"></v-header>
    <EasyRefresh
      :userSelect="false"
      :loadMore="loadMore">
    <div class="banner">
      <van-swipe :autoplay="5000" indicator-color="white">
        <van-swipe-item v-for="(item,index) in hotel.image" :key="'banner_'+index">
          <van-image
            width="100%"
            height="100%"
            fit="cover"
            :src="url+item"/>
        </van-swipe-item>
      </van-swipe>
      <div class="scope-block">
        <p class="one">{{hotel.renovate_time}}年装修</p>
        <p class="two"><span>{{zongfenText}}</span>分</p>
        <p class="three">
          <i class="iconfont iconpinglun2"
             v-for="(item,index) in zongfen"
             :key="'facilities-yes'+index"></i>
          <i class="iconfont iconpinglun2 white"
             v-for="(item,index) in 5-zongfen"
             :key="'facilities-no'+index"></i>
        </p>
      </div>
    </div>

    <div class="address-block" @click="$router.push('/map')">
      <div class="left">
        <div class="name-block">
          <p class="name text-ellipsis">{{hotel.address}}</p>
          <p class="label">({{hotel.star_level}})</p>
        </div>
        <p class="apart">与我相距{{juli}}km</p>
      </div>
      <div class="right"><img src="~assets/img/address.png"></div>
    </div>

    <div class="date-block">
      <div class="start">
        <p class="text1">入住时间</p>
        <div class="date">
          <span class="date-num">{{startMonthText}}</span>
          <span class="text-riyue">月</span>
          <span class="date-num">{{startDateText}}</span>
          <span class="text-riyue">日</span>
        </div>
        <p>{{today === startDate ?'今日':'周'}}{{today === startDate ? '': startDate | week}}</p>
      </div>
      <div class="num-date">
        <p>{{day}}晚<b class="left"></b><b class="right"></b></p>
      </div>
      <div class="end">
        <p class="text1">离店时间</p>
        <div class="date">
          <span class="date-num">{{endMonthText}}</span>
          <span class="text-riyue">月</span>
          <span class="date-num">{{endDateText}}</span>
          <span class="text-riyue">日</span>
        </div>
        <p>{{tomorrow === endDate ?'明日':'周'}}{{tomorrow === endDate ? '': endDate | week}}</p>
      </div>
    </div>

    <div class="room-list">
      <div class="room-item" :class="index===0?'':'van-hairline--top'" v-for="(item,index) in hotel_room_type" :key="'room_'+index">
        <div class="room-info">
          <div :style="'background-image: url('+url+item.images+');'" class="img"></div>
          <div class="info">
            <p class="one"><span class="name">{{item.name}}</span>
<!--              <span class="label">（1小时确认）</span>-->
            </p>
            <p class="two">还剩{{item.room_rest_num}}间</p>
            <p class="three">
              <span v-for="(label,open_index) in item.open" :key="'open'+open_index">{{label}}<i></i></span>
            </p>
          </div>
        </div>
        <div class="price-item van-hairline--top"
             v-for="(room,room_index) in item.list"
             :key="'roomlist_'+room_index">
          <div class="type">
            <p class="top">{{room.breakfast===2?'含双早':room.breakfast===1?'含单早':'不含早'}}</p>
            <p class="bottom">限时取消</p>
          </div>
          <div class="price">
            <p class="top">￥<span>{{room.price}}</span></p>
<!--            <p class="bottom">当前星享卡可代扣100元</p>-->
          </div>
          <div class="fix">
            <van-button type="primary" size="large" @click="order(item.id)" :disabled="item.room_rest_num===0">在线预定</van-button>
          </div>
        </div>
      </div>
    </div>
    <div class="room-list">
      <div class="room-item" :class="index===0?'':'van-hairline--top'" v-for="(item,index) in hotel_room_type2" :key="'room_'+index">
        <div class="room-info van-hairline--bottom">
          <div :style="'background-image: url('+url+item.images+');'" class="img"></div>
          <div class="info">
            <p class="one"><span class="name">{{item.name}}</span>
<!--              <span class="label">（30分钟确认）</span>-->
            </p>
            <p class="two">还剩{{item.room_rest_num}}间</p>
            <p class="three">
              <span v-for="(label,open_index) in item.open" :key="'open'+open_index">{{label}}<i></i></span>
            </p>          </div>
        </div>
        <div class="price-item van-hairline--top"
             v-for="(room,room_index) in item.list"
             :key="'roomlist_'+room_index">
          <div class="type">
            <p class="top">{{room.hour}}小时</p>
            <p class="bottom">限时取消</p>
          </div>
          <div class="price">
            <p class="top">￥<span>{{room.price}}</span></p>
            <!--            <p class="bottom">当前星享卡可代扣100元</p>-->
          </div>
          <div class="fix">
            <van-button type="primary" size="large" @click="order(item.id)" :disabled="item.room_rest_num===0">在线预定</van-button>
          </div>
        </div>
      </div>
    </div>

    <div class="rule-box">
      <p class="title-one">订房必读</p>
      <div class="rule-item" v-html="hotel.description"></div>
<!--      <div class="rule-item">-->
<!--        <p class="rule-title">入离时间</p>-->
<!--        <p class="rule-content">-->
<!--          <span class="left">入店时间<span>12:00</span>以后</span>-->
<!--          <span class="right">离店时间<span>12:00</span>之前</span>-->
<!--        </p>-->
<!--      </div>-->
<!--      <div class="rule-item">-->
<!--        <p class="rule-title">宠物携带</p>-->
<!--        <p class="rule-content">不可携带宠物</p>-->
<!--      </div>-->
<!--      <div class="rule-item">-->
<!--        <p class="rule-title">退订政策</p>-->
<!--        <p class="rule-content">部分限时退订</p>-->
<!--      </div>-->
    </div>
<!--    配套设施-->
    <div class="facilities">
      <div class="title-one">配套设施<p class="title-right" @click="$router.push('/hotelDetail')">设施详情 <i class="iconfont iconarrow-right"></i></p></div>
      <div class="rule-item" v-html="hotel.remark">
<!--        <p class="rule-title">2018年开业</p>-->
<!--        <div class="rule-content">-->
<!--          <p><img src="~assets/img/wifi.png"> 无限上网</p>-->
<!--          <p><img src="~assets/img/stop-car.png"> 停车场</p>-->
<!--          <p><img src="~assets/img/hot-water.png"> 24小时热水</p>-->
<!--        </div>-->
      </div>
    </div>
<!--    房间评价-->
    <div class="facilities">
      <div class="title-one">
        房间评价<p class="title-right" @click="$router.push('/evaluateList')">更多评价 <i class="iconfont iconarrow-right"></i></p>
      </div>
      <div class="facilities-score van-hairline--bottom">
        <div class="left"><span>{{zongfenText}}</span>分</div>
        <div class="right">
          <p>{{total}}条评价</p>
          <p>
            <i class="iconfont iconpinglun2"
               v-for="(item,index) in zongfen"
               :key="'facilities-yes'+index"></i>
            <i class="iconfont iconshoucang_shoucang"
               v-for="(item,index) in 5-zongfen"
               :key="'facilities-no'+index"></i>
          </p>
        </div>
      </div>
      <div class="evaluate-item" v-for="(item,comindex) in comment" :key="'com_'+comindex">
<!--        <div class="head" :style="'background-image: url('+item.user_id.length>0?item.user_id[0].avatar:''+')'"></div>-->
        <div class="head">
          <img v-if="item.user_id.length>0" :src="item.user_id[0].avatar">
        </div>
        <div class="content">
          <div class="one">
            <p>{{item.user_id.length>0?item.user_id[0].nickname:''}}</p><p>{{item.room_type_id}}</p>
          </div>
          <div class="score-box">
            <i class="iconfont iconpinglun2"
               v-for="(icon,index) in parseInt(item.score)"
               :key="'facilities-yes'+index"></i>
            <i class="iconfont iconshoucang_shoucang"
               v-for="(icon,index) in 5-parseInt(item.score)"
               :key="'facilities-no'+index"></i>
          </div>
          <div class="time-block">
            <p><span>{{item.start_time}}</span>入住</p><p><span>{{item.creatime}}</span>  发表</p>
          </div>
          <div class="detail">{{item.content}}</div>
          <div class="img-box">
<!--            style="background-image: url('')"-->
            <div class="evaluate-img" v-for="(img,img_i) in item.images" :key="'img_com_'+img_i">
              <van-image
                width="100%"
                height="100%"
                fit="cover"
                :src="url+img"><template v-slot:error>加载失败</template></van-image>
            </div>
          </div>
        </div>
      </div>
    </div>

    <template v-slot:footer>
      <BallPulseFooter :height="140"/>
    </template>
    </EasyRefresh>
  </div>
</template>

<script>
import header from "@/components/Header/header";
import footer from "@/components/Footer";
import { Toast } from 'vant'
import {commonJs}  from '@/commonJs/index.js';
import {hotel}  from '@/api/index';

let moment = require('moment');

export default {
  name:'hotel',
  data(){
      return {
        url:commonJs.url,
        score:4,
        today:moment().format('YYYY-MM-DD'),
        tomorrow:moment(moment().add(1, 'd')).format('YYYY-MM-DD'),
        // startDate:this.$route.query.startDate || moment().format('YYYY-MM-DD'),
        // endDate:this.$route.query.endDate || moment(moment().add(1, 'd')).format('YYYY-MM-DD'),
        // is_hour_home:this.$route.query.is_hour_home, // 是否钟点房

        hotel:'',
        hotel_room_type:'', // 正常房间
        hotel_room_type2:'', // 钟点房
        juli:'', // 距离酒店
        zongfen:'', // 酒店评分总分
        zongfenText:'', // 评分5.0
        comment:[], // 评价列表

        startMonthText:'', // 开始月
        startDateText:'', // 开始日
        endMonthText:'', // 结束月
        endDateText:'', // 结束日
        day:'',// 共几晚

        total:'', // 评价总条数
        last_page:'', // 最后页码
        current_page:1, // 当前第几页
        per_page:'', // 每页几条

      }
  },
  components: {
      "v-header": header,
      "v-footer": footer,
  },
  computed:{
    'startDate'(){
      return this.$store.getters.startendDate.start || moment().format('YYYY-MM-DD');
    },
    'endDate'(){
      return this.$store.getters.startendDate.end || moment(moment().add(1, 'd')).format('YYYY-MM-DD');
    },
  },
  mounted(){
    let zhong = parseInt(this.$route.query.is_hour_home);
    // console.log(zhong);
    // console.log(this.$store.getters.startendDate)
    // console.log(this.startDate)
    // console.log(this.endDate)
    this.startMonthText = this.startDate.slice(5,7) || '';
    this.startDateText = this.startDate.slice(8,10) || '';
    this.endMonthText = this.endDate.slice(5,7) || '';
    this.endDateText = this.endDate.slice(8,10) || '';
    this.day = moment(this.endDate).diff(moment(this.startDate), 'days');

    hotel({
      start_time:this.startDate,
      zhong:zhong?1:'',
      peo_lng:0,
      peo_lat:0,
      page:1
    },{ load: true}).then((res)=>{
      this.hotel = res.data.hotel[0];
      this.hotel_room_type = res.data.hotel_room_type;
      this.hotel_room_type2 = res.data.hotel_room_type2;
      // this.comment = res.data.comment;
      this.total = res.data.comment.total;
      this.zongfen = Math.round(res.data.zongfen.score);
      this.zongfenText = this.zongfen.toFixed(1);
      this.juli = res.data.juli;
      this.last_page = res.data.comment.last_page;
      this.comment = res.data.comment.data;
      this.current_page +=1 ;
    });
  },
  methods:{
    order(id){
      console.log(id)
      this.$router.push({path:'/hotelorder',query:{id:id}});
    },
    loadMore(done){
      if(this.current_page>this.last_page){
        done(true);
        return;
      }
      hotel({page:this.current_page}).then(res=>{
        // console.log(res);
        this.comment = this.comment.concat(res.data.comment.data);
        if(this.current_page<=this.last_page){
          this.current_page += 1;
          done(false);
        }else{
          Toast('没有更多了')
          done(true);
        }
      })
    }
  }
}

</script>
<style lang='less' scoped>
  @import "index";
  .child-view{
    height: 100%;
    padding-top: 100px;
  }
</style>
