//app.js
App({
  globalData: {
    openid: "",
  },
  onLaunch: function () {
    const value = wx.getStorageSync('key')
    console.log('testts ' + typeof value)
    wx.getStorage({
      key: 'key',
      success: function(res) {
        console.log(res.data)
      },
      fail: function(res) {
        console.log("false")
        console.log(res)
      }
    })
  },
  onAddEvent: {
  }
})