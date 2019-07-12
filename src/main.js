// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import Vuex from 'vuex'
import router from './router'
import ajax from './axios'
import 'amfe-flexible/index.js'
Vue.prototype.$ajax = ajax;

Vue.prototype.$url = {
  aixingtuan:'wx.aixingtuan.com',
  url: 'http://xt.aixingtuan.com/',
};

// 上拉加载下拉刷新
import EasyRefresh from 'vue-easyrefresh'
Vue.use(EasyRefresh)


import vueJsonp from 'vue-jsonp'
Vue.use(vueJsonp)

// import MintUI from 'mint-ui'
// Vue.use(MintUI)

import vant from 'vant'
import 'vant/lib/index.css'
Vue.use(vant)

// import Navigation from 'vue-navigation'
// Vue.use(Navigation, {router})

// 酒店日期选择组件
// import VueBetterCalendar from 'vue-better-calendar'
// Vue.use(VueBetterCalendar)
import Calendar from 'vue-mobile-calendar'
Vue.use(Calendar);

// import { Tabbar, TabbarItem, Swipe, SwipeItem,Image,CellGroup } from 'vant'
// import 'vant/lib/index.css';
// Vue.use(Tabbar)
//   .use(TabbarItem)
//   .use(Swipe)
//   .use(SwipeItem)
//   .use(Image)
//   .use(CellGroup);

// Vue.use(Vuex)
// const store = new Vuex.Store({
//   state: {
//
//   },
//   mutations: {
//     setUserInfo (state,userInfo){
//     }
//   }
// })
// 复制粘贴
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

// main.js中全局引入工具
import utils from './utils/index.js'
Vue.prototype.$utils = utils;

import store from './vuex/store'

// 路由全局守卫 修改背景颜色
router.beforeEach((to, from, next) => {
  if (to.meta.background === 'white') {
    document.querySelector('body').setAttribute('style', 'background: #ffffff')
  } else {
    document.querySelector('body').setAttribute('style', 'background: #f8f8f8')
  }
  next();
});


Vue.filter('week', function (date) {
  let week = {
    "0": "日",
    "1": "一",
    "2": "二",
    "3": "三",
    "4": "四",
    "5": "五",
    "6": "六"
  };
  let num = new Date(date).getDay();
  return week[num];
})

Vue.config.productionTip = false

/* eslint-disable no-new */
window.$globalHub = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
