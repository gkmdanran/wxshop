import {request} from "../../request/index.js"
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.getGood(options.goodid)
    
  },
  getGood(id){
    request({
      url:app.globalData.baseUrl+ 'goods/detail',
      data:{
        goods_id:id
      },
    }).then(res=>{
      console.log(res)
      this.setData({
        goodsObj:res.data.message
      })
    })
  },
  handlePrevewImage(e){
    let list=[...this.data.goodsObj.pics.map(v=>v.pics_mid)]
    wx.previewImage({
      current:e.currentTarget.dataset.url,
      urls: list,
    })
  },
  addCar(){
    let cart=wx.getStorageSync("cart")||[]
    let goodsInfo=this.data.goodsObj
    let index=cart.findIndex(v=>v.goods_id==goodsInfo.goods_id)
    if(index==-1){
      goodsInfo.num=1
      goodsInfo.checked=true
      cart.push(goodsInfo)
    }else{
      cart[index].num++
    }
    wx.setStorageSync("cart",cart)
    wx.showToast({
      title: '添加购物车成功',
      icon:'success',
      mask:true,
      duration:800
    })
  },
  toCar(){
    wx.switchTab({
      url: '/pages/cart/cart',
    })
  }

  
})