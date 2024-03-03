// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database({
  env:cloud.DYNAMIC_CURRENT_ENV
}); 
const _=db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  var eid=event.id;  
  return await db.collection("assets_type").doc(eid).update({
    data:{
      id: _.inc(7)
    }
  })
}