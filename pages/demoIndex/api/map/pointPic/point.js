// pages/pointPic/point.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listShop: [
      {
        id: 0,
        name: 'marker1',
        type: ''
      },
      {
        id: 1,
        name: 'marker2',
        type: ''
      },
      {
        id: 2,
        name: 'marker3',
        type: ''
      },
      {
        id: 3,
        name: 'marker4',
        type: ''
      }, 
      {
        id: 4,
        name: 'marker5',
        type: ''
      }
    ],
    markers: [
      {
        iconPath: "../../../../images/map.png",
        id: 0,
        latitude: 23.099994,
        longitude: 113.324520,
        width: 30,
        height: 30,
        title: 'marker1'
      },
      {
        iconPath: "../../../../images/map.png",
        id: 1,
        longitude: 113.324520,
        latitude: 23.21229,
        width: 30,
        height: 30,
        title: 'marker2'

      },
      {
        iconPath: "../../../../images/map.png",
        id: 2,
        longitude: 113.921612,
        latitude: 22.545403,
        width: 30,
        height: 30,
        title: 'marker3'
      },
      {
        iconPath: "../../../../images/map.png",
        id: 3,
        longitude: 113.934629,
        latitude: 22.539189,
        width: 30,
        height: 30,
        title: 'marker4'

      },
      {
        iconPath: "../../../../images/map.png",
        id: 4,
        longitude: 113.935369,
        latitude: 21.540752,
        width: 30,
        height: 30,
        title: 'marker5'

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

  },
  findMarker: function (e) {
    let data = e.currentTarget.dataset.id;
    let marker = this.data.markers;
    let _this = this;
    for (var j=0; j<this.data.listShop.length; j++){
      _this.setData({
        ['listShop['+j+'].type']: ''
      })
    }
    for (var i =0; i<marker.length; i++) {
      if (marker[i].id === data) {
        let data = 'markers[' + i + '].iconPath'
        _this.setData({
          [data]: "../../../../images/mapl.png"
        })
      } else {
        let data = 'markers[' + i + '].iconPath'
        _this.setData({
          [data]: "../../../../images/map.png"
        })
      }
    }
  },
  bindcallouttap: function (e) {
    
  },
  /**
   * 删除marker第一个
   */
  delteMarker: function (e) {
    let _this = this;
    _this.setData({
      markers: []
    })
  },
  addMarker: function (e) {
    let _this = this;
    let markers = [
      {
        iconPath: "../../../../images/map.png",
        id: 0,
        latitude: 23.099994,
        longitude: 113.324520,
        width: 30,
        height: 30,
        title: 'marker1'
      },
      {
        iconPath: "../../../../images/map.png",
        id: 1,
        longitude: 113.324520,
        latitude: 23.21229,
        width: 30,
        height: 30,
        title: 'marker2'

      },
      {
        iconPath: "../../../../images/map.png",
        id: 2,
        longitude: 113.921612,
        latitude: 22.545403,
        width: 30,
        height: 30,
        title: 'marker3'
      },
      {
        iconPath: "../../../../images/map.png",
        id: 3,
        longitude: 113.934629,
        latitude: 22.539189,
        width: 30,
        height: 30,
        title: 'marker4'

      },
      {
        iconPath: "../../../../images/map.png",
        id: 4,
        longitude: 113.935369,
        latitude: 21.540752,
        width: 30,
        height: 30,
        title: 'marker5'

      }
    ];
    _this.setData({
      markers: markers
    })

  },
  markertap: function (e) {
    let shop = this.data.listShop;
    let _this = this;
    for (var j = 0; j < this.data.markers.length; j++) {
      _this.setData({
        ['markers[' + j + '].iconPath']: '../../../../images/map.png'
      })
    }
    for (var i = 0; i < shop.length; i++) {
      if (e.markerId == shop[i].id) {
        console.log('123')
        let data = 'listShop[' + i + '].type'
        _this.setData({
          [data]: "primary"
        })
      } else {
        let data = 'listShop[' + i + '].type'
        _this.setData({
          [data]: ""
        })
      }
    }  
  }
})