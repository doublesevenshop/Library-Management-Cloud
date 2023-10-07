// pages/message/message.js
const db=wx.cloud.database();
const _=db.command;
var test=0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    length_Top:0,
    RepairOrNote: 'Repair',
    datalist0:[],
    datalist:[],
  },


  getuserdata(){
    var outuser="outuser"
    var userdata=wx.getStorageSync(outuser)
    this.setData({
        userdata:userdata
    })
    console.log(this.data.userdata)
  },

  fold0: function(e) {
    var that = this;
    var num=e.currentTarget.dataset.num
    var id=e.currentTarget.dataset.id
    var fold=e.currentTarget.dataset.fold
    db.collection("message_repair").doc(id).update({
      data:{
        foldStat: !fold
      }
    }).then(e=>{
      var newdata0=this.data.datalist0
      newdata0[num].foldStat=!newdata0[num].foldStat
      this.setData({
       datalist0:newdata0
     })
   })
  },

  fold: function(e) {
    var that = this;
    var num=e.currentTarget.dataset.num
    var id=e.currentTarget.dataset.id
    var fold=e.currentTarget.dataset.fold
    db.collection("message_data").doc(id).update({
      data:{
        foldStat: !fold
      }
    }).then(e=>{
      var newdata=this.data.datalist
      newdata[num].foldStat=!newdata[num].foldStat
      this.setData({
       datalist:newdata
     })
   })
  },

  getData0(num=2,page=0){
    var that=this
    db.collection("message_repair").orderBy("createtime","desc").
    skip(page).limit(num).get().then(res=>{
      var olddata0=that.data.datalist0
      var newdata0=olddata0.concat(res.data);
      this.setData({
        datalist0:newdata0
      })

    })
  },

  //获取留言数据
  getData_Topping(){
    var that=this
    db.collection("message_data").where({isTopping:true}).
    orderBy("createtime","desc").get().then(res=>{
        var length_T=res.data.length;
        var newdata=res.data;
        this.setData({
          length_Top:length_T,
          datalist:newdata
        })
      })
  },

  getData(num=3,page=0){
    var that=this
    db.collection("message_data").where({isTopping:false})
    .orderBy("createtime","desc").
    skip(page).limit(num).get().then(res=>{
        var olddata=that.data.datalist
        var newdata=olddata.concat(res.data);
        this.setData({
          datalist:newdata
        })
      })
  },

  getData_back(num){
    var that=this
    db.collection("message_data").where({isTopping:false}).orderBy("createtime","desc").limit(num).get().then(res=>{
      var olddata=that.data.datalist
      var newdata=olddata.concat(res.data);
      that.setData({
        datalist:newdata
      })
    })
  },

  getData0_back(num){
    var that=this
    db.collection("message_repair").orderBy("createtime","desc").limit(num).get().then(res=>{
      var newdata0=res.data;
      that.setData({
        datalist0:newdata0
      })
    })
  },

    // 手指触摸动作开始
    touchStart: function(e){
      let that = this;
      //开始触摸时 重置所有删除
      that.data.datalist.forEach(function (v, i) {
          if (v.isTouchMove) v.isTouchMove = false; // 只操作为true的
      })
      // 记录手指触摸开始坐标
      that.setData({
          startX: e.changedTouches[0].clientX,  // 开始X坐标
          startY: e.changedTouches[0].clientY,  // 开始Y坐标
          datalist: that.data.datalist
      })
  },

  // 手指触摸后移动

  touchMove: function(e){
    let that = this,
        index = e.currentTarget.dataset.index,    // 当前下标
        startX = that.data.startX,                // 开始X坐标
        startY = that.data.startY,                // 开始Y坐标
        touchMoveX = e.changedTouches[0].clientX, // 滑动变化坐标
        touchMoveY = e.changedTouches[0].clientY, // 滑动变化坐标
        // 获取滑动角度
        angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
　　　　　// 判断滑动角度
    that.data.datalist.forEach(function (v, i) {
        v.isTouchMove = false
        // 滑动超过30度角 return
        if (Math.abs(angle) > 30) return;
        if (i == index) {
            // 右滑
            if (touchMoveX > startX) 
                v.isTouchMove = false
            // 左滑
            else 
                v.isTouchMove = true
        }
  })
  // 更新数据
  that.setData({
      datalist: that.data.datalist
  })
},

// 计算滑动角度
angle: function (start, end) {
    let that = this,
        _X = end.X - start.X,
        _Y = end.Y - start.Y;
    // 返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
},

