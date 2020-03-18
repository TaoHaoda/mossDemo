// pages/demoIndex/api/car-eventlistener/add-vehicle-event-listener.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    onSpeed: '--',
    onKeyCode: '--',
    onRemainPower: '--',
    onAngle: '--'
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

  },

  onSpeedChange: function () {
    let that = this;
    wx.addVehicleEventListener({
      keyCode: ['keycode'],
      speed: ['speed'],
      wheelRotationAngle: ['wheelRotationAngle'],
      remainPower: ['remainPower']
    }, function (data) {
        console.log('车辆信息返回--', JSON.stringify(data));
        data.forEach(function (item) {

        if (item.hasOwnProperty('speed')) {
          that.setData({
            onSpeed: item.speed
          })
        }

        if (item.hasOwnProperty('keycode')) {
          that.setData({
            onKeyCode: item.keycode
          })
        }

        if (item.hasOwnProperty('wheelRotationAngle')) {
          that.setData({
            onAngle: item.wheelRotationAngle
          })
        }

        if (item.hasOwnProperty('remainPower')) {
          that.setData({
            onRemainPower: item.remainPower
          })
        }
      })


    })
  }
})