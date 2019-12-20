// pages/lunch/lunch.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected: "#606060",
    notSelected: "#d8d8d8",
    menuOdd: "../../resources/images/dinner/odd.png",
    menuEven: "../../resources/images/dinner/even.png",
    btnOdd: '',
    btnEven: '',
    menuImg: ''
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