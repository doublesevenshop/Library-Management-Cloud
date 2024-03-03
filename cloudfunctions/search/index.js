// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database({
  env:cloud.DYNAMIC_CURRENT_ENV
});
const _ = db.command;
// 云函数入口函数
exports.main = async (event, context) => {
  var ename = event.name;
  return await db.collection("libraryinfo").where({
    asset_name: db.RegExp({
      regexp: ename,
      //从搜索栏中获取的value作为规则进行匹配。
      options: 'i',
      //大小写不区分
  })
}).get()
}




