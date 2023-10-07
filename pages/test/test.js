
Page({
  data: {
  },
  getData_Topping(){
      return new Promise((resolve,reject)=>{
          console.log("第一步")
      })
  },

  getData_back(){
    setTimeout(()=>{
        console.log("第二步")
    },1000)
  },
  
  onShow: function () {
      this.getData_Topping()
      this.getData_back()
  }

})