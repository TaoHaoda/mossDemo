//subpage.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World Sub',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onTapText: function (res) {
    console.log("insideMP ---> tap ", res);
    wx.showToast({
      title: 'onTapText',
    });
    wx.addMossEventListener(
      { mossSpeech: ['OKOK'], mossSkillset: "" },
      function (res) {
        console.log("7 ", res);
        wx.showToast({
          title: 'MossCallback Sub' + res,
        })
        return false;
      });
  },
  onTapText2: function (res) {
    console.log("insideMP ---> tap2 ", res);
    wx.showToast({
      title: 'onTapText22',
    })
  },
  onSkillCommand: function (res) {
    console.log("insideMP ---> onSkillCommand ", res);
    wx.showToast({
      title: 'onSkillCommand',
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    // app.getUserInfo(function (userInfo) {
    //   //更新数据
    //   that.setData({
    //     userInfo: userInfo
    //   })
    // })
  }
})
