// pages/linePic/line-pic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    polyline: [
        {
          points: [{
            longitude: 113.3245211,
            latitude: 23.10229
          }, {
            longitude: 113.324520,
            latitude: 23.21229
          }, {
            longitude: 113.329877,
            latitude: 23.213785
          }
          ],
          color: "#03bbcc",
          width: 8,
          dottedLine: false
        },
      {
        points: [{
          longitude: 113.3245211,
          latitude: 23.10229
        }, {
            longitude: 113.257837,
            latitude: 23.148874
        }, {
          longitude: 113.329877,
          latitude: 23.213785
        }
        ],
        color: "#000000",
        width: 8,
        dottedLine: false
      }
      ],
    markers: [
      {
        iconPath: "../../../../images/map.png",
        id: 0,
        latitude: 23.099994,
        longitude: 113.324520,
        width: 10,
        height: 10
      },
      {
        iconPath: "../../../../images/map.png",
        id: 1,
        longitude: 113.324520,
        latitude: 23.21229,
        width: 10,
        height: 10
      },
      {
        iconPath: "../../../../images/map.png",
        id: 2,
        longitude: 113.329877,
        latitude: 23.213785,
        width: 10,
        height: 10
      },
      {
        iconPath: "../../../../images/map.png",
        id: 2,
        longitude: 113.257837,
        latitude: 23.148874,
        width: 10,
        height: 10
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})