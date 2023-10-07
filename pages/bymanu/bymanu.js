// pages/bymanu/bymanu.js
const db = wx.cloud.database();
Page({
    
    /**
     * 页面的初始数据
     */
    data: {
        key:'key',
    },

    getStorageSync: function () {
        var that = this
        let keymanu = 'keymanu'
        //console.log("2")
        var maname = wx.getStorageSync(keymanu)
        wx.cloud.callFunction({
        name: "getdatabymanufacture",
        data: {
            name: maname
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

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getStorageSync()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})