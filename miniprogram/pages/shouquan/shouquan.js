import {request} from "../../request/index.js"
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  getUserInfo(e){
    console.log(e)
    const {encryptedData,iv,rawData,signature}=e.detail
    wx.login({
      timeout: 1000,
      success:(res)=>{
        console.log(res)
        const {code}=res
        request({
          url:app.globalData.baseUrl+ 'users/wxlogin',
          data:{
            encryptedData,iv,rawData,signature,code
          },
          method:"post"
        }).then(res=>{
          wx.setStorageSync('token', "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo")
          this.back()
        })
      }
    })
  },
  back(){
    wx.navigateBack()
  }
})