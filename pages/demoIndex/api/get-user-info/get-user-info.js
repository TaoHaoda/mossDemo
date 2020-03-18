const signUtils = require("../../../../utils/sign.js");

Page({
  data: {
    withCredentials: true,
    userInfo: {
      nickName: "",
      avatarUrl: "",
      openId: "",
    },
    hasUserInfo: false,
    debugLog: ""
  },

  getUserInfo: function () {
    var that = this
    var openid = getApp().globalData.openid;

    if (openid) {
      // Has login
      _getUserInfo(openid, this.data.withCredentials)
    } else {
      // No login before
      this.setData({
        debugLog: "getUserInfo failed, 请先登录"
      })
      return
    }

    function _getUserInfo(openid, withCredentials) {
      wx.getUserInfo({
        withCredentials: withCredentials,
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

          that.setData({
            userInfo: {
              nickName: nickName,
              avatarUrl: avatarUrl,
              openId: "",
            }
          })

          if (withCredentials) {
            const encryptedData = res.encryptedData
            const iv = res.iv

            // 发至SP后台，用session_key解密
            that.getUserInfoFromServer(encryptedData, iv, openid)
          }
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
  },

  getUserInfoFromServer: function (encryptdata, iv, openid) {
    var that = this
    if (openid === "") {
      this.setData({
        debugLog: "getUserInfo failed, 请先登录"
      })
      return
    }

    let requestData = {
      "appid": signUtils.appid,
      "nonce": signUtils.nonce,
      "timestamp": String(Date.now()),
      "version": signUtils.version,
      "encryptdata": encryptdata,
      "iv": iv,
      "openid": openid, // SP后台索引session_key的唯一标志，正式环境openid不应下发到小程序。
    }

    let sign = signUtils.getSign(requestData)
    requestData.sign = sign
    console.log(JSON.stringify(requestData))

    wx.request({
      url: 'http://wecar.sparta.html5.qq.com/test/demo/getuserinfo',
      method: 'POST',
      data: requestData,
      success: function (res) {
        console.log(JSON.stringify(res))
        that.setData({
          debugLog: that.data.debugLog + "\ngetuserinfo:" + JSON.stringify(res)
        })

        if (res.errcode == 0) {
          // Request success
          var openid = res.data.openId // 腾讯车联开放平台openid
          var appid = res.data.watermark.appid

          that.setData({
            userInfo: {
              nickName: that.data.userInfo.nickName,
              avatarUrl: that.data.userInfo.avatarUrl,
              openId: openId,
            }
          })
        } else {
          // Request failed
          console.log(res.errmsg)
        }
      },
      fail: function (res) {
        that.setData({
          debugLog: that.data.debugLog + "\ngetuserinfo:" + JSON.stringify(res)
        })
        console.log(JSON.stringify(res))
      }
    })
  }
})
