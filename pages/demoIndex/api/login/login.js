var app = getApp()
Page({
  onLoad: function () {
    this.setData({
      hasLogin: false,
      code: "",
      debugLog: ""
    })
  },
  data: {},
  login: function () {
    var that = this
    wx.login({
      success: function (res) {
        that.setData({
          hasLogin: true,
          code: res.code,
          debugLog: JSON.stringify(res)
        })
      },
      fail: function (res) {
        that.setData({
          hasLogin: false,
          code: res.errMsg,
          debugLog: JSON.stringify(res)
        })
      }
    })
  }
})
