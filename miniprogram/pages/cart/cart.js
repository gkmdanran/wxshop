// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    carList:'', 
    allChecked:false,
    money:0,
    total:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },
  getCar(){
    let carList=wx.getStorageSync("cart")||[]
    let allChecked=carList.length>0?carList.every(v=>v.checked==true):false
    let money=0
    let total=0
    for (let x of carList){
      if(x.checked){
        money+=x.num*x.goods_price
        total+=x.num
      }
    }
    this.setData({
      carList,
      allChecked,
      total,
      money:money.toFixed(2)
    })
  },
  onShow(){
    this.getCar()
    let address=wx.getStorageSync("address")
    if(address){
      this.setData({
        address,
      })
    }
  },
  addAddress(){
    
    wx.getSetting({
      withSubscriptions: true,
      success:(res)=>{
        if(res.authSetting['scope.address']==false){
          wx.openSetting({
            withSubscriptions: true,
            success:()=>{
              wx.chooseAddress({
                success: (result) => {
                  wx.setStorageSync("address",result)
                },
              })
            }
          })
        }
        else{
          wx.chooseAddress({
            success: (result) => {
              console.log(result)
              wx.setStorageSync("address",result)
            },
          })
        }
      }
    })
  },
  toDetail(e){
    wx.navigateTo({
      url:'/pages/goodsDetail/goodsDetail?goodid='+e.currentTarget.dataset.id
    })
  },
  changeChecked(e){
    let goods=e.currentTarget.dataset.id
    let carList=this.data.carList
    let index=carList.findIndex(v=>v.goods_id==goods)
    carList[index].checked=!carList[index].checked
    wx.setStorageSync("cart",carList)
    this.getCar()
  },
  changeAll(){
    let carList=this.data.carList
    this.setData({
      allChecked:!this.data.allChecked
    })
    for(let x of carList){
      x.checked=this.data.allChecked
    }
    wx.setStorageSync("cart",carList)
    this.getCar()
  },
  addGood(e){
    let goods=e.currentTarget.dataset.id
    let carList=this.data.carList
    let index=carList.findIndex(v=>v.goods_id==goods)
    carList[index].num+=1
    wx.setStorageSync("cart",carList)
    this.getCar()
  },
  minGood(e){
    let goods=e.currentTarget.dataset.id
    let carList=this.data.carList
    let index=carList.findIndex(v=>v.goods_id==goods)
    
    carList[index].num-=1
    if(carList[index].num<1){
      carList[index].num=1
      wx.showModal({
        title:'提示',
        content:'是否删除该商品',
        success:(res)=>{
          if(res.confirm){
            console.log(1)
            carList.splice(index,1)
            wx.setStorageSync("cart",carList)
            this.getCar()
          }
        }
      })
    }
    wx.setStorageSync("cart",carList)
    this.getCar()
  },
  buyAll(){
    if(!this.data.address.userName){
      wx.showToast({
        title: '您还未添加收获地址',
        duration:800,
        icon:"none"
      })
    }else if(this.data.total==0){
      wx.showToast({
        title: '您还未选择结算的商品',
        duration:800,
        icon:"none"
      })
    }
    else{
      wx.navigateTo({
        url:'/pages/pay/pay',
      })
    }
    
  }
  
  
})