Page({
  data: {
    hasUserInfo: false,
    hasLogin: false,
    userInfoString: ""
  },
  getUserInfo: function () {
    var that = this

    if (this.data.hasLogin === false) {
      wx.login({
        success: _getUserInfo
      })
    } else {
      _getUserInfo()
    }

    function _getUserInfo() {
      that.setData({
        hasLogin: true
      })
      wx.getUserInfo({
        success: function (res) {
          that.setData({
            hasUserInfo: true,
            userInfo: res.userInfo,
            userInfoString: JSON.stringify(res)
          })
          that.update()
        },
        fail: function (res) {
          that.setData({
            userInfoString: JSON.stringify(res)
          })
        }
      })
    }
  },
  clear: function () {
    this.setData({
      hasUserInfo: false,
      hasLogin: false,
      userInfo: {}
    })
  },
  authorizeUserInfo: function (e) {
    console.log(e)
  }
})