// 置顶按钮
up: function(e){
    var that=this
    var {id,idx,it} = e.currentTarget.dataset;
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
    db.collection("message_data").where({
          isTopping:true
      }).orderBy("time","desc").get().then(res=>{
        test=res.data.length
        console.log(test)
        if(test<=2||it==true){
            console.log("牛")
            console.log(test)
            wx.cloud.callFunction({
                name:"getmessage_up",
                data:{
                    id:id,
                    it:it
                }
            }).then(e=>{
              var page=this.data.datalist.length
              var num=page-this.data.length_Top
              this.getData_Topping()
              setTimeout(()=>{
                num=page-this.data.length_Top
                console.log(num)
              },300)
              console.log("发生什么事了")
              setTimeout(()=>{
                that.getData_back(num)
            },600)
            })
        }
        else{
            wx.showToast({
                title: '最多可置顶3项',
                icon:'none',
              })
              setTimeout(()=>{
                wx.hideToast();
              },1500)
        }
    })
    }
},

//标记按钮
im_r: function(e) {
  var that = this;
  var idx=e.currentTarget.dataset.idx
  var id=e.currentTarget.dataset.id
  var isImport=e.currentTarget.dataset.ii
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
  db.collection("message_repair").doc(id).update({
    data:{
      isImport: !isImport
    }
  }).then(e=>{
    var newdata0=this.data.datalist0
    newdata0[idx].isImport=!newdata0[idx].isImport
    this.setData({
     datalist0:newdata0
   })
 })
 }
},

im: function(e){
  var {id,idx,ii} = e.currentTarget.dataset
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
  wx.cloud.callFunction({
    name:"getmessage_im",
    data:{
    id:id,
    ii:ii
    }
  }).then(e=>{
  var newdata=this.data.datalist
  newdata[idx].isImport=!newdata[idx].isImport
    this.setData({
    datalist:newdata
    })
  })
 }
},

solved: function(e) {
  var that = this
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
  wx.showModal({
    title:"提示",
    content:"确认维修完成？",
    success: function(res) {
      if(res.confirm){
        
        console.log(that.data)
        var idx=e.currentTarget.dataset.idx
        var id=e.currentTarget.dataset.id
        var oldid=e.currentTarget.dataset.oldid
        var file=e.currentTarget.dataset.file
        db.collection("libraryinfo").doc(oldid).update({
          data:{
            del_flag:false,
            file4:null
            }
        })
        for(var i=0;i<file.length;i++){
          wx.cloud.deleteFile({
            fileList:[file[i]]
          })
        }
        db.collection("message_repair").doc(id).remove()
        .then(e=>{
          var newdata0=that.data.datalist0
          var i=idx
          for(i=idx;i<newdata0.length-1;i++)
          {
            newdata0[i]=newdata0[i+1]
          }
          if(i==newdata0.length-1)
          {
            newdata0.pop()
            i=idx
          }
      
          console.log(that.data.datalist0[0])
          that.setData({
            datalist0:newdata0
          })
         })
      } else{
        console.log("已取消")
      }
    }
  })
 }
},

del: function(e){

  var that=this
  var {id,idx} = e.currentTarget.dataset
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
  wx.cloud.callFunction({
    name:"getmessage_de",
    data:{
    id:id,
    }
  }).then(e=>{
    var newdata=this.data.datalist
    var i=idx
    if(newdata[i].isTopping){
        var length_T=that.data.length_Top-1
        that.setData({
            length_Top:length_T
        })
        console.log(that.data.length_Top)
    }
    for(i=idx;i<newdata.length-1;i++)
    {
      newdata[i]=newdata[i+1]
    }
    if(i==newdata.length-1)
    {
      newdata.pop()
      i=idx
    }

  console.log(this.data.datalist[0])
    this.setData({
      datalist:newdata
    })
  })
  }
},

  tabChange: function (e) {
    var type = e.currentTarget.dataset.id;
    console.log(e.currentTarget.dataset)
    this.setData({
      RepairOrNote: type
    })
  },

  onReachSend:function(e){
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
      url: '/pages/message_send/message_send',
    })
   }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getuserdata()
    var page0=this.data.datalist0.length
    var that=this
    if(page0==0)
    {
      this.getData0(2-page0,page0)
    }
    if(page0>0)
    {
      this.getData0_back(page0+1)
    }

    var page=this.data.datalist.length-this.data.length_Top
    // console.log("标记一下1")
    console.log(page)
    if(page==0)
    {
    //   console.log("标记一下2")
      console.log("情况1") 
      console.log(page) 
      this.getData_Topping()  
      setTimeout(()=>{
        console.log("情况1_1")
        console.log(page) 
        that.getData(5-page,page)
    },300)
    }
    if(page>0)
    {
      console.log("情况2")
      console.log(page)  
      this.getData_Topping()
      setTimeout(()=>{
        that.getData_back(page+1)
        console.log("情况2_1")
        console.log(page) 
    },300)
      console.log("情况2_2")
      console.log(page) 
    }
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
        wx.hideToast();
        var page0=this.data.datalist0.length
        this.getData0(2,page0)
        var page=this.data.datalist.length-this.data.length_Top
        console.log(page)
        this.getData(5,page)
      },800)
    
  },

  previewBigImage(e) {
    let imgs = e.currentTarget.dataset.file;
    let {index} = e.currentTarget.dataset;
    wx.previewImage({
      //当前显示图片
      current: imgs[index],
      //所有图片
      urls: imgs
    })
  },
})