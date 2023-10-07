const db=wx.cloud.database(); 

Page({

  /**
   * 页面的初始数据
   */

  data: {
    
  },

 

btnSub(res){

var {type_name,asset_id,asset_name,obtain_time,user,department,storage_location,manufacturer,
  brand,specification,create_user,create_time,manager,supplier,contract_no,factory_no,old_storage_location
  }=res.detail.value;



  db.collection("libraryinfo").add({
    data: {
      type_name:type_name,
      asset_id:asset_id,
      asset_name:asset_name,
      obtain_time:obtain_time,
      user:user,
      department:department,
      storage_location:storage_location,
      manufacturer:manufacturer,
      brand:brand,
      specification:specification,
      create_user:create_user,
      create_time:create_time,
      manager:manager,
      supplier:supplier,
      contract_no:contract_no,
      factory_no:factory_no,
      old_storage_location:old_storage_location
    }
  }).then(res=>{
    console.log(res)
  })
},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})