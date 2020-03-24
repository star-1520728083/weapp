// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'chen-kd9hf'
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const dbResult = await cloud.database().collection('list').get()

  return {
    event,
    dbResult,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}