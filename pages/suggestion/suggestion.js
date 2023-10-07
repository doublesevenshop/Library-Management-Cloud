// pages/suggestion/suggestion.js
const db=wx.cloud.database(); 
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    btnSub(res){

        var {suggestion_content}=res.detail.value;
          db.collection("suggestions").add({
            data: {
              suggestion_content:suggestion_content,
              createtime:db.serverDate()
            }
          }).then(res=>{
            console.log(res)
          })
        },

        back(){
            wx.showToast({
              title: '感谢反馈！',
            })
            setTimeout(()=>{
                wx.hideToast();
                wx.switchTab({
                    url: '/pages/mine/mine',
                  })
              },1500)
        },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

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