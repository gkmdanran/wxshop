import {request} from "../../request/index.js"
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryList:[],
    menuList:[],
    content:[],
    currentIndex:0,
    top:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let cates=wx.getStorageSync('cates')
    if(!cates){
      this.getCategoryList()
    }
    else{
      if(Date.now()-cates.time>1000*20){
        this.getCategoryList()
      }
      else{
        let menuList=cates.data.map(v=>v.cat_name)
        let content=cates.data[0].children
        this.setData({
          menuList,
          content,
        })
      }
    }
  },
  getCategoryList(){
    console.log(1)
    request({
      url: app.globalData.baseUrl+ 'categories ',
    }).then(res=>{
      wx.setStorageSync("cates", {time:Date.now(),data:res.data.message})
      let menuList=res.data.message.map(v=>v.cat_name)
      let content=res.data.message[0].children
      this.setData({
        categoryList:res.data.message,
        menuList,
        content,
      })
    })
  },

  clickMenu(e){
    this.setData({
      currentIndex:e.currentTarget.dataset.index,
      content:this.data.categoryList[e.currentTarget.dataset.index].children,
      top:0
    })
  },
  toList(e){
    wx.navigateTo({
      url:'/pages/goodList/goodList?cid='+e.currentTarget.dataset.cid
    })
  }
})