/**
 * 路由跳转
 */

// 映射
const routerPath = {
  "index": "/pages/index/index"
}

module.exports = {
  // this.$router.push("/index", query: {})
  // index?name=xxx&age=20 query={name: 'xxx', age: 20} axios fetch
  push(path, option={}) {
    if (typeof path === 'string') {
      option.path = path;
    } else {
      option = path
    }

    // 获取url: index
    let url = routerPath[option.path]
    // openType跳转类型
    let { query = {}, openType } = option
    let params = this.parse(query)

    if (params) {
      url += '?' + params
    }

    this.to(openType, params)
  },
  to(openType, url) {
    let obj = { url }
    if (openType === 'redirect') {
      wx.redirectTo(obj)
    } else if (openType === 'reLaunch') {
      wx.reLaunch(obj)
    } else if (openType === 'back') {
      wx.navigateBack({
        delta: 1
      })
    } else {
      wx.navigateTo(obj)
    }
  },
  parse(query) {
    let arr = [];
    for(item in query) {
      arr.push(item+ "=" + query[item])
    }
    return arr.join("&")
  }
}