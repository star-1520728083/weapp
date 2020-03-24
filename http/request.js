/**
 * 网络请求的公共方法
 * 1.loading toast 
 * 2.请求头的处理 （机型， 大小， 系统）等
 */
let store = require('../utils/store.js')
const system = store.getSystemInfo()

const clientInfo = {
  "clientType": 'mp', // 类型微信
  "appnm": 'star', // name
  "model": system.model, // 手机类型
  "os": system.system,
  "screen": system.screenWidth + '*' + system.screenHeight,
  "version": App.version,
  "chennel": 'miniprogram'
}

module.exports = {
  fetch(url, data={}, option={}) {
    let {loading = true, toast = true, method = 'get'} = option;
    return new Promise((resolve, reject) => {
      if(loading) {
        wx.showLoading({
          title: '加载中',
          mask: true
        })
      }

      let env = App.config.baseUrl;
      wx.request({
        url: env + url,
        method,
        data,
        header: {
          "clientInfo": JSON.stringify(clientInfo)
        },
        success(result) {
          let res = result.data;
          if (res.code == 0) {
            if (loading) {
              wx.hideLoading()
            }
            resolve(res.data)
          } else {
            if (toast) {
              wx.showToast({
                mask: true,
                title: res.message,
                icon: 'none'
              })
            } else {
              wx.hideLoading()
            }
          }
        },
        fail(err = {code: -1, msg: errMsg, errMsg}) {
          let msg = e.errMsg
          if (msg === 'request:fail timeout') {
            mag = '请求超时，请稍后处理'
          }
          wx.showToast({
            title: msg,
            icon: 'none'
          })
          reject(err)
        }
      })
    })
  }
}