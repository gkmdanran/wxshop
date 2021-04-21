import {request} from "../../request/index.js"
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:'综合',
        isActive:true
      },
      {
        id:1,
        value:'销量',
        isActive:false
      },
      {
        id:2,
        value:'价格',
        isActive:false
      }
    ],
    goodsList:[],
    total:''
  },
  queryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.queryParams.cid=options.cid
    this.getGoodsList()
  },
  getGoodsList(){
    request({
      url: app.globalData.baseUrl+ 'goods/search',
      data:this.queryParams,
    }).then(res=>{
      console.log(res.data.message.goods)
      this.setData({
        goodsList:[...this.data.goodsList,...res.data.message.goods],
        total:res.data.message.total
      })
      wx.stopPullDownRefresh()
    })
  },
  tabsClick(e){
    const {index}=e.detail
    let {tabs}=this.data
    tabs.forEach((v,i)=>i==index?v.isActive=true:v.isActive=false)
    this.setData({
      tabs
    })
  },
  toBottom(){
    if(this.queryParams.pagenum<Math.ceil(this.data.total/10)){
      this.queryParams.pagenum+=1
      this.getGoodsList()
    }
    else{
      wx.showToast({
        title: '没有更多商品啦~',
        duration: 800,
        icon: "none",
      })
    }
  },
  onPullDownRefresh(){
    this.setData({
      goodsList:[]
    })
    this.queryParams.pagenum=1
    this.getGoodsList()
  },
  toDetail(e){
    wx.navigateTo({
      url:'/pages/goodsDetail/goodsDetail?goodid='+e.currentTarget.dataset.goodid
    })
  }
})