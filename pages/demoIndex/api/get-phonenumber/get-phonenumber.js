const signUtils = require("../../../../utils/sign.js");

Page({
  data: {
    hasLogin: false,
    hasPhoneNumber: false,
    phoneNumber: "",
    purePhoneNumber: "",
    countryCode: "",
    debugLog: "",
    detail: {},
    hasBaseCarInfo: false,
    plateNum: ""
  },

  onShow: function() {
    this.setData({
      hasLogin: (getApp().globalData.openid !== "")
    })
  },

  getPhoneNumber: function (res) {
    var that = this
    var openid = getApp().globalData.openid
    console.log(JSON.stringify(res))
    this.setData({
      debugLog: JSON.stringify(res)
    })

    if (openid) {
      // Has login
      let encryptedData = res.detail.encryptedData
      let iv = res.detail.iv
      let errMsg = res.detail.errMsg

      if (encryptedData) {
        // 发至SP后台，用session_key解密
        that.decrypt(encryptedData, iv, openid)
      }
    } else {
      // No login before
      this.setData({
        debugLog: "getPhoneNumber failed, 请先登录"
      })
      return
    }
  },

  getBaseCarInfo: function (res) {
    var openid = getApp().globalData.openid
    var that = this

    if (openid) {
      wx.getBaseCarInfo({
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
    } else {
      // No login before
      this.setData({
        debugLog: "getPhoneNumber failed, 请先登录"
      })
      return
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

          var plateNum = res.data.data.plateNum // 电话号码
          var brand = res.data.data.brand // 完整手机号(区号+原始手机号)
          var series = res.data.data.series //  区号, 86
          var modelDesc = res.data.data.modelDesc //  区号, 86
          var plateColor = res.data.data.plateColor //  区号, 86
          var year = res.data.data.year //  区号, 86
          
          var watermark = {
            appid: res.data.data.watermark.appid,
            timestamp: res.data.data.watermark.timestamp
          }

          if (phoneNumber) {
            that.setData({
              hasPhoneNumber: true,
              phoneNumber: phoneNumber,
              purePhoneNumber: purePhoneNumber,
              countryCode: countryCode
            })
          } else if (plateNum) {
            that.setData({
              hasBaseCarInfo: true,
              plateNum: plateNum
            })
          }
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
