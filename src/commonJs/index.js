let moment = require('moment');

export const  commonJs = {
  url: 'http://xt.aixingtuan.com/',
}

export const  commonUrl = {
  url: 'http://xt.aixingtuan.com/',
}

//判断手机号是否正确
export const isPhone = function(phone){
  if(!(/^1[13456789]\d{9}$/.test(phone))){
    return false;
  }
  return true;
}
// 时间戳日期转换
export const strDate = function(date){
  if(date.toString().length<13){
    date*=1000;
  }
  return moment(date).format('YYYY-MM-DD');
}

// 时间戳转换几月几日
export const strMonDate = function(date){
  if(date.toString().length<13){
    date*=1000;
  }
  let m = moment(date).toArray()[1]+1;
  let d = moment(date).toArray()[2];

  return isten(m)+'月'+isten(d)+'日';
}

// 转换几位小数字
export const toFixedChange = function (data,num=1) {
  return data.toFixed(num);
}
//星期
export const weekDay = function (date) {
  var week = {
    "0": "日",
    "1": "一",
    "2": "二",
    "3": "三",
    "4": "四",
    "5": "五",
    "6": "六"
  };
  var num = new Date(date).getDay();
  return week[num];
}

// 小于10 加0
export const isten = function (num) {
  if(num < 10){
    num = '0'+num;
  }
  return num;
}

export const countDown = function (time) {
  //将传递过来的时间戳差值转化为时分形式
  let ts = time
  let days = parseInt(ts / (1000 * 60 * 60 * 24));
  let hours = parseInt((ts % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = parseInt((ts % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = parseInt((ts % (1000 * 60)) / 1000);
  let str = `${seconds}秒`;

  if(hours > 0){
    if(hours<10){
      hours = '0' + hours;
    }
    return [hours,minutes,seconds];
  }
  if(minutes > 0){
    if(minutes < 10){
      minutes = '0' + minutes;
    }
    return ['00',minutes,seconds]
  }
  if(minutes<=0){
    return ['00','00','00']
  }
  return ['00','00',seconds]
  // if(minutes > 0){
  //   str = `${minutes}分钟${seconds}秒`
  // }
  // return str
}


//
// moment.locale('zh-cn', {
//   months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
//   monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
//   weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
//   weekdaysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
//   weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
//   longDateFormat: {
//     LT: 'HH:mm',
//     LTS: 'HH:mm:ss',
//     L: 'YYYY-MM-DD',
//     LL: 'YYYY年MM月DD日',
//     LLL: 'YYYY年MM月DD日Ah点mm分',
//     LLLL: 'YYYY年MM月DD日ddddAh点mm分',
//     l: 'YYYY-M-D',
//     ll: 'YYYY年M月D日',
//     lll: 'YYYY年M月D日 HH:mm',
//     llll: 'YYYY年M月D日dddd HH:mm'
//   },
//   meridiemParse: '/凌晨|早上|上午|中午|下午|晚上/',
//   meridiemHour: function (hour, meridiem) {
//     if (hour === 12) {
//       hour = 0;
//     }
//     if (meridiem === '凌晨' || meridiem === '早上' ||
//       meridiem === '上午') {
//       return hour;
//     } else if (meridiem === '下午' || meridiem === '晚上') {
//       return hour + 12;
//     } else {
//       // '中午'
//       return hour >= 11 ? hour : hour + 12;
//     }
//   },
//   meridiem: function (hour, minute, isLower) {
//     const hm = hour * 100 + minute;
//     if (hm < 600) {
//       return '凌晨';
//     } else if (hm < 900) {
//       return '早上';
//     } else if (hm < 1130) {
//       return '上午';
//     } else if (hm < 1230) {
//       return '中午';
//     } else if (hm < 1800) {
//       return '下午';
//     } else {
//       return '晚上';
//     }
//   },
//   calendar: {
//     sameDay: '[今天]LT',
//     nextDay: '[明天]LT',
//     nextWeek: '[下]ddddLT',
//     lastDay: '[昨天]LT',
//     lastWeek: '[上]ddddLT',
//     sameElse: 'L'
//   },
//   dayOfMonthOrdinalParse: /\d{1,2}(日|月|周)/,
//   ordinal: function (number, period) {
//     switch (period) {
//       case 'd':
//       case 'D':
//       case 'DDD':
//         return number + '日';
//       case 'M':
//         return number + '月';
//       case 'w':
//       case 'W':
//         return number + '周';
//       default:
//         return number;
//     }
//   },
//   relativeTime: {
//     future: '%s内',
//     past: '%s前',
//     s: '几秒',
//     ss: '%d秒',
//     m: '1分钟',
//     mm: '%d分钟',
//     h: '1小时',
//     hh: '%d小时',
//     d: '1天',
//     dd: '%d天',
//     M: '1个月',
//     MM: '%d个月',
//     y: '1年',
//     yy: '%d年'
//   },
//   week: {
//     // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
//     dow: 1, // Monday is the first day of the week.
//     doy: 4  // The week that contains Jan 4th is the first week of the year.
//   }
// });
//
