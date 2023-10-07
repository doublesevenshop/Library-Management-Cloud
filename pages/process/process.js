// pages/demo4/demo4.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: 0,
    dataList: [],
    menu: [],
    menudetail: [],
    orderType: 0, 
    orderOrBusiness: 'order',
    key:'key',
  },
  search: function () {
    wx.navigateTo({
      url: '../search/search'
    })
  },
  getData(num = 10, page = 0) {
    wx.cloud.callFunction({
      name: "getdata",
      data: {
        num: num,
        page: page
      }
    }).then(res => {
      console.log(res)
      var oldData = this.data.dataList
      var newData = oldData.concat(res.result.data);
      console.log(newData)
      this.setData({
        dataList: newData
      })
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */



  chulijindu(res) {
 
    wx.cloud.callFunction({
      name: "getdatabydel_flag",
      data: {
        name: true
      }
    }).then(res => {
      console.log(res);
      //console.log(oldData3);
        var newData3 = res.result.data;
      console.log(3);
      console.log(newData3);
        this.setData({
          menudetail: newData3,
         
        })
    })
  },
  
  toFoodDetail(res) {
    //console.log(this.data)
    console.log(res.currentTarget.dataset.name)
    var name = res.currentTarget.dataset.name

    wx.setStorageSync(this.data.key, name)
    console.log(this.data.key)
    console.log("1")
    console.log(name)
    wx.navigateTo({
      url: '../detail/detail',
    })
  },

  onLoad: function (options) {  
    //this.getData();
   
    this.chulijindu();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var page = this.data.dataList.length
    this.getData(10, page)
    var page2 = this.data.menu.length
    this.getData2(10, page2)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})