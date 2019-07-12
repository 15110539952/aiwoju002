import Exception from './exceptions'
import config from '../../config/index'
import Vue from 'vue'

const PROGRAM_NAME = config.build.apiConfigParam
export default {
  /**
   * 测试post接口
   */
  testPost (param) {
    return new Promise(resolve => {
      Vue.$api.xHttp.post(`${PROGRAM_NAME}/dynamic_analysis/indicator_values`, {
        courtId: param.courtId,
        indicators: param.indicators
      }, '', { load: true }).then(res => {
        if (res.code === Exception.CODE.SUCCESS) {
          resolve(res.data)
        } else {
          Exception.ErrorMsgNotification(res.code, res.msg)
        }
      }).catch(e => {
        Exception.ErrorMsgNotification(-1, e.msg)
      })
    })
  },
  /**
   * 测试 get接口
   * @param param
   * @returns {Promise<any>}
   */
  testGet (param) {
    return new Promise(resolve => {
      Vue.$api.xHttp.get(`${PROGRAM_NAME}/home/cause_predict?year=${param.year}&courtId=${param.courtId}`, null, '', { load: true }).then(res => {
        if (res.code === Exception.CODE.SUCCESS) {
          resolve(res.data)
        } else {
          Exception.ErrorMsgNotification(res.code, res.msg)
        }
      }).catch(e => {
        Exception.ErrorMsgNotification(-1, e.msg)
      })
    })
  },
  /**
   * 参数化
   */
  testGetOfParam (param) {
    return new Promise(resolve => {
      Vue.$api.xHttp.get(`${PROGRAM_NAME}/home/cause_predict`, {
        year: param.year, courtId: param.courtId
      }, '', { load: true }).then(res => {
        if (res.code === Exception.CODE.SUCCESS) {
          resolve(res.data)
        } else {
          Exception.ErrorMsgNotification(res.code, res.msg)
        }
      }).catch(e => {
        Exception.ErrorMsgNotification(-1, e.msg)
      })
    })
  }
}
