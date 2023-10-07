// pages/register/register.js
let app = getApp(); // 获取小程序实例
const db = wx.cloud.database(); // 获取云数据库实例
const userList = db.collection('user'); // 获取名为'user'的集合实例
var name = ""; // 存储用户名
var password = ""; // 存储密码
var myVlu = ""; // 未被使用的变量，通常应该被删除？
var showModal = false; // 控制是否显示一个弹出框

// 页面对象
Page({

  /**
   * 页面的初始数据
   */
  data: {
     keyuser:'keyuser',
     outuser:'outuser'
  },
//定义两个输入框的事件处理函数，用于获取用户输入的用户名和密码：
  myIpt(res) {
    var name1 = res.detail.value;
    name=name1;
    // console.log(name)
    
  },
  myIpt2(res) {
    var password1 = res.detail.value;
    password=password1;
   // console.log(password)

  },


  //登录
  logBtn: function (options) {
    
    wx.cloud.callFunction({
      name: "regisiter"
    }).then(res=>{
        var user=res.data;
        console.log(name);
        console.log(password);
        // console.log(res.result.data)
        var user=res.result.data;
        for (var i = 0; i < user.length; i++){
          if (name !== user[i].name){

            }
            else{
            if (password !== user[i].password) {
             console.log("失败1")
              wx.showToast({
                title: '登陆失败！！',
                icon: 'none',
                duration: 2500
              })
              }else {
                console.log(user[i]._id)
                console.log(this.data.keyuser)
                console.log('登陆成功')
                wx.setStorageSync(this.data.keyuser, user[i])
                wx.setStorageSync(this.data.outuser, false)
              wx.showToast({
                title: '登陆成功！！',
                icon: 'success',
                duration: 2500
              })
        
             
              wx.switchTab({
                url: '../start/start',
              })
            }
            
          } 
        }
    
      })
    },
  

  submit: function () {
    this.setData({
      showModal: true
    
    })
    console.log(showModal)
  },

  preventTouchMove: function () {

  },


  go: function () {
    this.setData({
      showModal: false
    })
  },

  outvisitor: function (options) {
    wx.setStorageSync(this.data.outuser, true)
    console.log("成功")
    wx.switchTab({
        url: '../start/start',
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
})