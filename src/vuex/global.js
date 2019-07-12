// import localStorage from '../utils/localStorage'

let types = {
  LOADING: 'setLoading', // 设置loading 加载动画
  SHOW_MASKING: 'showMask', // 设置全局遮罩层
  CURR_PATH: 'currPath', // 当前路由地址
  SET_DIRECTION: 'setDirection', // 页面切换动画
  SET_BOTTOM_TAB: 'setBottomTab', // 页面底部导航栏
  SET_TOKEN: 'setToken', // 缓存页面token
  START_END_DATE: 'startendDate', // 酒店日期选择开始结束时间
};

const state = {
  token:'',
  startendDate:{},
  loading: {
    show: false,
    msg: ''
  }, // 全局 loading 加载
  showMask: false, // 全局遮罩
  direction: 'forward', // 页面切换动画
  currPath: '', // 当前路由
  bottomTab: false // 是否有底部导航栏
}
const getters = {
  token: (state) => {
    let token = localStorage.getItem('token');
    // console.log(token)
    return token;
  },
  startendDate: (state) => {
    return state.startendDate
  },
  loading: (state) => {
    return state.loading
  },
  showMask: (state) => {
    return state.showMask
  },
  currPath: (state) => {
    return state.currPath
  },
  direction: (state) => {
    return state.direction
  },
  bottomTab: (state) => {
    return state.bottomTab
  }
}
const mutations = {
  [types.LOADING] (state, obj) {
    state.loading = obj
  },
  [types.SHOW_MASKING] (state, val) {
    state.showMask = val
  },
  [types.CURR_PATH] (state, val) {
    state.currPath = val
  },
  [types.SET_DIRECTION] (state, val) {
    state.dispatch = val
  },
  [types.SET_BOTTOM_TAB] (state, val) {
    state.bottomTab = val
  },
  [types.START_END_DATE] (state, obj) {
    state.startendDate = obj
  },
  [types.SET_TOKEN] (state, val) {
    localStorage.setItem('token',val.token || '');
    localStorage.setItem('expires_in',new Date().getTime()+val.expires_in*1000 || '');
    state.token = val.token || '';
  }
}
const actions = {
  // 设置日期开始结束时间
  setStartEndDate ({ commit }, val) {
    commit(types.START_END_DATE, val)
  },
  // 设置全局 loading
  setLoading ({ commit }, { load, msg }) {
    commit(types.LOADING, { show: load, msg: msg })
  },
  // 设置全局 masking
  setShowMasking ({ commit }, val) {
    commit(types.SHOW_MASKING, val)
  },
  // 设置当前路径
  setCurrPath ({ commit }, val) {
    commit(types.CURR_PATH, val)
  },
  // 设置页面流转动画
  setDirection ({ commit }, val) {
    commit(types.SET_DIRECTION, val)
  },
  // 设置底部导航栏
  setBottomTab ({ commit }, val) {
    commit(types.SET_BOTTOM_TAB, val)
  },
  // 设置Token
  setToken ({ commit }, val) {
    commit(types.SET_TOKEN, val)
  }
}
export default {
  state,
  mutations,
  getters,
  actions
}
