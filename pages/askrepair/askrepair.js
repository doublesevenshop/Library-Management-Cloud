// pages/askrepair/askrepair.js
const db=wx.cloud.database();
const _=db.command;
var filePath = [];
var dataid = [];
var datainfo = [];

Page({

    /**
     * 页面的初始数据
     */
    data: {
        imageList:[],      // 上传图片集合
        urlArr1:[]
    },

    btnsub(res){
      var that = this;
      let keyuser = 'keyuser';
      var author= wx.getStorageSync(keyuser).name;
      var repair_content=res.detail.value.repair_content;
      var asset_name=this.data.datainfo.asset_name;
      var asset_id=this.data.datainfo.asset_id;
      var manufacturer=this.data.datainfo.manufacturer;
      var storage_location=this.data.datainfo.storage_location;
      var file=this.data.imageList
      let date= new Date() ;
      let year= date.getFullYear();
      let month=date.getMonth()+1;
      let sdate=date.getDate();
      let hour=date.getHours()<10? '0'+date.getHours():date.getHours();
      let minu=date.getMinutes()<10? '0'+date.getMinutes():date.getMinutes();
      let secd=date.getSeconds()<10? '0'+date.getSeconds():date.getSeconds();
      let time=year+"-"+month+"-"+sdate+' '+hour+":"+minu+":"+secd;
      console.log(author,repair_content,time,asset_name,asset_id,manufacturer,storage_location,file);
      wx.showLoading({
        title: '上传中',
      })
      db.collection("message_repair").add({
        data:{
          oldid:this.data.dataid,
          author:author,
          repair_content:repair_content,
          createtime:db.serverDate(),
          time:time,
          asset_name:asset_name,
          asset_id:asset_id,
          manufacturer:manufacturer,
          storage_location:storage_location,
          file:file,
          foldStat:true,
          isImport:false,
          isTopping:false
        }
      }).then(res=>{
        this.setData({
          imageList:[],
          urlArr1:[]
        })
        console.log(res)
        wx.navigateBack({
          delta: '/pages/infodetail/infodetail',
        })
      })
      db.collection("libraryinfo").doc(dataid).update({
        data:{
          file4:repair_content
          }
      })
      db.collection("libraryinfo").doc(dataid).update({
        data:{
          del_flag:true
          }
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

      chooseImageTap() {
        let _this = this;
        console.log(this.data.imageList)
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
      },
      // 选择图片
      chooseWxImage(type) {
        let _this = this;
        let imgs = this.data.imageList;
        console.log(this.data.imageList)
        wx.chooseImage({
          count: 1,
          sizeType: ['original', 'compressed'],
          sourceType: [type],
          success(res) {
            if (imgs.length > 2) {
              return wx.showToast({
                title: '最多可上传三张图片',
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
       var urlArr1=this.data.urlArr1
        wx.showToast({
            icon: "loading",
            title: "正在上传"
          }),
          //将本地资源上传到服务器
          console.log(this.data.imageList)
          console.log(urlArr1)
          wx.cloud.uploadFile({
            cloudPath:"equip_image/"+Date.now()+".jpg",   // 要上传文件资源的云储存路径
            filePath: path,  
            })
            .then(res=>{
                urlArr1.push(res.fileID)
                console.log(urlArr1)
                this.setData({
                    imageList:urlArr1,
                })
                console.log(this.data.imageList)
                wx.hideLoading()
            })
            },

      // 删除图片
      removeChooseImage(e) {
        let imgs = this.data.imageList;
        console.log(imgs)
        let {index} = e.currentTarget.dataset;
        console.log(imgs[index])
        wx.cloud.deleteFile({
            fileList:[imgs[index]]
        })
        imgs.splice(index, 1);
        this.setData({
          imageList: imgs
        })
      },
      // 预览图片
      previewBigImage(e) {
        let imgs = this.data.imageList;
        let {index} = e.currentTarget.dataset;
        wx.previewImage({
          //当前显示图片
          current: imgs[index],
          //所有图片
          urls: imgs
        })
      },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      console.log(this.data.imageList)
      console.log(this.data.urlArr1)
        this.getStorageSync()
      },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

})