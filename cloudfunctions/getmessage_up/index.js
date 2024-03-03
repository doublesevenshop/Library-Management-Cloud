// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database({
    env:cloud.DYNAMIC_CURRENT_ENV
  });
const _=db.command;

// 云函数入口函数
exports.main = async (event, context) => {
    var id=event.id;
    if(event.it){
        return await db.collection("message_data").doc(id).update({
            data:{
                isTopping:false
            }
        })
    }
    if(!event.it){
        return await db.collection("message_data").doc(id).update({
            data:{
                isTopping:true
            }
        })
    }
    
}