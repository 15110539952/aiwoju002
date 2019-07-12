import Vue from 'vue'
import Router from 'vue-router'
import NotFound from '@/pages/404/404.vue'
Vue.use(Router)


Router.prototype.goBack = function (back) {
  this.isBack = true;
  if (window.history.length > 1) {
    this.back(back);
  } else {
    this.push('/')
  }
}

export default new Router({
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('pages/Home/home'),
    },
    {
      path: '/me',
      name: 'me', // 我的
      component: () => import('pages/me'),
    },
    {
      path: '/hotel',
      name: 'hotel', // 酒店房间
      component: () => import('pages/hotel'),
    },
    {
      path: '/hotelDetail',
      name: 'hotelDetail', // 酒店详情
      component: () => import('pages/hotelDetail'),
    },
    {
      path: '/payOrder',
      name: 'payOrder', // 订单支付
      component: () => import('pages/payOrder'),
    },
    {
      path: '/orderDetail',
      name: 'orderDetail', // 订单详情
      component: () => import('pages/orderDetail'),
    },
    {
      path: '/hotelorder',
      name: 'hotelorder', // 酒店下单
      component: () => import('pages/hotelorder'),
      meta: {
        isKeepLive: true,
        ifDoFresh:false,
      }
    },
    {
      path: '/map',
      name: 'map', // 地图
      component: () => import('pages/map'),
      meta:{
        background:'white'
      }
    },
    {
      path: '/order',
      name: 'order', // 主页订单
      component: () => import('pages/order'),
    },
    {
      path: '/evaluateList',
      name: 'evaluateList', // 酒店评价列表
      component: () => import('pages/evaluateList'),
      meta:{
        background:'white'
      }
    },
    {
      path: '/evaluateAdd',
      name: 'evaluateAdd', // 填写评价
      component: () => import('pages/evaluateAdd'),
      meta:{
        background:'white'
      }
    },
    {
      path: '/myevaluateDetail',
      name: 'myevaluateDetail', // 我的评价详情
      component: () => import('pages/myevaluateDetail'),
      meta:{
        background:'white'
      }
    },
    {
      path: '/myorder',
      name: 'myorder', // 订单列表
      component: () => import('pages/myorder'),
      meta:{
        background:'white',
        isKeepLive: true,
        ifDoFresh:false
      }
    },
    {
      path: '/myevaluate',
      name: 'myevaluate', // 我的评价列表
      component: () => import('pages/myevaluate'),
      meta:{
        background:'white'
      }
    },
    {
      path: '/setting',
      name: 'setting', // 设置
      component: () => import('pages/setting'),
      redirect: '/setting/home',
      children: [
        {
          path: 'home',
          name: 'set-home', // 设置
          component: () => import('pages/setting/home'),
          meta:{
            background: 'white'
          },
        },
        {
          path: 'user',
          name: 'user', // 个人信息
          component: () => import('pages/setting/user'),
          meta:{
            background: 'white'
          },
        },
        {
          path: 'social',
          name: 'social', // 社交账号
          component: () => import('pages/setting/social'),
          meta:{
            background: 'white'
          },
        },
        {
          path: 'phone',
          name: 'set-phone', // 修改手机号
          component: () => import('pages/setting/phone'),
          meta:{
            background: 'white'
          }
        },
      ]
    },
    {
      path: '/contacts',
      name: 'contacts', // 联系人
      component: () => import('pages/contacts'),
      redirect: '/contacts/home',
      children: [
        {
          path: 'home',
          name: 'contacts-home', // 联系人列表
          meta:{
            background: 'white'
          },
          component: () => import('pages/contacts/home')
        },
        {
          path: 'save',
          name: 'contacts-save', // 新增联系人
          meta:{
            background: 'white'
          },
          component: () => import('pages/contacts/save')
        },
      ]
    },
    {
      path: '/mehotel',
      name: 'mehotel', // 酒店经纪人
      component: () => import('pages/mehotel'),
      redirect: '/contacts/home',
      meta:{
        background: 'white'
      },
      children: [
        {
          path: 'home',
          name: 'mehotel-home', // 酒店经纪人home
          meta:{
            background: 'white',
            title:'酒店经纪人'
          },
          component: () => import('pages/mehotel/home')
        },
        {
          path: 'cashdetail',
          name: 'cashdetail', // 提现明细
          meta:{
            background: 'white',
            title:'提现明细'
          },
          component: () => import('pages/mehotel/cashdetail')
        },
        {
          path: 'distributionlist',
          name: 'distributionlist', // 分销收入
          meta:{
            background: 'white',
            title:'分销收入'
          },
          component: () => import('pages/mehotel/distributionlist')
        },
        {
          path: 'cashorder',
          name: 'cashorder', // 分销订单
          meta:{
            background: 'white',
            title:'分销订单'
          },
          component: () => import('pages/mehotel/cashorder')
        },
        {
          path: 'cashqrcode',
          name: 'cashqrcode', // 分销二维码
          meta:{
            background: 'white',
            title:'分销二维码'
          },
          component: () => import('pages/mehotel/cashqrcode')
        },
        {
          path: 'cashwithdrawal',
          name: 'cashwithdrawal', // 提现
          meta:{
            background: 'white',
            title:'提现'
          },
          component: () => import('pages/mehotel/cashwithdrawal')
        },
        {
          path: 'recordingtime',
          name: 'recordingtime', // 记录时间
          meta:{
            background: 'white',
            title:'记录时间'
          },
          component: () => import('pages/mehotel/recordingtime')
        },
      ]
    },
    { path: '*', name: '404', component: NotFound }
  ]
})
