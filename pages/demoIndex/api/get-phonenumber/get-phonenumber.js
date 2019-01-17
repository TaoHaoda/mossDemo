Page({
  data: {
    hasPhoneNumber: false,
    hasLogin: false,
    debugString: "",
    detail: {}
  },
  getPhoneNumber: function (res) {
    this.setData({
      hasPhoneNumber: true,
      debugString: JSON.stringify(res),
      detail: res.detail
    })
    wx.addCard({
      cardList: [],
    })
  },
  clear: function () {
    this.setData({
      hasPhoneNumber: false,
      hasLogin: false,
      debugString: "",
      detail: {}
    })
  }
})
