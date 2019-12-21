// pages/lunch_form/lunch_form.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    communityArray: [{
      "text": "A"
    }, {
      "text": "B"
    }, {
      "text": "C"
    }],
    community: ''
  },

  setCommunity(e) {
    this.data.community = e.detail
  },

  formSubmit: function (e) {
    console.log('订餐信息提交，信息1为：', e.detail.value)
    console.log('订餐信息提交，信息2为：', this.data.community)
    let {
      _name,
      _roomId,
      _email,
      _key
    } = e.detail.value

    wx.showModal({
      title: '订餐成功',
      content: '确认邮件已发送至您的邮箱',
      showCancel: false,
      confirmText: '返回首页',
      success(res) {
        if (res.confirm) {
          console.log('返回首页')
        }
      }
    })
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

  }
})