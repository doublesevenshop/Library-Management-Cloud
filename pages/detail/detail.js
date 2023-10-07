// pages/kind/kind.js
Page({
  /**
    * 页面的初始数据
    */
  data: {
    type_1: true,
    type_2: false,
    type_3: true,
    isChecked_1: false,
    isChecked_2: true,
    isChecked_3: false,
    datainfo:[],
    datainfo1:[],
    key2: 'key2'
  },

  switch_1() {
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

  getStorageSync: function () {
    var that = this
    let key = 'key'
    console.log("2")
    var data = wx.getStorageSync(key)

      console.log(data)
    wx.cloud.callFunction({
      name: "getdatabyasset_name2",
      data: {
        name: data
      }
    }).then(res => {

      console.log(res);
      var newData3 = res.result.data;
      console.log("小花");
      console.log(newData3);
      console.log(newData3[0]);
      this.setData({
        datainfo: newData3,
        datainfo1: newData3[0]
      })
    })
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
    this.getStorageSync()
  },

})