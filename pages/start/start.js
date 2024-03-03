// pages/demo4/demo4.js
// 所有设备
Page({ //页面配置对象

  /**
   * 此页面的所有 
   */
  data: {
    height: 0,
    dataList: [],
    menu: [],
    menudetail: [],
    orderType: 0, 
    businType: 0, 
    orderOrBusiness: 'order',
    key:'key',
    keymanu:'keymanu',
    keyasset:'keyasset'
  },

  getuserdata(){
    var outuser="outuser"
    var userdata=wx.getStorageSync(outuser)
    this.setData({
        userdata:userdata
    })
    console.log(this.data.userdata)
  },

  search: function () { //触发页面跳转
    wx.navigateTo({
      url: '../search/search'
    })
  },
  getData(num = 10, page = 0) { //这两个函数使用 wx.cloud.callFunction 
    //方法调用云函数来获取数据，并将获取的数据追加到 dataList 和 menu 数组中。
    console.log("getdata()") 
    wx.cloud.callFunction({ 
      name: "getdata", 
      data: {
        num: num,
        page: page
      }
    }).then(res => {  //回调
      console.log("getdata res:") 
      console.log(res) //云端返回的数据
      var oldData = this.data.dataList
      var newData = oldData.concat(res.result.data);
      console.log(newData)
      this.setData({
        dataList: newData
      })
    })
  },

  getData2(num = 10, page = 0) {
    wx.cloud.callFunction({
      name: "getdata2",
      data: {
        num: num,
        page: page
      }
    }).then(res => { 
      console.log(res)
      var oldData2 = this.data.menu
      var newData2 = oldData2.concat(res.result.data);
      console.log(newData2)
      this.setData({
        menu: newData2
      })
    })
  },  
  tabChange: function (e) {  //“生产厂家” 和 “设备类型”
      //用户点击页面上的标签切换按钮时，这个函数会根据用户的选择更新 orderOrBusiness 数据，用于切换页面展示的内容。
    var type = e.currentTarget.dataset.id;  //e.currentTarget 表示当前触发事件的元素，即用户点击的 <view> 元素。
    console.log(e.currentTarget.dataset)
    this.setData({ // 使用setData来改变定义的data对象
      orderOrBusiness: type
    })
  },

  
  //处理用户在小程序页面上的点击事件

  turnMenu(res) {
    var maname  = res.currentTarget.dataset.name
    console.log(res.currentTarget.dataset)
    var type = res.currentTarget.dataset.index;
    wx.setStorageSync(this.data.keymanu, maname);
    wx.navigateTo({
        url: '../bymanu/bymanu',
    })
    this.setData({ //数据从逻辑层发送到视图层(异步），同时改变对应的 this.data 的值（同步）
        orderType: type,
    })
  },

  turnAsset(res) {
    var buname  = res.currentTarget.dataset.name
  console.log(res.currentTarget.dataset)
   var type = res.currentTarget.dataset.index;
   wx.setStorageSync(this.data.keyasset, buname);
   wx.navigateTo({
       url: '../byasset/byasset',
   })
   this.setData({
       businType: type,
   })
 },
  
 // 扫一扫按钮点击事件处理程序
  scanCode() {
    wx.scanCode({
      success(res) {
        // 处理扫描结果
        const deviceId = res.result;
        console.log("识别ID：" + deviceId);
        wx.navigateTo({
          url: '../detail/detail?id=' + deviceId + '&source=scan', //传id
        });
      },
      fail(error) {
        console.error(error);
        wx.showToast({
          title: '扫码失败',
          icon: 'none',
        });
      },
    });
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getuserdata();  
    this.getData();
    this.getData2();
    if(this.data.userdata){
        wx.showToast({
            title: '游客仅限查看信息',
            icon:"none"
          })
          setTimeout(()=>{
            wx.hideToast();
        },3000)
    }
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
    wx.showToast({
        title: '加载中',
        icon:'loading',
      })
      setTimeout(()=>{
        var page = this.data.dataList.length
        this.getData(10, page)
        var page2 = this.data.menu.length
        this.getData2(10, page2)
      },800)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})