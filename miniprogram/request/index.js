let ajaxtimes=0
export const request=(params)=>{
  ajaxtimes++
  wx.showLoading({
    title: '加载中',
    mask:true
  })
  return new Promise((resolve,reject)=>{
    wx.request({
      ...params,
      success:(result)=>{
        resolve(result)
        
      },
      fail:(err)=>{
        reject(err)
      },
      complete:()=>{
        ajaxtimes--
        if(ajaxtimes==0)
        wx.hideLoading()
      }
    })
  })
}