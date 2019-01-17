//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World Main',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindViewTapNavi: function () {
    wx.navigateTo({
      url: '../subpage/subpage'
    });
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
          title: 'MossCallback Main' + res,
        })
        return false; 
    });

  },
  onTapText2: function (res) {
    console.log("insideMP2 ---> tap2 ", res);
    wx.showToast({
      title: 'onTapText2',
    })
  },
  onSkillCommand: function (res) {
    console.log("insideMP ---> onSkillCommand ", res);
    wx.showToast({
      title: 'onSkillCommand',
    })
  },
  onSkillCommand2: function (res) {
    console.log("insideMP2 ---> onSkillCommand2 ", res);
    wx.showToast({
      title: 'onSkillCommand2',
    })
  },

  showDemoIndex: function (res) {
    wx.navigateTo({
      url: '../demoIndex/index',
    });
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
