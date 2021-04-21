import {request} from "../../request/index.js"
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

    swiperList:[],
    navList:[],
    floorList:[]
  },

  onLoad: function (options) {
    this.getSwiperList()
    this.getNavList()
    this.getFloor()
  },

  
  onReady: function () {

  },

  
  onShow: function () {

  },
  getSwiperList(){
    request({
      url: app.globalData.baseUrl+ 'home/swiperdata',
    }).then(res=>{
      this.setData({
        swiperList:res.data.message
      })
    })
  },
  getNavList(){
    request({
      url: app.globalData.baseUrl+ 'home/catitems',
    }).then(res=>{
      this.setData({
        navList:res.data.message
      })
    })
  },
  getFloor(){
    request({
      url: app.globalData.baseUrl+ 'home/floordata',
    }).then(res=>{
      this.setData({
        floorList:res.data.message
      })
    })
  }

})