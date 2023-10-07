// miniprogram/pages/infodetail/infodetail.js
const db = wx.cloud.database();
var urlArr1 = [];
var filePath = [];
var dataid = [];
var datainfo = [];
var useinfo2;
var useinfo;
Page({
  /**
   * 页面的初始数据
   */
  data: {   
    images:{} 
  },

  getuserdata(){
    var outuser="outuser"
    var userdata=wx.getStorageSync(outuser)
    this.setData({
        userdata:userdata
    })
    console.log(this.data.userdata)
  },

  imageLoad: function(e) {
    var $width=e.detail.width,    //获取图片真实宽度
        $height=e.detail.height,
        ratio=$width/$height;    //图片的真实宽高比例
    var viewWidth=500,           //设置图片显示宽度，左右留有16rpx边距
        viewHeight=500/ratio;    //计算的高度值
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
 
  getStorageSync: function () {
    var that = this
    let key2 = 'key2'
    //console.log("2")
    var data = wx.getStorageSync(key2)
   // console.log("5")
    console.log(data)
    wx.cloud.callFunction({
      name: "getdatabyid",
      data: {
        name: data
      }
    }).then(res => {
      //console.log(res.result.data[0]._id);
      dataid=res.result.data[0]._id;
      datainfo= res.result.data[0]
      this.setData({
        datainfo: res.result.data[0],
        dataid:res.result.data[0]._id
      })  
    })
  },

  clickBtn1() {
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

  chooseWxImage(type) {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: res => {
        filePath = res.tempFilePaths     
        filePath.forEach((item, idx) => {
          var fileName = Date.now() + "_" + idx;
          this.cloudFile1(item, fileName)
        })
      }
    })
  },
  cloudFile1(path, filename) {
    wx.showLoading({
      title: '上传中',
    })
    wx.cloud.uploadFile({
      cloudPath: "normal_equip_image/"+filename + ".jpg",
      filePath: path
    }).then(res => {
      console.log(res)
      urlArr1.push(res.fileID)
        this.setData({
          urlArr1
        })
        console.log("下面是urlArr1")
      console.log(urlArr1)
      //console.log("下面是dataid")
      //console.log(dataid)
      wx.cloud.deleteFile({
        fileList:datainfo.file1 ,
        success: res => {
          // handle success
          //console.log(res.fileList)
        },
        fail: console.error
      })
      db.collection("libraryinfo").doc(dataid).update({
          data: {
            file1: urlArr1,
          }
        }).then(res => {
          //console.log(res)
          urlArr1=[]
        })
        
        this.getStorageSync()
        wx.hideLoading()
        
      })
  },
  
  myIpt(res) {
    useinfo = res.detail.value;
    console.log(useinfo) 
  },

  clickBtn3(){
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
        if(useinfo){
        wx.showLoading({
            title: '上传中',
        })
        db.collection("libraryinfo").doc(dataid).update({
            data:{
            file3:useinfo
            }
        }).then(res=>{
            wx.hideLoading()
            console.log(res)
            this.getStorageSync()
        })  
        }
        else{
        wx.showToast({
            title: '请输入内容',
            icon:'none',
        })
        setTimeout(()=>{
            wx.hideToast();
        },1500)
        }
    }
},

 clickBtn5(e){
  console.log(this.data.datainfo.del_flag)
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
    if(this.data.datainfo.del_flag)
    {
        wx.showToast({
        title: '已报修',
        icon:'none',
        })
        setTimeout(()=>{
        wx.hideToast();
        },1500)
    }
    else
    {   
        wx.navigateTo({
        url: '/pages/askrepair/askrepair',
        })
    }
  }
 },

  /**
   * 生命周期函数--监听页面加载
   */
  // onLoad: function (options) {
  //   this.getStorageSync()
  // },

  onShow: function (options) {
    this.getuserdata()
    this.getStorageSync()
  },
  
})