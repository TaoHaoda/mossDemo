const signUtils = require("../../../../utils/sign.js");

Page({
  data: {
    hasPhoneNumber: false,
    phoneNumber: "",
    purePhoneNumber: "",
    countryCode: "",
    debugLog: "",
    detail: {}
  },

  getPhoneNumber: function (res) {
    var that = this
    var openid = getApp().globalData.openid

    if (openid) {
      // Has login
      let encryptedData = res.detail.encryptedData
      let iv = res.detail.iv

      // 发至SP后台，用session_key解密
      that.decrypt(encryptedData, iv, openid)
    } else {
      // No login before
      this.setData({
        debugLog: "getPhoneNumber failed, 请先登录"
      })
      return
    }

    function _getPhoneNumber(openid) {
      wx.getPhoneNumber({
        success: function (res) {
          that.setData({
            debugLog: JSON.stringify(res)
          })

          let encryptedData = res.encryptedData
          let iv = res.iv

          // 发至SP后台，用session_key解密
          that.decrypt(encryptedData, iv, openid)
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
      hasPhoneNumber: false,
      debugLog: "",
      detail: {}
    })
  },

  decrypt: function (encryptdata, iv, openid) {
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

    let that = this
    wx.request({
      url: 'http://wecar.sparta.html5.qq.com/test/demo/getuserinfo',
      method: 'POST',
      data: requestData,
      success: function (res) {
        console.log(JSON.stringify(res))
        that.setData({
          debugLog: that.data.debugLog + "\ngetuserinfo:" + JSON.stringify(res)
        })

        if (res.data.errcode == 0) {
          // Request success
          var phoneNumber = res.data.data.phoneNumber // 电话号码
          var purePhoneNumber = res.data.data.purePhoneNumber // 完整手机号(区号+原始手机号)
          var countryCode = res.data.data.countryCode //  区号, 86
          var watermark = {
            appid: res.data.data.watermark.appid,
            timestamp: res.data.data.watermark.timestamp
          }

          that.setData({
            hasPhoneNumber: true,
            phoneNumber: phoneNumber,
            purePhoneNumber: purePhoneNumber,
            countryCode: countryCode
          })
        } else {
          // Request failed
          console.log(res.errmsg)
        }
      },
      fail: function (res) {
        console.log(JSON.stringify(res))
        that.setData({
          debugLog: that.data.debugLog + "\ngetuserinfo:" + JSON.stringify(res)
        })
      }
    })
  }
})
