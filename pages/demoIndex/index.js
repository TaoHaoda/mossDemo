Page({
  data: {
    list: [
      {
        id: 'api',
        name: '开放接口',
        open: false,
        pages: [
          {
            zh: '登录',
            url: 'api/login/login'
          }, {
            zh: '获取用户信息',
            url: 'api/get-user-info/get-user-info'
          }, {
            zh: '获取电话号码以及车辆基本信息',
            url: 'api/get-phonenumber/get-phonenumber'
          }, {
            zh: '登录态续期',
            url: 'api/check-session/check-session'
          }, {
            zh: '授权',
            url: 'api/authorize/authorize'
          }, {
            zh: '导航',
            url: 'api/navigate/navigate'
          }
        ]
      }
    ]
  },
  kindToggle: function (e) {
    var id = e.currentTarget.id, list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        if (list[i].url) {
          wx.navigateTo({
            url: list[i].url
          })
          return
        }
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list: list
    });
  }
})
