import ajax from '../axios'
// import axios from 'axios';
import qs from 'qs'

// 获取微信jssdk签名
export function getSign(data) {
  return ajax.get('api/user/getSign',data,{ load: true})
}

// 微信发起支付
export function payOrder(data) {
  return ajax.post('api/order/order_pay',data,{ load: true})
}


// 订房时长限制
export function timeLimit(data) {
  return ajax.get('api/index/timelimit',data,{ load: true})
}
// 首页详情
export function home(data) {
  return ajax.get('api/index/index',data,{ load: true})
}

//首页领取积分
export function homeAddScore(data) {
  return ajax.get('api/index/score',data,{ load: true})
}

//酒店房间列表
export function hotel(data) {
  return ajax.get('api/hotel/index',data,{ load: true})
}


//酒店房间详情
export function hotelDetail(data) {
  return ajax.get('api/hotel/hotel_detail',data,{ load: true})
}

//酒店评论列表
export function hotelComment(data) {
  return ajax.get('api/hotel/hotel_comment',data,{ load: true})
}

//酒店下单信息获取
export function hotelOrder(data) {
  return ajax.get('api/order/payorder',data,{ load: true})
}


//酒店提交订单准备支付
export function orderCreate(data) {
  return ajax.get('api/order/create_order',data,{ load: true})
}

//订单支付页面信息
export function orderInfor(data) {
  return ajax.get('api/order/order_infor',data,{ load: true})
}

//订单列表
export function orderList(data) {
  return ajax.get('api/order/index',data,{ load: true})
}

//订单详情页面
export function orderDetail(data) {
  return ajax.get('api/order/detail',data,{ load: true})
}

//取消订单
export function orderCancel(data) {
  return ajax.get('api/order/cancel',data,{ load: true})
}

//取消交易
export function cancelTransaction(data) {
  return ajax.get('api/order/cancel_transaction',data,{ load: true})
}

//评价订单信息显示
export function orderComment(data) {
  return ajax.get('api/order/comment',data,{ load: true})
}

//评价订单信息提交
export function orderCommentPost(data,id) {
  console.log(data,id);
  return ajax.postForm(`api/order/comment?id=${id}`,data,{ load: true})
}

//我的
export function user(data) {
  return ajax.get('api/user/index',data,{ load: true})
}


//我的评价列表
export function myComment(data) {
  return ajax.get('api/user/my_comment',data,{ load: true})
}

//我的评价详情
export function myCommentDetail(data) {
  return ajax.get('api/user/my_comment_detail',data,{ load: true})
}

//我的评价详情删除评价
export function delComment(data) {
  return ajax.get('api/user/del_comment',data,{ load: true})
}


//注册成为酒店经纪人接口
export function registerAgent(data) {
  return ajax.get('api/user/register_agent',data,{ load: true})
}

//个人信息显示
export function modify(data) {
  return ajax.get('api/user/modify',data,{ load: true})
}

//个人信息提交设置
export function modifySubmit(data) {
  return ajax.post('api/user/modify',data,{ load: true})
}

//入住人列表
export function checkinList(data) {
  return ajax.get('api/user/index_checkin',data,{ load: true})
}

//编辑入住人--显示
export function checkinEdit(data) {
  return ajax.get('api/user/edit_checkin',data,{ load: true})
}

//编辑入住人--更新
export function checkinEditUpdate(data) {
  return ajax.post(`api/user/edit_checkin/id/${data.id}`,data,{ load: true})
}

//编辑入住人--删除
export function checkinDelete(data) {
  return ajax.get(`api/user/del_checkin/`,data,{ load: true})
}

//编辑入住人--增加
export function checkinAdd(data) {
  return ajax.post(`api/user/add_checkin/`,data,{ load: true})
}

// import Test from './test'
//
// export {
//   Test
// }
