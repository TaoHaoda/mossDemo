// pages/pointPic/point.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listShop: [
      {
        id: 0,
        name: '海南五指山市',
        type: ''
      },
      {
        id: 1,
        name: '广州白云山',
        type: ''
      },
      {
        id: 2,
        name: '开封琉璃塔',
        type: ''
      },
      {
        id: 3,
        name: '深圳腾讯大厦',
        type: ''
      }, 
      {
        id: 4,
        name: '北京天安门',
        type: ''
      }
    ],
    latitude: "39.910540",
    longitude: "116.397218",
    markers: [
      {
        // 18.929127, 109.696612 海南五指山市
        iconPath: "../image/map.png",
        id: 0,
        latitude: 18.929127,
        longitude: 109.696612,
        width: 30,
        height: 30,
        callout: {
          content: '海南五指山市',
          display: "ALWAYS",
          fontSize: 15,
          bgColor: '#eee'
        }
      },
      {
        iconPath: "../image/map.png",
        id: 1,
        longitude: 109.696612,
        latitude: 23.235701,
        width: 30,
        height: 30,
        callout: {
          content: '广州白云山',
          display: "ALWAYS",
          fontSize: 15,
          bgColor: '#eee'
        }

      },
      {
        iconPath: "../image/map.png",
        id: 2,
        longitude: 114.373845,
        latitude: 34.828488,
        width: 30,
        height: 30,
        callout: {
          content: '开封琉璃塔',
          display: "ALWAYS",
          fontSize: 15,
          bgColor: '#eee'
        }
        
       },
      {
        iconPath: "../image/map.png",
        id: 3,
        longitude: 113.934416,
        latitude: 22.540702,
        width: 30,
        height: 30,
        callout: {
          content: '深圳腾讯大厦',
          display: "ALWAYS",
          fontSize: 15,
          bgColor: '#eee'
        }

      },
      {
        iconPath: "../image/map.png",
        id: 4,
        longitude: 116.397218,
        latitude: 39.910540,
        width: 30,
        height: 30,
        callout: {
          content: '北京天安门',
          display: "ALWAYS",
          fontSize: 15,
          bgColor: '#eee'
        }

      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
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
        console.log(data);
        _this.setData({
          [data]: "../image/mapl.png"
        })
        // console.log(marker[i].id)
      } else {
        let data = 'markers[' + i + '].iconPath'
        _this.setData({
          [data]: "../image/map.png"
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
    let markers = _this.data.markers;
    markers.shift();
    _this.setData({
      markers: markers
    })
  },
  addMarker: function (e) {
    let _this = this;
    let marker1 = {
      iconPath: "../image/map.png",
      id: 5,
      longitude: 114.706219,
      latitude: 23.765296,
      width: 30,
      height: 30,
      callout: {
        content: 'marker6',
        display: "ALWAYS",
        fontSize: 15,
        bgColor: '#eee'
      }
    };

    _this.data.markers.push(marker1);
    let markers = _this.data.markers;
    _this.setData({
      markers: markers
    })
    console.log('____', _this.data.markers);
    
  },
  markertap: function (e) {
    console.log('-------',e);
    console.log(e)
    let shop = this.data.listShop;
    let _this = this;
    for (var j = 0; j < this.data.markers.length; j++) {
      _this.setData({
        ['markers[' + j + '].iconPath']: '../image/map.png'
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
  },
  changeCenter: function () {
    this.setData({
      longitude: 114.706219,
      latitude: 23.765296,
    })
  }
})