// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database({
  env:cloud.DYNAMIC_CURRENT_ENV
});

// 云函数入口函数
exports.main = async (event, context) => {
  var num = event.num;
  var page = event.page;
  return await db.collection("assets_type").skip(page).limit(num).get()
}