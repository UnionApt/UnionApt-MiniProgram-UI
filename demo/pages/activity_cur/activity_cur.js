// pages/activity_cur/activity_cur.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    eventDetail: ''
  },

  signUp: function (e) {
    wx.navigateTo({
      url: '../activity_form/activity_form?_id=' + this.data.id
    })
  },

  getEventDetail: function(id) {
    var myThis = this
    wx.request({
      url: app.globalData.URL + 'event/getEventById?_id=' + id,
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      success: function(res) {
        myThis.setData({
          eventDetail: res.data[0]
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.data.id = options._id
    this.getEventDetail(options._id)
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