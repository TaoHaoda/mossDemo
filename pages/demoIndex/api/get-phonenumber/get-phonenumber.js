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

    const errMsg = e.detail.errMsg
    const iv = e.detail.iv
    const encryptedData = e.detail.encryptedData // 发至SP后台，用session_key解密
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
