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

  getLocation: function () {
    const that = this
    wx.getLocation({
      type: "gcj02",
      success: function (res) {
        that.setData({
          debugLog: "纬度：" + res.latitude + " 经度：" + res.longitude
        })
      }
    })
  },

  navigateWeb: function () {
    wx.getLocation({
      type: "gcj02",
      success: function (res) {
        const startLat = res.latitude
        const startLgn = res.longitude

        wx.chooseLocation({
          success: function (res) {
            const destLat = res.latitude
            const destLgn = res.longitude

            // web方式暂时不支持
            // wx.navigateMap({
            //   locInfo: {
            //     webStartLocation: {
            //       latitude: startLat, // gcj02坐标
            //       longitude: startLgn, // gcj02坐标
            //     },
            //     webEndLocation: {
            //       latitude: destLat, // gcj02坐标
            //       longitude: destLgn, // gcj02坐标
            //     },
            //     driveRouteIndex: 0, // 路线选择
            //     isSimNav: 0
            //   }
            // })
          },
        })
      },
    })
  },

  navigateNative: function () {
    const tamLatitude = 39.908692;
    const tamLongitude = 116.397433;
    const tamAddress = "天安门";

    wx.chooseLocation({
      success: function (res) {
        const destLat = res.latitude
        const destLgn = res.longitude

        wx.navigateMap({
          destination: {
            latitude: destLat,  // gcj02坐标
            longitude: destLgn,  // gcj02坐标
            address: ""  // 地址，非必填
          }
        })
      }
    })
  }
})
