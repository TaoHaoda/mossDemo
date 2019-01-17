var app = getApp()
Page({
  data: {
    debugString: ""
  },
  checkSession: function(res) {
    wx.checkSession({
      success: this.onCheckSuccess,
      fail: this.onCheckFail
    })
  },

  onCheckSuccess: function(res) {
    this.setData({
      debugString: JSON.stringify(res)
    })
  },

  onCheckFail: function (res) {
    this.setData({
      debugString: JSON.stringify(res)
    })
  }
})
