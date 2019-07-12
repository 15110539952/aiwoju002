import Vue from 'vue'
import Vuex from 'vuex'
// 模块
import global from './global'
Vue.use(Vuex)
export default new Vuex.Store({
  // 组合各个模块
  modules: {
    global
  },
})
