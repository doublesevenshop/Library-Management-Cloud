var souSuo = ""
Page({
  /**
   * 页面的初始数据
   */
  data: {
    menudetail: [],
    key:'key',
  },
  
  
  myIpt(res) {
    var name1 = res.detail.value;
    souSuo=name1;
    console.log(souSuo)  
  },
  searching(res){
    console.log(souSuo)
    wx.cloud.callFunction({
      name: "search",
      data: {
        name: souSuo
      }
    }).then(res => {
      console.log(res);
      var newData = res.result.data;
      
      console.log(newData);
        this.setData({
          menudetail: newData,
          
        })
    })
  },
  toFoodDetail(res) {
    //console.log(this.data)
    console.log(res.currentTarget.dataset.name)
    var name = res.currentTarget.dataset.name
    console.log("这是name")
    console.log(name)
    wx.setStorageSync(this.data.key,name)
    console.log(this.data.key)
    console.log("1")
    console.log(name)
    wx.navigateTo({
      url: '../detail/detail',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
});
