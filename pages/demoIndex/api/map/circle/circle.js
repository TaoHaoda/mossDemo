// pages/circle/circle.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    polygons: [{
      points: [{
        // 22.542143, 113.932658 marker1
        longitude: 113.932658,
        latitude: 22.542143
      }, {
        //22.539353, 113.934708  2
          longitude: 113.934708,
          latitude: 22.539353
      }, {
        //22.538947, 113.939085 3
          longitude: 113.939085,
          latitude: 22.538947
       },
      {
        //22.542594, 113.939061 4
        longitude: 113.939061,
        latitude: 22.542594
      }
      ],
      strokeWidth: 1,
      strokeColor: "#03bbcc",
      fillColor: '#00000030'
}
]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    // _this.setData({
    //   TAES: true
    // })
    wx.isTAESMapEnable({
      success: function (res) {
        _this.setData({
          TAES: res.taesMap
        })
      }
    })
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

  },
  setPolygons: function () {
    console.log('进去setPolygons')
    wx.setMapPolygons({
      polygons: [
        {
        longitude: 113.3245211,
        latitude: 23.10229
        }, 
        {
          longitude: 113.324520,
          latitude: 23.21229
        }, {
          longitude: 113.329877,
          latitude: 23.213785
        }, {
          longitude: 113.329063,
          latitude: 23.211394
        }
      ],
      mapId: 'map1',
      success: function(res) {
        console.log('success',res)
      },
      complete: function (com) {
        console.log('com',com)
      }

    })
  }
})