// pages/kind/kind.js
Page({
  /**
    * 页面的初始数据
    */
  data: {
    type_1: true,   //根据底部栏切换显示
    type_2: false,
    type_3: true,
    isChecked_1: false,
    isChecked_2: true,
    isChecked_3: false,
    datainfo:[],
    datainfo1:[],
    key2: 'key2'
  },

  switch_1() {   // 用于底部栏切换
    this.setData({
      type_1: false,
      type_2: true,
      type_3: true,
      isChecked_1: true,
      isChecked_2: false,
      isChecked_3: false,
    })
  },

  switch_2() {
    this.setData({
      type_1: true,
      type_2: false,
      type_3: true,
      isChecked_1: false,
      isChecked_2: true,
      isChecked_3: false,
    })
  },

  switch_3() {
    this.setData({
      type_1: true,
      type_2: true,
      type_3: false,
      isChecked_1: false,
      isChecked_2: false,
      isChecked_3: true,
    })
  },

  // getStorageSync: function () {
  //   var that = this
  //   let key = 'key'
  //   console.log("2")
  //   var data = wx.getStorageSync(key)

  //     console.log(data)
  //   wx.cloud.callFunction({
  //     name: "getdatabyasset_name2",
  //     data: {
  //       name: data
  //     }
  //   }).then(res => {

  //     console.log(res);
  //     var newData3 = res.result.data;
  //     console.log("小花");
  //     console.log(newData3);
  //     console.log(newData3[0]);
  //     this.setData({
  //       datainfo: newData3,
  //       datainfo1: newData3[0]
  //     })
  //   })
  // },

// 查询设备信息的函数
  queryDeviceInfo(deviceId, successCallback, failCallback) {
    const db = wx.cloud.database();
    const devicesCollection = db.collection('devices');

    // 查询云数据库中的相关信息
    devicesCollection.where({
      id: deviceId
    }).get({
      success: function(res) {
        if (res.data.length > 0) {
          // 存在该设备
          const deviceInfo = res.data[0];
          successCallback(deviceInfo);
        } else {
          // 不存在该设备
          failCallback("设备不存在");
        }
      },
      fail: function(error) {
        failCallback("查询失败：" + error);
      }
    });
  },

  imageLoad: function(e) {
    var $width=e.detail.width,    //获取图片真实宽度
        $height=e.detail.height,
        ratio=$width/$height;    //图片的真实宽高比例
    var viewWidth=718,           //设置图片显示宽度，左右留有16rpx边距
        viewHeight=718/ratio;    //计算的高度值
     var image=this.data.images; 
     //将图片的datadata-index作为image对象的key,然后存储图片的宽高值
     image[e.target.dataset.index]={
        width:viewWidth,
        height:viewHeight
     }
     this.setData({
          images:image
     })
 },
  toinfoDetail(res) {
    //console.log(this.data)
    console.log(res.currentTarget.dataset.name)
    var name = res.currentTarget.dataset.name

    wx.setStorageSync(this.data.key2, name)
    console.log(this.data.key2)
    console.log("1")
    console.log(name)
    wx.navigateTo({
      url: '../infodetail/infodetail',
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getStorageSync()
    // 获取传递的设备id
    const deviceId = options.id;
    console.log("跳转设备:", deviceId);
    // 封装后的查询函数调用
    this.queryDeviceInfo(
      deviceId,
      function(deviceInfo) {
        console.log("设备信息：", deviceInfo);
        // 根据设备信息做相应处理
      },
      function(errorMessage) {
        console.error(errorMessage);
        // 处理设备不存在或查询失败的情况
      }
    );
  }
})