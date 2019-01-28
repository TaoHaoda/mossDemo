// pages/demoIndex/api/authorize/authorize.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    debugLog: ""
  },

  authorize: function() {
    const that = this
    wx.authorize({
      scope: 'scope.getUserPhone',
      success: function(res) {
        that.setData({
          debugLog: JSON.stringify(res)
        })
      },

      fail: function (res) {
        that.setData({
          debugLog: JSON.stringify(res)
        })

        const errMsg = res.errMsg
      }
    })
  }
})