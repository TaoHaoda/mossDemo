<<<<<<< HEAD
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
          }, {
            zh: '获取车速',
            url: 'api/speed/get-speed'
          }, {
            zh: '获取剩余油量',
            url: 'api/power/get-remainpower'
          }, {
            zh: '获取车辆vin',
            url: 'api/vin/get-vechicle-id'
          }, {
            zh: '获取方向盘转角',
            url: 'api/wheelRotation/get-wheel-rotation-angle' 
          }, {
            zh: '监听车辆信息变化',
            url: 'api/car-eventlistener/add-vehicle-event-listener'
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
=======
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
          }, {
            zh: '获取车速',
            url: 'api/speed/get-speed'
          }, {
            zh: '获取剩余油量',
            url: 'api/power/get-remainpower'
          }, {
            zh: '获取车辆vin',
            url: 'api/vin/get-vechicle-id'
          }, {
            zh: '获取方向盘转角',
            url: 'api/wheelRotation/get-wheel-rotation-angle' 
          }, {
            zh: '监听车辆信息变化',
            url: 'api/car-eventlistener/add-vehicle-event-listener'
          }, {
            zh: 'tai账号退出登陆通知',
            url: 'api/taiLog/onTai'
          }, {
            zh: 'map地图组件',
            url: 'api/map/map'
          }, {
            zh: '背景音乐播放',
            url: 'api/backgroundAudio/audio'
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
>>>>>>> ff4bf10d76893994cdcac111923a3e42ebf5ab9e
