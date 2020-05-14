// pages/circle/circle.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    polygons: [{
      points: [{
        longitude: 113.3245211,
        latitude: 23.10229
      }, {
        longitude: 113.324520,
        latitude: 23.21229
      }, {
        longitude: 113.329877,
        latitude: 23.213785
      },{
      longitude: 113.329063,
        latitude: 23.211394
      }
      ],
      strokeWidth: 1,
      strokeColor: "#03bbcc",
      fillColor: '#00000030'
},
{
        points: [{
          longitude: 113.930331,
          latitude: 22.519848
        }, {
            longitude: 113.929065,
            latitude: 22.519154
        }, {
            longitude: 113.933957,
            latitude: 22.517933
        },
        {
          longitude: 113.932981,
          latitude: 22.515366
        }
        ],
        strokeWidth: 1,
        strokeColor: "#000",
        fillColor: '#00000050'
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