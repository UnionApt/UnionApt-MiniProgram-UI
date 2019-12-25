// pages/lunch/lunch.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected: "#606060",
    notSelected: "#d8d8d8",
    menuOdd: "http://39.106.187.76:8000/public/images/services/menu_1.png",
    menuEven: "http://39.106.187.76:8000/public/images/services/menu_2.png",
    btnOdd: '',
    btnEven: '',
    menuImg: ''
  },

  reserve: function() {
    wx.navigateTo({
      url: '../lunch_rule/lunch_rule'
    })
  },

  getOddMenu: function() {
    this.setData({
      btnOdd: this.data.selected,
      btnEven: this.data.notSelected,
      menuImg: this.data.menuOdd
    })
  },

  getEvenMenu: function() {
    this.setData({
      btnOdd: this.data.notSelected,
      btnEven: this.data.selected,
      menuImg: this.data.menuEven
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      btnOdd: this.data.selected,
      btnEven: this.data.notSelected,
      menuImg: this.data.menuOdd
    })
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