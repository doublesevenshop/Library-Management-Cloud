// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
//初始化数据库
const db = cloud.database({
  env:cloud.DYNAMIC_CURRENT_ENV
}); 
const _ = cloud.db.command
const $ =   _.aggregate

// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection('class').aggregate()
    .lookup({
      from: <要连接的集合名>,
  localField: <输入记录的要进行相等匹配的字段>,
  foreignField: <被连接集合的要进行相等匹配的字段>,
  as: <输出的数组字段名>
})
}