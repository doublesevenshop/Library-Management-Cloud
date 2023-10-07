// pages/user/user.js
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
    urlArr1:[],
    avatarUrl: [defaultAvatarUrl],
    thumb:'',
    tabs: [
      {
        id: 0,
        value: "我的收藏",
        isActive: true
      },
      {
        id: 1,
        value: "历史浏览",
        isActive: false
      }

    ]

  },

  getuserdata(){
    var outuser="outuser"
    var userdata=wx.getStorageSync(outuser)
    this.setData({
        userdata:userdata
    })
    console.log(this.data.userdata)
  },

chooseImageTap() {
    let _this = this;
    if(this.data.userdata){
        wx.showToast({
            title: '游客暂无权限',
            icon:"none"
          })
          setTimeout(()=>{
            wx.hideToast();
          },1500)
      }
    else{ 
    console.log(this.data.avatarUrl)
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍一张'],
      itemColor: "#5C6BC0",
      success(res){
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            // 从相册中选择
            _this.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            // 使用相机
            _this.chooseWxImage('camera')
          }
        }
      }
    })
   }
  },
  // 选择图片
  chooseWxImage(type) {
    let _this = this;
    let imgs = this.data.avatarUrl;
    console.log(this.data.avatarUrl)
    console.log(imgs.length)
    console.log(imgs.length)
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: [type],
      success(res) {
        if (imgs.length > 2) {
          return wx.showToast({
            title: '最多可上传1张图片',
            icon: 'none'
          })
        }
        _this.upload(res.tempFilePaths[0]);
      }
    })
  },
  //上传图片到服务器
  upload: function(path) {
   let _this = this;
   var urlArr1=this.data.urlArr1;
   let keyuser = 'keyuser'
    userid = wx.getStorageSync(keyuser)
    wx.showToast({
        icon: "loading",
        title: "正在上传"
      }),
      //将本地资源上传到服务器
      console.log(this.data.urlArr1)
      console.log(urlArr1)
      wx.cloud.deleteFile({
        fileList:[this.data.avatarUrl[0]]
      })
      wx.cloud.uploadFile({
        cloudPath:"Avatar_image/"+Date.now()+".jpg",   // 要上传文件资源的云储存路径
        filePath: path,  
        })
        .then(res=>{
            urlArr1.push(res.fileID)
            console.log(urlArr1)
            db.collection("user").doc(userid._id).update({
                data:{
                    avatarUrl: urlArr1
                    }
            })
            this.setData({
                avatarUrl:urlArr1,
            })
            console.log(this.data.avatarUrl)
            wx.hideLoading()
            this.setData({
                urlArr1:[],
            })
        })
        },


  getStorageSync: function () {
    var that = this
    let keyuser = 'keyuser'
    console.log("2")
    userid = wx.getStorageSync(keyuser)
    if(userid.avatarUrl){
        var pic=userid.avatarUrl
    }
    else{
        var pic=that.data.avatarUrl
    }
    console.log(userid)
    this.setData({
      username:userid.name,
      urlArr1:[],
      avatarUrl:pic
    })
      
   
  },
  toinfoDetail(res) {
   
    wx.navigateTo({
      url: '../infodetail/infodetail',
    })
  },
  newdeviceinfo(){
    if(this.data.userdata){
        wx.showToast({
            title: '游客暂无权限',
            icon:"none"
          })
          setTimeout(()=>{
            wx.hideToast();
          },1500)
      }
    else{ 
    wx.navigateTo({
      url: '../newdevice/newdevice',
    })
    }
  },
  chulijindu(){
    wx.navigateTo({
      url: '../process/process',
    })
  },

  openOpinion(){
    wx.navigateTo({
        url: '../suggestion/suggestion',
      })
  },

  aboutUs(){
    wx.navigateTo({
        url: '../us/us',
      })
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

  },
  handleTabsItemChange(e) {
    const { index } = e.detail;
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false)
    this.setData({
      tabs
    })

  },
  onLoad: function (options) {
    this.getStorageSync()
    this.getuserdata()
  },
  methods: {
    //点击事件
  },
})