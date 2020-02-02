const app = getApp()
// pages/clean_search/clean_search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    price: '',
    isSearch: false,
    communityArray: [{
      "text": "A"
    }],
    community: '',
    roomTypeArray: [{
      "text": "Studio"
    }, {
      "text": "1B1B"
    }, {
      "text": "2B1B"
    }, {
      "text": "2B2B"
    }, {
      "text": "3B2B"
    }],
    roomType: ''
  },

  setCommunity(e) {
    this.data.community = e.detail
  },

  setRoomType(e) {
    this.data.roomType = e.detail
  },

  search: function() {
    var myThis = this
    if (this.data.community == '' || this.data.roomType == '') {
      wx.showToast({
        title: '请选择社区和房型',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.request({
        url: app.globalData.URL + 'getCleaningPrice?location=' + this.data.community + '&layout=' + this.data.roomType,
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success: function(res) {
          console.log(res) // 服务器回包信息
          if (res.statusCode == 200) {
            myThis.setData({
              price: res.data[0][myThis.data.roomType],
              isSearch: true
            })
          } else {
            wx.showToast({
              title: '查询的房型不存在',
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
    }
  },

  back: function() {
    this.setData({
      isSearch: false
    })
  },

  goon: function() {
    wx.navigateTo({
      url: '../clean_rule/clean_rule'
    })
  },

  getCommunity: function() {
    var myThis = this
    wx.request({
      url: app.globalData.URL + 'getRegionList',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res) // 服务器回包信息
        myThis.setData({
          communityArray: res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getCommunity()
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