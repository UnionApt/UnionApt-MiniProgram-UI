const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    apartmentDetail: ''
  },

  download: function() {
    //获取相册授权
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              console.log('授权成功')
            }
          })
        }
      }
    })

    //文件下载
    var imgSrc = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXJjQM10tLcTErnKQb9XaYnm813S8_rwlI0vqMX1qVIoGKoIXg7g&s"
    wx.downloadFile({
      url: imgSrc,
      success: function(res) {
        console.log(res);
        //图片保存到本地
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function(data) {
            console.log(data);
            wx.showToast({
              title: '已下载海报到相册',  //标题
              icon: 'success',  //图标，支持"success"、"loading"
              image: '',  //自定义图标的本地路径，image 的优先级高于 icon
              duration: 1500, //提示的延迟时间，单位毫秒，默认：1500
              mask: false,  //是否显示透明蒙层，防止触摸穿透，默认：false
              success: function () { }, //接口调用成功的回调函数
              fail: function () { },  //接口调用失败的回调函数
              complete: function () { } //接口调用结束的回调函数
            })
          },
          fail: function(err) {
            console.log(err);
            if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
              console.log("用户一开始拒绝了，我们想再次发起授权")
              console.log('打开设置窗口')
              wx.openSetting({
                success(settingdata) {
                  console.log(settingdata)
                  if (settingdata.authSetting['scope.writePhotosAlbum']) {
                    console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
                  } else {
                    console.log('获取权限失败，给出不给权限就无法正常使用的提示')
                  }
                }
              })
            }
          }
        })
      }
    })
  },

  swichNav: function(e) {
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      this.setData({
        currentTab: e.target.dataset.current
      })
    }
  },

  stopTouchMove: function() {
    return false;
  },

  getApartmentDetail: function(id) {
    var myThis = this
    wx.request({
      url: app.globalData.URL + 'getRoomDetailsById?_id=' + id,
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      success: function(res) {
        myThis.setData({
          apartmentDetail: res.data[0]
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getApartmentDetail(options._id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})