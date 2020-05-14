// pages/linePic/line-pic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lineList: [
      {
        id: 0,
        name: "ponit0",
        type: ''
      },
      {
        id: 1,
        name: "ponit1",
        type: ''

      },
      {
        id: 2,
        name: "ponit2",
        type: ''

      },
      {
        id: 3,
        name: "ponit3",
        type: ''

      }
    ],
    polyline: [
        {
          points: [{
            longitude: 113.3245211,
            latitude: 23.10229
          }, {
            longitude: 113.324520,
            latitude: 23.21229
          }, {
            longitude: 113.329877,
            latitude: 23.213785
          }
          ],
          color: "#03bbcc",
          width: 8,
          dottedLine: false
        },
      {
        points: [{
          longitude: 113.3245211,
          latitude: 23.10229
        }, {
            longitude: 113.257837,
            latitude: 23.148874
        }, {
          longitude: 113.329877,
          latitude: 23.213785
        }
        ],
        color: "#000000",
        width: 8,
        dottedLine: false
      }
      ],
    markers: [
      {
        iconPath: "../image/mapl.png",
        id: 0,
        latitude: 23.10229,
        longitude: 113.3245211,
        width: 30,
        height: 30,
        callout: {
          content: 'point0',
          display: "ALWAYS",
          fontSize: 15,
          bgColor: '#eee'
        }
      },
      {
        iconPath: "../image/mapl.png",
        id: 1,
        longitude: 113.324520,
        latitude: 23.21229,
        width: 30,
        height: 30,
        callout: {
          content: 'point1',
          display: "ALWAYS",
          fontSize: 15,
          bgColor: '#eee'
        }
      },
      {
        iconPath: "../image/mapl.png",
        id: 2,
        longitude: 113.329877,
        latitude: 23.213785,
        width: 30,
        height: 30,
        callout: {
          content: 'point2',
          display: "ALWAYS",
          fontSize: 15,
          bgColor: '#eee'
        }
      },
      {
        iconPath: "../image/mapl.png",
        id: 3,
        longitude: 113.257837,
        latitude: 23.148874,
        width: 30,
        height: 30,
        callout: {
          content: 'point3',
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
    let _this = this;
    let dataMarker = _this.data.markers;
    let btn = _this.data.lineList;
    for (let i =0;i<dataMarker.length;i++) {
      console.log('213')
      _this.setData({
        ['lineList[' + i +'].type']: ''
      })
    }
    for(let j=0;j<btn.length;j++) {
      if (e.currentTarget.dataset.id == dataMarker[j].id) {
        _this.setData({
          ['markers[' + j +'].callout.bgColor']: '#03bbcc'
        })
      }else {
        _this.setData({
          ['markers[' + j + '].callout.bgColor']: '#eee'
        })
      }
    }
    
  },
  bindcallouttap: function (e) {
    console.log(e)
    let shop = this.data.lineList;
    let _this = this;
    for (var j = 0; j < this.data.markers.length; j++) {
      _this.setData({
        ['markers[' + j + '].callout.bgColor']: '#eee'
      })
    }
    for (var i = 0; i < shop.length; i++) {
      if (e.markerId == shop[i].id) {
        console.log('123')
        let data = 'lineList[' + i + '].type'
        _this.setData({
          [data]: "primary"
        })
      } else {
        let data = 'lineList[' + i + '].type'
        _this.setData({
          [data]: ""
        })
      }
    }
  }
})