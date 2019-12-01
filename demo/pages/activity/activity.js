// pages/activity/activity.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    curEvents: [],
    preEvents: []
  },

  viewCurEventDetail: function(e) {
    wx.navigateTo({
      url: '../activity_cur/activity_cur?_id=' + e.currentTarget.dataset._id
    })
  },

  viewPreEventDetail: function(e) {
    wx.navigateTo({
      url: '../activity_pre/activity_pre?_id=' + e.currentTarget.dataset._id
    })
  },

  getCurEvents: function() {
    var myThis = this
    wx.request({
      url: app.globalData.URL + 'event/getRecentEvents',
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      success: function(res) {
        myThis.setData({
          curEvents: res.data
        });
      }
    })
  },

  getPreEvents: function() {
    var myThis = this
    wx.request({
      url: app.globalData.URL + 'event/getPreviousEvents',
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      success: function(res) {
        myThis.setData({
          preEvents: res.data
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getCurEvents()
    this.getPreEvents()
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