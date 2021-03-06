const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: 'LA',
    activities: [],
    apartments: [],
    news: []
  },

  selectRegion: function () {
    // wx.navigateTo({
    //   url: '../city/city',
    // })
  },

  backToTop: function() {
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },

  makeAppointment: function() {
    wx.navigateTo({
      url: '../contact/contact',
    })
  },

  viewApartmentDetail: function(e) {
    wx.navigateTo({
      url: '../detail/detail?_id=' + e.currentTarget.dataset._id
    })
  },

  getActivities: function() {
    var myThis = this
    wx.request({
      url: app.globalData.URL + 'getLatestActivities',
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      success: function(res) {
        myThis.setData({
          activities: res.data
        });
      }
    })
  },

  getApartments: function() {
    var myThis = this
    wx.request({
      url: app.globalData.URL + 'getRoomListByRegion?region=' + this.data.region,
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      success: function(res) {
        myThis.setData({
          apartments: res.data
        });
      }
    })
  },

  getNews: function() {
    var myThis = this
    wx.request({
      url: app.globalData.URL + 'getLatestArticles',
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      success: function(res) {
        myThis.setData({
          news: res.data
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getActivities()
    this.getApartments()
    this.getNews()
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