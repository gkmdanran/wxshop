import {request} from "../../request/index.js"
var app=getApp()
// miniprogram/pages/pay/pay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  onShow(){
    var list=[]
    for(let x of wx.getStorageSync("cart")){
      if(x.checked){
        list.push(x)
      }
    }
    this.setData({
      carList:list,
      address:wx.getStorageSync("address")
    })
    this.getCar()
  },
  getCar(){
    let carList=this.data.carList
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
      total,
      money:money.toFixed(2)
    })
  },
  toDetail(e){
    wx.navigateTo({
      url:'/pages/goodsDetail/goodsDetail?goodid='+e.currentTarget.dataset.id
    })
  },
  payMoney(){
    let token=wx.getStorageSync('token')
    if(!token||token==''){
      wx.navigateTo({
        url: '/pages/shouquan/shouquan',
      })
    }
    else{
      let goods=[]
      this.data.carList.forEach(item=>{
        goods.push({
          goods_id:item.goods_id,
          goods_number:item.num,
          goods_price:item.goods_price
        })
      })
      console.log(goods)
      let address=this.data.address
      request({
        url:app.globalData.baseUrl+ 'my/orders/create',
        method:"POST",
        data:{
          order_price:0.1,
          consignee_addr:address.provinceName+address.cityName+address.countyName+address.detailInfo,
          goods,
        },
        header:{Authorization:wx.getStorageSync('token')}
      }).then(res=>{
        console.log(res)
        request({
          url:app.globalData.baseUrl+ 'my/orders/req_unifiedorder',
          method:"POST",
          header:{Authorization:wx.getStorageSync('token')},
          data:{
            order_number:res.data.message.order_number
          }
        }).then(res1=>{
          console.log(res1)
          wx.requestPayment({
            ...res1.data.message.pay,
            complete:(re)=>{
              let newcar=wx.getStorageSync('cart').filter(v=>!v.checked)
              wx.setStorageSync('cart', newcar)
              wx.reLaunch({
                url: '/pages/index/index',
              })
            }
          })
        })
      })
    }
  }
})