// pages/byasset/byasset.js
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
        let keyasset = 'keyasset'
        //console.log("2")
        var buname = wx.getStorageSync(keyasset)
        wx.cloud.callFunction({
        name: "getdatabytype_name",
        data: {
            name: buname
        }
        }).then(res => {
        console.log(res);
        //console.log(oldData3);
        var newData3 = res.result.data;
        console.log(3);
        console.log(newData3);
        this.setData({
            busidetail: newData3,
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
        this.getStorageSync();
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