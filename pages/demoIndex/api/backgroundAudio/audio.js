// pages/demoIndex/api/backgroundAudio/audio.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    backgroundAudio:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      backgroundAudio: wx.getBackgroundAudioManager()
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
  backgroundPlay: function () {
    this.data.backgroundAudio.srcType = 1;
    this.data.backgroundAudio.setPlayMode = 0;
    this.data.backgroundAudio.playList = [{
      poster: 'http://image.biaobaiju.com/uploads/20180803/23/1533309822-GCcDphRmqw.jpg',
      name: '普通disco1',
      author: '洛天依/言和1',
      src: 'http://music.163.com/song/media/outer/url?id=476592630.mp3'
      ,
    },
    {
      poster: 'http://i1.hdslb.com/bfs/archive/89252dadd2525f8190485a069f73cdf3d783cabc.jpg',
      name: '普通disco2',
      author: '洛天依/言和2',
      src: 'http://music.163.com/song/media/outer/url?id=563563649.mp3'
    }];
    this.data.backgroundAudio.play()
  },
  backgroundAudioPause: function () {
    this.data.backgroundAudio.pause()
  },
  backgroundAudioPre: function () {
    this.data.backgroundAudio.Pre()
  },
  backgroundAudioNext: function () {
    this.data.backgroundAudio.Next()
  }
})