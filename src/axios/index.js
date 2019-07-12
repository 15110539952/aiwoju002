import axios from 'axios'
import qs from 'qs'

import { Toast } from 'vant';

const TIME_OUT = 30000 // 超时时间30秒


// 关闭 loading
function closeLoading () {
  Toast.clear();
}

// 请求数据拦截处理
axios.defaults.withCredentials = true;
axios.interceptors.request.use(config => {
// code... 你的逻辑
  return config
}, error => {
  return Promise.reject(error)
})

// 返回数据拦截处理
axios.interceptors.response.use(response => {
  //code... 你的逻辑
  closeLoading();
  return response.data //直接返回后台返回的json object
}, error => {
  closeLoading();
  Promise.reject(error.response)
})

/*
* 封装一个私有的请求方法
*/

const _request = (method, url ,data,load,loadMsg) => {
  // console.log(window.$globalHub.$store.getters)

  Toast.loading({
    forbidClick:true,
    message: '加载中...'
  });

  const headers = {

  };
  if(window.$globalHub){
    // console.log(window.$globalHub.$store.getters.token);
    headers.token = window.$globalHub.$store.getters.token || '';
  }
  const baseUrl = process.env.API;
  const configData = {
    url: baseUrl + url, // 请求的地址
    timeout: TIME_OUT, // 超时时间, 单位毫秒
    headers
  }
  let Data // 设置默认source
  if (data instanceof FormData) {
    Data = data
    // Data.append('source', SOURCE)
  } else {
    // Data = {...data, source: SOURCE}
    Data = {...data}
  }

  if (method === 'get') {
    configData.method = 'get'
    configData.params = Data // get 请求的数据
  } else if (method === 'postForm') {
    configData.method = 'post'
    if (Data instanceof FormData) {
      configData.headers['Content-Type'] = 'multipart/form-data; charset=UTF-8'
      configData.data = Data
    } else {
      configData.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
      configData.data = qs.stringify(Data)
    }
  } else if (method === 'postJson') {
    configData.method = 'post'
    configData.headers['Content-Type'] = 'application/json; charset=UTF-8'
    configData.data = Data
  }

  return axios(configData)
}

class Ajax {


  get = (url, data = {},{load = false,loadMsg = '加载中...'} = {}) => {
    return _request('get', url, data, load,loadMsg)
  }

  postForm = (url, data = {},{load = false,loadMsg = '加载中...'} = {}) => {
    return _request('postForm', url, data, load,loadMsg)
  }

  postJson = (url, data = {},{load = false,loadMsg = '加载中...'} = {}) => {
    return _request('postJson', url, data,load,loadMsg)
  }

  post = this.postJson // 默认post的Content-Type是application/json
}

export default new Ajax()
