Page({
  data: {
    hasUserInfo: false,
    hasLogin: false,
    debugLog: ""
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
        withCredentials: true,
        success: function (res) {
          that.setData({
            hasUserInfo: true,
            userInfo: res.userInfo,
            debugLog: JSON.stringify(res)
          })
          
          const userInfo = res.userInfo
          const nickName = userInfo.nickName
          const avatarUrl = userInfo.avatarUrl
          const gender = userInfo.gender // 性别 0：未知、1：男、2：女
          const province = userInfo.province
          const city = userInfo.city
          const country = userInfo.country

          const rawData = res.rawData
          const signature = res.signature 

          // withCredentials为true
          const encryptedData = res.encryptedData  // 发至SP后台，用session_key解密
          const iv = res.iv
        },
        fail: function (res) {
          that.setData({
            debugLog: JSON.stringify(res)
          })

          const errMsg = res.errMsg
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
