// pages/message_send/message_send.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
const db=wx.cloud.database();
const _=db.command;

var userid=''
var username=''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: [defaultAvatarUrl],
    index1:0,
    index2:0
  },


  //提交表单添加进数据库
  btnsub(res){
    var that = this;
    let keyuser = 'keyuser';
    var author= wx.getStorageSync(keyuser).name;
    var content=res.detail.value.content;
    let date= new Date() ;
    let year= date.getFullYear();
    let month=date.getMonth()+1;
    let sdate=date.getDate();
    let hour=date.getHours()<10? '0'+date.getHours():date.getHours();
    let minu=date.getMinutes()<10? '0'+date.getMinutes():date.getMinutes();
    let secd=date.getSeconds()<10? '0'+date.getSeconds():date.getSeconds();
    let time=year+"-"+month+"-"+sdate+' '+hour+":"+minu+":"+secd;
    console.log(author,content,time);
    db.collection("message_data").add({
      data:{
        createtime:db.serverDate(),
        author:author,
        content:content,
        time:time,
        foldStat:true,
        isImport:false,
        isTopping:false
      }
    }).then(res=>{
        wx.showToast({
            title: '上传中',
            icon:'loading',
          })
          setTimeout(()=>{
            wx.hideToast();
            console.log(res)
            wx.switchTab({
              url: '/pages/message/message',
            })
          },800)
    })
  },

  //get username
  getStorageSync: function () {
    var that = this
    let keyuser = 'keyuser'
    var i
    console.log("2")
    console.log("执行中")
    userid = wx.getStorageSync(keyuser)
    db.collection("user").doc(userid._id).get().then(res=>{
        i=res.data.avatarUrl
        console.log(i)
        this.setData({
            username:userid.name,
            avatarUrl:i
          })
    })
    console.log(userid)
  },

  changecolor1:function(e){
    let that=this;
    that.setData({
      index1:1,
      index2:0
    })
  },

  changecolor2:function(e){
    let that=this;
    that.setData({
      index1:0,
      index2:1
    })
  },

  onReachMessage:function(e){
    wx.switchTab({
      url: '/pages/message/message',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getStorageSync()
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
})