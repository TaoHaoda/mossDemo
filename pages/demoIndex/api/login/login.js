const signUtils = require("../../../../utils/sign.js");

Page({
  data: {
  },

  onLoad: function () {
    this.setData({
      hasLogin: false,
      code: "",
      debugLog: ""
    })
  },

  login: function () {
    var that = this
    wx.login({
      success: function (res) {
        that.setData({
          hasLogin: true,
          code: res.code,
          debugLog: JSON.stringify(res)
        })

        const code = res.code 
        that.code2Session(code)
      },
      fail: function (res) {
        that.setData({
          hasLogin: false,
          code: res.errMsg,
          debugLog: JSON.stringify(res)
        })
        
        const errMsg = res.errMsg
      }
    })
  },

  // 把code发至SP后台换取session_key,
  // 1.demo中调用code2Session后code无效，需要重新login获取
  // 2.code 5分钟后失效
  code2Session: function(code) {
    let that = this
    let requestData = {
      "appid": signUtils.appid,
      "nonce": signUtils.nonce,
      "timestamp": String(Date.now()),
      "version": signUtils.version,
      "code": code
    }

    let sign = signUtils.getSign(requestData)
    requestData.sign = sign
    console.log(JSON.stringify(requestData))

    wx.request({
      url: 'http://wecar.sparta.html5.qq.com/test/demo/Code2Sesssion',
      method: 'POST',
      data: requestData,
      success: function (res) {
        console.log(JSON.stringify(res))
        that.setData({
          debugLog: that.data.debugLog + "\nCode2Sesssion:" + JSON.stringify(res)
        })

        if (res.data.errcode == 0) {
          // Request success
          getApp().globalData.openid = res.data.data.openid //腾讯车联开放平台openid,保存用于getUserInfo
          var sessionKey = res.data.data.session_key //会话密钥,demo后台会持久化session_key，用于解密getUserInfo
          var unionid = res.data.data.unionid //用户在开放平台的唯一标识符，在满足 UnionID 下发条件的情况下会返回
        } else {
          // Request failed
          console.log(res.data.errmsg)
        }
      },
      fail: function (res) {
        that.setData({
          debugLog: that.data.debugLog + "\nCode2Sesssion:" + JSON.stringify(res)
        })
        console.log(JSON.stringify(res))
      }
    })
  },
})
